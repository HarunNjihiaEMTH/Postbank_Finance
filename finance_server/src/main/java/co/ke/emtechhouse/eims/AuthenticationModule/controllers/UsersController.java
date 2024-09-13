package co.ke.emtechhouse.eims.AuthenticationModule.controllers;

import co.ke.emtechhouse.eims.AuthenticationModule.blacklistedwords.WordsBlacklist;
import co.ke.emtechhouse.eims.AuthenticationModule.blacklistedwords.WordsBlacklistRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.passwordhistory.PasswordHistoryRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.passwordhistory.PasswordHistoryService;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.*;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.AuditingRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.RoleRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.UserRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.JwtUtils;
import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.RequestIpContext;
import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.RequestUsernameContext;
import co.ke.emtechhouse.eims.AuthenticationModule.services.SendEmailService;
import co.ke.emtechhouse.eims.AuthenticationModule.utilities.SendCredentialToMail;
import co.ke.emtechhouse.eims.AuthenticationModule.utilities.ToolKit;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import co.ke.emtechhouse.eims.Utils.exception.InvalidRequestParameterException;
import lombok.extern.slf4j.Slf4j;
import org.passay.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import javax.persistence.Column;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/soa/users")
@Slf4j
public class UsersController {
    @Autowired
    private PasswordHistoryService passwordHistoryService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;
    @Autowired
    WordsBlacklistRepository wordsBlacklistRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuditingRepository auditingRepository;
    @Autowired
    SendCredentialToMail sendCredentialToMail;

    @Autowired
    SendEmailService mailService;

    SendCredentialToMail sm = new SendCredentialToMail();

    //Instance of ToolKit Class
    ToolKit tk = new ToolKit();

    //Auditing Configs
    String username = "";
    String modified_by = "";
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    String modified_on = dtf.format(now);
    @Autowired
    private PasswordHistoryRepository passwordHistoryRepository;


    //Auditing
    public void addAudit(String activity ) {
        Auditing auditing = new Auditing();
        auditing.setActivity(activity);
        auditing.setStarttime(new Date());
        auditing.setUsername(RequestUsernameContext.getRequestUsername());
        auditing.setRequestip(RequestIpContext.getRequestIp());
        auditingRepository.save(auditing);
    }

