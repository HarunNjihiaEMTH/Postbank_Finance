/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package co.ke.emtechhouse.eims.AuthenticationModule.payload;

public class ChangePassword {
    public ChangePassword() {
    }

    private int token;

    public ChangePassword(int token, String password, String emailaddress) {
        this.token = token;
        this.password = password;
        this.emailaddress = emailaddress;
    }

    private String password;

    public int getToken() {
        return token;
    }

    public void setToken(int token) {
        this.token = token;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailaddress() {
        return emailaddress;
    }

    public void setEmailaddress(String emailaddress) {
        this.emailaddress = emailaddress;
    }

    private String emailaddress;
}
