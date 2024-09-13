/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package co.ke.emtechhouse.eims.AuthenticationModule.payload;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "ResetPassword")
public class ResetPassword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String emailaddress;
    private Date date;
    private int requesthr;

    public ResetPassword(Long id, String emailaddress, Date date, int requesthr, int code, String status) {
        this.id = id;
        this.emailaddress = emailaddress;
        this.date = date;
        this.requesthr = requesthr;
        this.code = code;
        this.status = status;
    }

    private int code;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailaddress() {
        return emailaddress;
    }

    public void setEmailaddress(String emailaddress) {
        this.emailaddress = emailaddress;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getRequesthr() {
        return requesthr;
    }

    public void setRequesthr(int requesthr) {
        this.requesthr = requesthr;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String status;

    public ResetPassword() {
    }

}
