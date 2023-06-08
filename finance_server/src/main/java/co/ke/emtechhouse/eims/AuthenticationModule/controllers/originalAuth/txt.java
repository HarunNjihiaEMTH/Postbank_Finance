//package co.ke.emtechhouse.eims.AuthenticationModule.controllers;
//
//import co.ke.emtechhouse.eims.AuthenticationModule.OTP.OTP;
//import co.ke.emtechhouse.eims.AuthenticationModule.OTP.OTPRepository;
//import co.ke.emtechhouse.eims.AuthenticationModule.OTP.OTPService;
//import co.ke.emtechhouse.eims.AuthenticationModule.payload.*;
//import co.ke.emtechhouse.eims.AuthenticationModule.payload.BasicActions.Basicactions;
//import co.ke.emtechhouse.eims.AuthenticationModule.repositories.AuditingRepository;
//import co.ke.emtechhouse.eims.AuthenticationModule.repositories.RoleRepository;
//import co.ke.emtechhouse.eims.AuthenticationModule.repositories.UserRepository;
//import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.JwtUtils;
//import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.RequestUsernameContext;
//import co.ke.emtechhouse.eims.AuthenticationModule.security.services.UserDetailsImpl;
//import co.ke.emtechhouse.eims.AuthenticationModule.utilities.SendCredentialToMail;
//import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseCookie;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import javax.mail.MessagingException;
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.validation.Valid;
//import java.io.IOException;
//import java.time.Duration;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.List;
//import java.util.Objects;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/soa/auth")
//public class AuthController {
//    @Autowired
//    AuthenticationManager authenticationManager;
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    RoleRepository roleRepository;
//    @Autowired
//    OTPRepository otpRepository;
//    @Autowired
//    OTPService otpService;
//
//    @Value("${spring.domain.clientside}")
//    private String clientside;
//
//    @Value("${spring.application.useOTP}")
//    private String useOTP;
//    @Value("${spring.application.otpProd}")
//    private String otpProd;
//    @Value("${spring.application.otpTestMail}")
//    private String otpTestMail;
//
//
//
//    @Autowired
//    PasswordEncoder encoder;
//
//    @Autowired
//    JwtUtils jwtUtils;
//    SendCredentialToMail sm = new SendCredentialToMail();
//
//    @Autowired
//    AuditingRepository auditingRepository;
//
//    @Autowired
//    AuditTrailsController auditTrailsController;
//
//    //Auditing Configs
//    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
//    LocalDateTime now = LocalDateTime.now();
//    String modified_on = dtf.format(now);
//
//    @PostMapping("/signin")
//    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest ) throws MessagingException, IOException {
////        Check if user
//        //Check Account status
//        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
//        if (user.isPresent()){
//            String deletestatus = userRepository.getDeleteFlag(loginRequest.getUsername());
//            //Locked status
//            boolean locked = userRepository.getAccountLockedStatus(loginRequest.getUsername());
//            //Active status
//            boolean active = userRepository.getAccountInactiveStatus(loginRequest.getUsername());
//            //Log in status
//            boolean isLoggedin = userRepository.getLogInStatus(loginRequest.getUsername());
//
//            if (deletestatus.equalsIgnoreCase("Y")) {
//                return ResponseEntity.badRequest().body(new MessageResponse("Error: Account Deleted ! Contact Admin!"));
//            } else if (locked) {
//                return ResponseEntity.badRequest().body(new MessageResponse("Error: Account Locked! Contact Admin!"));
//            } else if (!active) {
//                return ResponseEntity.badRequest().body(new MessageResponse("Error: Account Inactive! Contact Admin!"));
//            }
//            else {
//                Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//                JwtResponse response1 = new JwtResponse();
//                if (useOTP.equalsIgnoreCase("false")){
//                    response1 = getAccessToken(userDetails);
//                    String jwt = jwtUtils.generateJwtTokenWithUsername(response1.getUsername());
//                    Duration dt = Duration.ofDays(1);
//                    ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken",jwt)
//                            .domain(clientside)
//                            .httpOnly(true)
//                            .maxAge(dt)
//                            .path("/")
//                            .secure(true)
//                            .sameSite("None")  // sameSite
//                            .build();
//                    HttpHeaders headers = new HttpHeaders();
//                    headers.set(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
//                    return  new ResponseEntity<>(response1, headers, HttpStatus.OK);
//                }else {
//                    User user3 = userRepository.getById(userDetails.getId());
////                        call otp functionality
//                    String email = otpTestMail;
//                    String otp = otpService.generateOTP(loginRequest.getUsername());
//                    if (otpProd.equalsIgnoreCase("true")){
//                        email = user3.getEmail();
//                    }else {
//                        email = email;
//                    }
//                    sm.sendOTP(email, otp);
//                    return ResponseEntity.ok().body(new MessageResponse("Success.Kindly provide an otp that has been sent to your email for your to complete the authentication process"));
//                }
//            }
//        }else{
//            return ResponseEntity.badRequest().body(new MessageResponse("Error: Account Not Found!"));
//        }
//    }
//
//    @GetMapping(path = "/otp/verify")
//    public ResponseEntity<?> verifyOTP(@RequestParam String username, @RequestParam Integer otpCode) {
//        EntityResponse res =new EntityResponse();
//        OTP otp = otpRepository.validOTP(username);
//        if (Objects.isNull(otp) || !Objects.equals(otp.getOtp(), otpCode)) {
//            res.setMessage("OTP is not valid!");
//            res.setStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
//            res.setEntity(otp);
//        } else {
//            res.setMessage("OTP is  valid!");
//            res.setStatusCode(HttpStatus.OK.value());
//            res.setEntity(otp);
////            gen jwt
//            response1 = getAccessToken(userDetails);
//            String jwt = jwtUtils.generateJwtTokenWithUsername(response1.getUsername());
//            Duration dt = Duration.ofDays(1);
//            ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken",jwt)
//                    .domain(clientside)
//                    .httpOnly(true)
//                    .maxAge(dt)
//                    .path("/")
//                    .secure(true)
//                    .sameSite("None")  // sameSite
//                    .build();
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
//            return  new ResponseEntity<>(response1, headers, HttpStatus.OK);
//        }
//    }
//    private JwtResponse getAccessToken(UserDetailsImpl userDetails){
//        JwtResponse response1 = new JwtResponse();
//        String username = userDetails.getUsername();
////        String jwt = jwtUtils.generateJwtTokenWithUsername(username);
//        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
////        Duration dt = Duration.ofDays(1);
////        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken",jwt)
////                .domain(clientside)
////                .httpOnly(true)
////                .maxAge(dt)
////                .path("/")
////                .secure(true)
////                .sameSite("None")  // sameSite
////                .build();
////        HttpHeaders headers = new HttpHeaders();
////        headers.set(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
//        //Update Logged in status to true
//        userRepository.updateLogInToTrue(true,modified_on,username,username);
//        //Add records to audit table
//        auditTrailsController.addAudit(username+ " Log In to System");
//        List<String> privileges = null;
//        Optional<Role> role = roleRepository.findByName(roles.get(0));
//        if (role.isPresent()){
//            privileges = role.get().getBasicactions().stream().filter(d -> d.isSelected()).map(item -> item.getName())  .collect(Collectors.toList());
//        }
//        User user3 = userRepository.getById(userDetails.getId());
//        response1.setId(userDetails.getId());
//        response1.setUsername(userDetails.getUsername());
//        response1.setEmail(userDetails.getEmail());
//        response1.setRoles(roles);
//        response1.setSystemGenPassword(user3 .isSystemGenPassword());
//        response1.setPrivileges(privileges);
//        auditTrailsController.addAudit("Sign in success");
//        return response1;
//    }
//
//    //Sign Out
//    @PostMapping("/logout")
//    public ResponseEntity<?> signOut(HttpServletResponse response) {
//        //Update Logged in status to true
//        userRepository.updateLogInToFalse(false,modified_on, RequestUsernameContext.getRequestUsername(),RequestUsernameContext.getRequestUsername());
//        Duration dt = Duration.ofDays(0);
//        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken",null)
//                .domain(clientside)
//                .httpOnly(true)
//                .maxAge(dt)
//                .path("/")
//                .secure(true)
//                .sameSite("None")  // sameSite
//                .build();
//        HttpHeaders headers = new HttpHeaders();
//        headers.set(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
//        //Add Audit
//        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername()+ " Logout Success");
//        EntityResponse response1 = new EntityResponse();
//        response1.setMessage("Logged Out Successfully!");
//        response1.setStatusCode(HttpStatus.OK.value());
//        return  new ResponseEntity<>(response1, headers, HttpStatus.OK);
//    }
//}
