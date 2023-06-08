package co.ke.emtechhouse.eims.Utils;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class CodeGenerator {
    public static String generateRandomCode(int len) {
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk"
                +"lmnopqrstuvwxyz!@#$%&";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < 15; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }
}
