/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package co.ke.emtechhouse.eims.AuthenticationModule.utilities;

import java.util.Random;

public class ToolKit {

    //Lower Case letters to be used in the password
    private final String LOWER_CASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";

    //Upper Case letters to be used in the password
    private final String UPPER_CASE_LETTERS = LOWER_CASE_LETTERS.toUpperCase();

    //Numbers that will form the numeric part of the password
    private final String DIGITS = "0123456789";

    //Special characters
    private final String SPECIAL_CHARACTERS = "!@#$%^&*_=+-/";

    //Minimum Password Length
    private final int PASSWORD_LENGTH = 10;
    private Random random = new Random();

    //Password Generator During Account Creation
    public String generatePassword() {
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);
        password.append(generateRandomChar(LOWER_CASE_LETTERS));
        password.append(generateRandomChar(UPPER_CASE_LETTERS));
        password.append(generateRandomChar(DIGITS));
        password.append(generateRandomChar(SPECIAL_CHARACTERS));

        for (int i = 0; i < PASSWORD_LENGTH - 4; i++) {
            String charSet = getCharSet(i);
            password.append(generateRandomChar(charSet));
        }

        return shufflePassword(password.toString());
    }

    private char generateRandomChar(String charSet) {
        int index = random.nextInt(charSet.length());
        return charSet.charAt(index);
    }

    private String getCharSet(int index) {
        switch (index % 3) {
            case 0:
                return LOWER_CASE_LETTERS;
            case 1:
                return UPPER_CASE_LETTERS;
            case 2:
                return DIGITS;
            default:
                return SPECIAL_CHARACTERS;
        }
    }

    private String shufflePassword(String password) {
        char[] passwordChars = password.toCharArray();
        for (int i = 0; i < passwordChars.length; i++) {
            int j = random.nextInt(passwordChars.length);
            char temp = passwordChars[i];
            passwordChars[i] = passwordChars[j];
            passwordChars[j] = temp;
        }
        return new String(passwordChars);
    }


    //Generate Password reset token
    public int generatePassRessetToken() {
        Random rn = new Random();
        int token = rn.nextInt(1000000 - 110 + 1) + 2;
        return token;
    }
}
