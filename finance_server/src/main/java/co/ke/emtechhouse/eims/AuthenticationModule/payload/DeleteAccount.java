package co.ke.emtechhouse.eims.AuthenticationModule.payload;

public class DeleteAccount {
    private String username;
    private boolean inactive;

    public boolean isInactive() {
        return inactive;
    }

    public void setInactive(boolean inactive) {
        this.inactive = inactive;
    }

    public boolean isLock() {
        return lock;
    }

    public void setLock(boolean lock) {
        this.lock = lock;
    }

    private boolean lock;

    public DeleteAccount(String username, boolean inactive, boolean lock) {
        this.username = username;
        this.inactive = inactive;
        this.lock = lock;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
