package co.ke.emtechhouse.eims.AuthenticationModule.payload;

public class LockAccount {
    private String username;
    private boolean status;

    public LockAccount(String username, boolean status) {
        this.username = username;
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
