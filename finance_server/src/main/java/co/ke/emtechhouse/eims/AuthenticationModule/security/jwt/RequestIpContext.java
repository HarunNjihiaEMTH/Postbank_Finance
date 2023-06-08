package co.ke.emtechhouse.eims.AuthenticationModule.security.jwt;

public class RequestIpContext {

    private static ThreadLocal<String> requestIp = new InheritableThreadLocal<>();

    public static String getRequestIp() {
        return requestIp.get();
    }

    public static void setRequestIp(String ip) {
        requestIp.set(ip);
    }

    public static void clear() {
        requestIp.set(null);
    }
}