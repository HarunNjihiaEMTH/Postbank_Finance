package co.ke.emtechhouse.eims.AuthenticationModule.OTP;

import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.Objects;
import java.util.Random;

@Service @Slf4j
public class OTPService {
    @Autowired
    private OTPRepository otpRepository;

    public String generateOTP(String username)  {
        Integer otp = 1000 + new Random().nextInt(9000);
        OTP otpCode = new OTP();
        log.info("OTP code is {}",otp);
        otpCode.setOtp(otp);
        otpCode.setRequestedTime(new Date());
        otpCode.setUsername(username);
        otpCode.setSn(null);
        otpRepository.save(otpCode);
        return otp.toString();
    }


    public EntityResponse verifyOTP(String collateralCode, Integer otpCode) {
        EntityResponse res =new EntityResponse();
        OTP otp = otpRepository.validOTP(collateralCode);
        if (Objects.isNull(otp) || !Objects.equals(otp.getOtp(), otpCode)) {
            res.setMessage("OTP is not valid!");
            res.setStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
            res.setEntity(otp);
        } else {
            res.setMessage("OTP is  valid!");
            res.setStatusCode(HttpStatus.OK.value());
            res.setEntity(otp);
        }
        return res;
    }

    public String generateOTP(String username, String email)  {
        Integer otp = 1000 + new Random().nextInt(9000);
        OTP otpCode = new OTP();
        log.info("OTP code is {}",otp);
        otpCode.setOtp(otp);
        otpCode.setRequestedTime(new Date());
        otpCode.setUsername(username);
        otpCode.setEmail(email);
        otpCode.setSn(null);
        otpRepository.save(otpCode);
        return otp.toString();
    }
}
