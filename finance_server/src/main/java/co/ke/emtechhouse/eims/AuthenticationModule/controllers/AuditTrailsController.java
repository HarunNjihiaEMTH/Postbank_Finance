/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package co.ke.emtechhouse.eims.AuthenticationModule.controllers;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.Auditing;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.AuditingRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.RequestIpContext;
import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.RequestUsernameContext;
import co.ke.emtechhouse.eims.AuthenticationModule.utilities.ToolKit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

//@CrossOrigin(origins = "*", maxAge = 3600) /soa/audit/all
@RestController
@RequestMapping("/soa/audit")
public class AuditTrailsController {

@Autowired
private AuditingRepository repository;

    //Instance of ToolKit Class
    ToolKit tk = new ToolKit();

    //Auditing Configs
    String username = "";
    String modified_by = "";
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    String modified_on = dtf.format(now);

    //List all audit trails for a single day
    @GetMapping("/todaylogs")
    public ResponseEntity<List<Auditing>> getTodayLogs(@RequestParam("uname") String username, @RequestParam("stime") String starttime) {
        List<Auditing> logs = repository.todayTrails(username,starttime);
        return new ResponseEntity<>(logs, HttpStatus.OK);
    }

    //List all audit trails for a single day
    @GetMapping("/all")
    public ResponseEntity<List<Auditing>> getAllLogs(@RequestParam String fromDate, @RequestParam String toDate) {
        List<Auditing> logs = repository.allTrailsByDate(fromDate,toDate);
        return new ResponseEntity<>(logs, HttpStatus.OK);
    }

    //List all audit trails for a user
    @GetMapping("/alllogs/{username}")
    public ResponseEntity<List<Auditing>> getAllLogs(@PathVariable("username") String username){
        List<Auditing> logs = repository.allTrails(username);
        return new ResponseEntity<>(logs, HttpStatus.OK);
    }
    //Auditing
    public void addAudit(String activity ) {
        Auditing auditing = new Auditing();
        auditing.setActivity(activity);
        auditing.setStarttime(new Date());
        auditing.setUsername(RequestUsernameContext.getRequestUsername());
        auditing.setRequestip(RequestIpContext.getRequestIp());
        repository.save(auditing);
    }
}