    //Add Users
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) throws MessagingException, IOException {
        //Generate User Password
        String userpassword = tk.generatePassword();
        signUpRequest.setPassword(userpassword);
                if(validateUser(signUpRequest.getEmail(), signUpRequest.getUsername(), signUpRequest.getPassword()).getStatusCode()==HttpStatus.OK.value()){
                    User user = new User();
                    user.setFirstname(signUpRequest.getFirstname());
                    user.setLastname(signUpRequest.getLastname());
                    user.setUsername(signUpRequest.getUsername());
                    user.setPhonenumber(signUpRequest.getPhonenumber());
                    user.setEmail(signUpRequest.getEmail());
                    user.setDepartment(signUpRequest.getDepartment());
                    user.setPassword(encoder.encode(signUpRequest.getPassword()));
                    user.setCreatedOn(dtf.format(now));
                    user.setAcctActive(true);
                    user.setDeleteFlag("N");
                    user.setAcctLocked(false);

                    String strRoles = signUpRequest.getRole().toLowerCase();
                    Set<Role> roles = new HashSet<>();
                    Role userRole = roleRepository.findByName(strRoles).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
//                    if (strRoles == null) {
//                        Role userRole = roleRepository.findByName(ERole.ROLE_USER.toString()).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//                        roles.add(userRole);
//                    } else {
//                        switch (strRoles) {
//                            case "admin":
//                            case "role_admin":
//                                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN.toString()).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//                                roles.add(adminRole);
//                                break;
//                            case "role_user":
//                            case "user":
//                            default:
//                                Role userRole = roleRepository.findByName(ERole.ROLE_USER.toString()).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//                                roles.add(userRole);
//                        }
//                    }
                    user.setRoles(roles);
                    user.setCreatedOn(new Date().toString());
                    user.setStatus("Approved");
                    userRepository.save(user);
                    //Send Email
                    sm.sendOneMail(signUpRequest.getEmail(), signUpRequest.getUsername(), signUpRequest.getPassword());
                    //Add Audit
                    addAudit("Signup  a new user with username "+username);
                    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
                }else{
                    return ResponseEntity.ok(validateUser(signUpRequest.getEmail(), signUpRequest.getUsername(), signUpRequest.getPassword()));
                }
    }
    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public EntityResponse handlePasswordValidationException(MethodArgumentNotValidException e) {
        EntityResponse response = new EntityResponse();
        response.setMessage(Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage());
        response.setStatusCode(HttpStatus.BAD_REQUEST.value());
        return response;
    }
    @ExceptionHandler(InvalidRequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public EntityResponse handleInvalidRequestParameterResponse(InvalidRequestParameterException e) {
        EntityResponse response = new EntityResponse();
        response.setMessage(e.getMessage());
        response.setStatusCode(HttpStatus.BAD_REQUEST.value());
        return response;
    }

    public EntityResponse validateUser(String email, String username, String password){
        EntityResponse response = new EntityResponse();
        SourceRule sourceRule = new SourceRule();
        HistoryRule historyRule = new HistoryRule();
        PasswordData passwords = new PasswordData(password);

//        TODO: Password Should not contain username
        Rule rule = new UsernameRule();
        PasswordValidator usernamevalidator = new PasswordValidator(rule);
        passwords.setUsername(username);
        RuleResult results = usernamevalidator.validate(passwords);
        if(results.isValid()){
//            TODO: Username is unique
            if (userRepository.existsByUsername(username)) {
                response.setMessage("Username is already taken!");
                response.setStatusCode(HttpStatus.BAD_REQUEST.value());
                log.info("username is already taken!");
                return response;
            }else {
//                TODO: Email is unique
                if (userRepository.existsByEmail(email)) {
                    response.setMessage("Email is already in use!");
                    response.setStatusCode(HttpStatus.BAD_REQUEST.value());
                    log.info("Email is already in use!");
                    return response;
                }else{
//                    TODO: Password is  blacklisted
                    Optional<WordsBlacklist> blacklist = wordsBlacklistRepository.findByWord(password);
                    if (blacklist.isPresent()){
                        log.info("Password is blacklisted!");
                        response.setMessage("The password provided is blacklisted");
                        response.setStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
                    }else {
                        log.info("User is valid!");
                        response.setMessage("User is valid");
                        response.setStatusCode(HttpStatus.OK.value());
                    }
                }
            }
        }else{
            log.info("Password should not contain the username provided i.e "+username);
            response.setMessage("Password should not contain the username provided i.e "+username);
            response.setStatusCode(HttpStatus.BAD_REQUEST.value());
        }
        return response;
    }
    public EntityResponse validateUserReset(String email, String username, String password){
        EntityResponse response = new EntityResponse();
        SourceRule sourceRule = new SourceRule();
        HistoryRule historyRule = new HistoryRule();
        PasswordData passwords = new PasswordData(password);

//        TODO: Password Should not contain username
        Rule rule = new UsernameRule();
        PasswordValidator usernamevalidator = new PasswordValidator(rule);
        passwords.setUsername(username);
        RuleResult results = usernamevalidator.validate(passwords);
        if(results.isValid()){
//                    TODO: Password is  blacklisted
                    Optional<WordsBlacklist> blacklist = wordsBlacklistRepository.findByWord(password);
                    if (blacklist.isPresent()){
                        log.info("Password is blacklisted!");
                        response.setMessage("The password provided is blacklisted");
                        response.setStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
                    }else {
                        log.info("User is valid!");
                        response.setMessage("User is valid");
                        response.setStatusCode(HttpStatus.OK.value());
                    }

        }else{
            log.info("Password should not contain the username provided i.e "+username);
            response.setMessage("Password should not contain the username provided i.e "+username);
            response.setStatusCode(HttpStatus.BAD_REQUEST.value());
        }
        return response;
    }
    //All Users with valid accounts
    @GetMapping("/view")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.allUsers();

        //Add Audit
        addAudit("View all users");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/view/approved")
    public ResponseEntity<List<User>> getAllApprovedUsers() {
        List<User> users = userRepository.allVerifiedAccounts();

        //Add Audit
        addAudit( "Admin View Approved User Accounts.");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/view/rejected")
    public ResponseEntity<List<User>> getAllRejectedUsers() {
        List<User> users = userRepository.allRejectedAccounts();

        //Add Audit
        addAudit( "Admin View Rejected User Accounts.");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/view/pending")
    public ResponseEntity<List<User>> getAllPendingUsers() {
        List<User> users = userRepository.allPendingAccounts();

        //Add Audit
        addAudit( "Admin View Pending User Accounts");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    //List all locked accounts
    @GetMapping("/lockedaccounts")
    public ResponseEntity<List<User>> getAllLockedAccounts() {
        List<User> users = userRepository.allLockedUsers();

        //Add Audit
        addAudit( "Admin view locked user accounts");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //List all deleted user accounts
    @GetMapping("/deletedaccounts")
    public ResponseEntity<List<User>> getAllDeletedAccounts() {
        List<User> users = userRepository.allDeletedUsers();

        //Add Audit
        addAudit( "Admin view deleted user accounts");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //List Inactive Accounts
    @GetMapping("/inactiveaccounts")
    public ResponseEntity<List<User>> getAllInactiveAccounts() {
        List<User> users = userRepository.allInactiveUsers();

        //Add Audit
        addAudit( "Admin View inactive user accounts");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //Update user details (Partial Update)
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@Valid @RequestBody PartialUpdate update) {
        //Select username
        String username = userRepository.getUsername(update.getId());

        //Select Email Address
        String email = userRepository.getEmailAddress(update.getId());

        if (userRepository.existsByEmail(update.getEmail()) && !email.equalsIgnoreCase(update.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        userRepository.updateDetails(update.getId(), update.getFirstname(), update.getLastname(), update.getPhonenumber(), modified_by, modified_on, update.getEmail());

        //Add Audit
//        addAudit( "User update account details :: Username :: " + username);

        return ResponseEntity.ok(new MessageResponse("Profile Updated successfully!"));
    }

    //Update User Role
    @PutMapping("/updaterole")
    public ResponseEntity<?> updateUserRole(@Valid @RequestBody UpdateUserRole update ) {
        modified_by = RequestUsernameContext.getRequestUsername();
        userRepository.updateUserRole(update.getRoleid(), update.getUserid());

        //Add Audit
        addAudit( "Admin Update User role :: User ID :: " + update.getUserid());
        return ResponseEntity.ok(new MessageResponse("User Role Updated successfully!"));
    }

    //Change Password
    @PutMapping("/updatepassword")
    public ResponseEntity<?> updateUserPassword(@Valid @RequestBody UpdatePassword update ) throws MessagingException, IOException {
        if (update.getPassword().equalsIgnoreCase(update.getConfirmpassword())) {
            Optional<User> user = userRepository.findByUsername(update.getUsername());
            if(validateUserReset(user.get().getEmail(), update.getUsername(), update.getPassword()).getStatusCode()==HttpStatus.OK.value()){
            if (userRepository.findByUsername(update.getUsername()).isPresent()) {
                Optional<WordsBlacklist> blacklist = wordsBlacklistRepository.findByWord(update.getPassword());
                if (blacklist.isPresent()) {
                    log.info("Password is blacklisted!");
                    return new ResponseEntity<>(new MessageResponse("Password used does not comply with our password policy!"), HttpStatus.BAD_REQUEST);
                } else {
                    modified_by = RequestUsernameContext.getRequestUsername();
                    String status = passwordHistoryService.passwordHistoryValidation(update.getUsername(), update.getPassword());
                    //Check password history
                    if (status.equalsIgnoreCase("000")) {
                        user.get().setSystemGenPassword(false);
                        user.get().setPassword(encoder.encode(update.getPassword()));
                        userRepository.save(user.get());
                        //Add Audit
                        addAudit("Admin update user password :: User Name :: " + update.getUsername());

//                        String mailMessage = "Dear " + user.get().getUsername() + " your password has been updated successfully! These are your new Credentials. Username <b> " + user.get().getUsername()
//                                + " </b> and password <b>" + update.getPassword() + " </b> Login in.";
//                        sendCredentialToMail.PasswordReset(user.get().getEmail(), mailMessage);

                        return ResponseEntity.ok(new MessageResponse("User Password Updated successfully!"));
                    } else {
                        return new ResponseEntity<>(new MessageResponse("Password Cannot be Re-Used within a period of 1 year!"), HttpStatus.BAD_REQUEST);
                    }
                }
            } else {
                return new ResponseEntity<>(new MessageResponse("User Account Does Not Exist!"), HttpStatus.BAD_REQUEST);
            }
            }else {
                return ResponseEntity.ok(validateUser(user.get().getEmail(), update.getUsername(), update.getPassword()));
            }

        }else {
            return new ResponseEntity<>(new MessageResponse("Password do not match!"), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(path = "/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Forgotpassword forgotpassword) throws MessagingException, IOException {
        if (!userRepository.existsByEmail(forgotpassword.getEmailAddress())) {
            EntityResponse response = new EntityResponse();
            response.setMessage("No account associated with the email provided "+forgotpassword.getEmailAddress());
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            PasswordGeneratorUtil passwordGeneratorUtil = new PasswordGeneratorUtil();
            String generatedPassword = passwordGeneratorUtil.generatePassayPassword();
            Optional<User> user = userRepository.findByEmail(forgotpassword.getEmailAddress());
            if (user.isPresent()){
                User user1 = user.get();
                user1.setPassword(encoder.encode(generatedPassword));
                user1.setSystemGenPassword(true);
                user1.setModifiedBy(user.get().getUsername());
                user1.setModifiedBy(user1.getUsername());
                user1.setModifiedOn(new Date().toString());
                userRepository.save(user1);
                String mailMessage = "Dear " + user.get().getUsername() + " your password has been updated successfully! These are your new Credentials. Username <b> " + user1.getUsername()
                        + " </b> and password <b>" + generatedPassword + " </b> Login in to change your password.";
                sendCredentialToMail.PasswordReset(user1.getEmail(), mailMessage);
                EntityResponse response = new EntityResponse();
                response.setMessage("Password Reset Successfully! Password has been sent to the requested email");
                response.setStatusCode(HttpStatus.OK.value());
                response.setEntity("");
                return new ResponseEntity<>(response, HttpStatus.OK);
            }else{
                EntityResponse response = new EntityResponse();
                response.setMessage("User with email address not found!");
                response.setStatusCode(HttpStatus.NOT_FOUND.value());
                response.setEntity("");
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        }
    }

    @PostMapping(path = "/resend-email")
    public ResponseEntity<?> forgotPassword(@RequestParam Long userId) throws MessagingException, IOException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            PasswordGeneratorUtil passwordGeneratorUtil = new PasswordGeneratorUtil();
            String generatedPassword = passwordGeneratorUtil.generatePassayPassword();
            User user1 = user.get();
            user1.setPassword(encoder.encode(generatedPassword));
            user1.setSystemGenPassword(true);
            user1.setModifiedBy(user.get().getUsername());
            user1.setModifiedBy(user1.getUsername());
            user1.setModifiedOn(new Date().toString());
            userRepository.save(user1);
            String mailMessage = "Dear " + user.get().getUsername() + " your password has been updated successfully! These are your new Credentials. Username <b> " + user1.getUsername()
                    + " </b> and password <b>" + generatedPassword + " </b> Login in to change your password.";
            sendCredentialToMail.PasswordReset(user1.getEmail(), mailMessage);
            EntityResponse response = new EntityResponse();
            response.setMessage("Password Reset Successfully! Password has been sent to the requested email");
            response.setStatusCode(HttpStatus.OK.value());
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            EntityResponse response = new EntityResponse();
            response.setMessage("No account associated with the id provided ");
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    //Update Account status (lock or unlock)
    @PutMapping("/lockaccount")
    public ResponseEntity<?> activateAccount(@Valid @RequestBody LockAccount update ) {
        modified_by = RequestUsernameContext.getRequestUsername();
        userRepository.lockUserAccount(update.isStatus(), modified_on, modified_by, update.getUsername());

        //Add Audit
        addAudit( "Admin lock user account :: User Name :: " + update.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Account Status Altered successfully!"));
    }

    //Update User Account status (Active or Inactive)
    @PutMapping("/activateaccount")
    public ResponseEntity<?> lockAccount(@Valid @RequestBody ActivateAccount update ) {
        modified_by = RequestUsernameContext.getRequestUsername();
        userRepository.activateUserAccount(update.isStatus(), modified_on, modified_by, update.getUsername());

        //Add Audit
        addAudit( "Admin activate user account :: User Name :: " + update.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Account Status Altered successfully!"));
    }

    //Delete User (Lock Account, Delete flag to Y and set account inactive)
    @PutMapping("/deleteaccount")
    public ResponseEntity<?> deleteAccount(@Valid @RequestBody DeleteAccount update ) {
        modified_by = RequestUsernameContext.getRequestUsername();
        //Set a/c inactive
        boolean inactive = false;
        update.setInactive(inactive);

        //Lock A/c
        boolean lock = true;
        update.setLock(lock);

        //Delete Flag
        String delete_flag = "Y";

        userRepository.deleteUserAccount(update.isInactive(), update.isInactive(), delete_flag, modified_on, modified_by, update.getUsername());

        //Add Audit
        addAudit( "Admin delete user account :: User Name :: " + update.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Account Deleted successfully!"));
    }

    //Un delete an account
    @PutMapping("/restoreaccount")
    public ResponseEntity<?> unDeleteAccount(@Valid @RequestBody DeleteAccount update ) {
        modified_by = RequestUsernameContext.getRequestUsername();

        //Set a/c inactive
        boolean inactive = true;

        //Lock A/c
        boolean lock = false;

        //Delete Flag
        String delete_flag = "N";

        userRepository.restoreUserAccount(inactive, lock, delete_flag, modified_on, modified_by, update.getUsername());

        //Add Audit
        addAudit( "Admin restore user account :: User Name :: " + update.getUsername());

        return ResponseEntity.ok(new MessageResponse("User Account Restored successfully!"));
    }

    //Fetch user details by Id
    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUserDetailsById(@PathVariable("id") long id )
    {
        Optional<User> details = userRepository.findById(id);
        //Add Audit
        addAudit( "Admin fetch user account details :: User ID :: " + id);
        return new ResponseEntity(details,HttpStatus.OK);
    }
    //Admin Log Out User
    //Sign Out
    @PostMapping("/logout")
    public ResponseEntity<?> signOut(@Valid @RequestBody LogOutRequest logOutRequest ) {
        //Update Logged in status to true
        userRepository.updateLogInToFalse(false,modified_on,RequestUsernameContext.getRequestUsername(),logOutRequest.getUsername());

        //Add Audit
        addAudit( "Admin Sign Out User :: Username :: " + logOutRequest.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Logged Out Successfully!"));
    }

    //Admin Change user's department
    @PutMapping("/updatedepartment")
    public ResponseEntity<?> updateUserDepartment(@Valid @RequestBody UpdateDepartment update ) {
        modified_by = RequestUsernameContext.getRequestUsername();
        userRepository.updateUserDepartment(update.getDepartment(), modified_on,modified_by, update.getUsername());

        //Add Audit
        addAudit( "Admin user's department  :: User Name :: " + update.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Department Updated successfully!"));
    }

    //Verify
    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam("verifiername") String verifiername,@RequestParam("username") String username,@RequestParam("action") String action) throws MessagingException, IOException {
        Optional<User> user = userRepository.findByUsername(username);
        //Add Audit
        addAudit( "Admin Verify User account :: user name = " + username);
        if(action.equalsIgnoreCase("Approve"))
        {
            if(user.isPresent()) {
                userRepository.verifyUserAccount("Approved", modified_on, verifiername, username);

                String password = tk.generatePassword();

                //Change User Password
                User user1 = user.get();
                user1.setPassword(encoder.encode(password));
                userRepository.save(user1);

                //Send Email
                sm.sendOneMail(user.get().getEmail(), username, password);

                return ResponseEntity.ok(new MessageResponse("User Account Approved Successfully!"));
            }
            else
            {
                return ResponseEntity.ok(new MessageResponse("User Account Does Not Exist!"));
            }
        }
        else if(action.equalsIgnoreCase("reject"))
        {
            userRepository.verifyUserAccount("Rejected",modified_on,verifiername,username);
            return ResponseEntity.ok(new MessageResponse("User Account Rejected Successfully!"));
        }
        else
        {
            return new ResponseEntity<>(new MessageResponse("Invalid action.Accepted Actions are 'APPROVE' and 'REJECT'"),HttpStatus.BAD_REQUEST);
        }
    }
}
