/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package co.ke.emtechhouse.eims.AuthenticationModule.controllers;


import co.ke.emtechhouse.eims.AuthenticationModule.payload.*;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.AuditingRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.RoleRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.UserRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.JwtUtils;
import co.ke.emtechhouse.eims.AuthenticationModule.services.SendEmailService;
import co.ke.emtechhouse.eims.AuthenticationModule.utilities.ToolKit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/soa/otherusers")
public class OtherUsersController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuditingRepository auditingRepository;

    @Autowired
    SendEmailService mailService;

    //Instance of ToolKit Class
    ToolKit tk = new ToolKit();

    //Auditing Configs
    String username = "";
    String modified_by = "";
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    String modified_on = dtf.format(now);


    //Auditing
    public void addAudit(Authentication authentication, HttpServletRequest request, String action) {
        Auditing auditing = new Auditing();
        auditing.setActivity(action);
        auditing.setStarttime(new Date());
        auditing.setUsername(authentication.getName());
        auditing.setRequestip(request.getRemoteAddr());
        auditingRepository.save(auditing);
    }

    //Change Password
    @PutMapping("/changepassword")
    public ResponseEntity<?> updateYourPassword(@Valid @RequestBody UpdatePassword update, Authentication auth, HttpServletRequest request) {
        modified_by = auth.getName();
        userRepository.updateUserPassword(encoder.encode(update.getPassword()), modified_on, modified_by, update.getUsername());

        //Add Audit
        addAudit(auth, request, update.getUsername()+" - Change Password");
        return ResponseEntity.ok(new MessageResponse("Password Updated successfully!"));
    }

    //User update Profile Information
    //Update user details (Partial Update)
    @PutMapping("/updateprofile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody PartialUpdate update, Authentication auth, HttpServletRequest request) {
        //Select Email Address
        String email = userRepository.getEmailAddress(update.getId());

        if (userRepository.existsByEmail(update.getEmail()) && !email.equalsIgnoreCase(update.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }
        userRepository.updateDetails(update.getId(), update.getFirstname(), update.getLastname(), update.getPhonenumber(), modified_by, modified_on, update.getEmail());

        //Add Audit
        addAudit(auth, request, username + " - Update Profile Details");

        return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
    }

    //Fetch user details by Id
    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUserDetailsById(@PathVariable("id") long id, Authentication auth, HttpServletRequest request)
    {
        Optional<User> details = userRepository.findById(id);
        //Add Audit
        addAudit(auth, request, "User Fetch Details By ID :: User ID " + id);
        return new ResponseEntity(details, HttpStatus.OK);
    }
}
