package co.ke.emtechhouse.eims.AuthenticationModule.security.jwt;

public class RequestUsernameContext {

    private static ThreadLocal<String> requestUsername = new InheritableThreadLocal<>();

    public static String getRequestUsername() {
        return requestUsername.get();
    }

    public static void setRequestUsername(String username) {
        requestUsername.set(username);
    }

    public static void clear() {
        requestUsername.set(null);
    }
}