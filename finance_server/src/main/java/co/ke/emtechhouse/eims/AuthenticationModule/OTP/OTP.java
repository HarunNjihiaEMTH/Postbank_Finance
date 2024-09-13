package co.ke.emtechhouse.eims.AuthenticationModule.OTP;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "otp")
public class OTP {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "sn")
    private Integer sn;
    @Column(name = "otp", nullable = false)
    private Integer otp;
    @Column(name = "username", nullable = false)
    private String username;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String phone;
    private String email;
    @Column(name = "req_time", nullable = false)
    private Date requestedTime;

    public OTP(Integer sn, Integer otp, String username, Date requestedTime) {
        this.sn = sn;
        this.otp = otp;
        this.username = username;
        this.requestedTime = requestedTime;
    }

    public OTP() {
    }

    public Integer getSn() {
        return sn;
    }

    public void setSn(Integer sn) {
        this.sn = sn;
    }

    public Integer getOtp() {
        return otp;
    }

    public void setOtp(Integer otp) {
        this.otp = otp;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getRequestedTime() {
        return requestedTime;
    }

    public void setRequestedTime(Date requestedTime) {
        this.requestedTime = requestedTime;
    }
}
