package co.ke.emtechhouse.eims.AuthenticationModule.exceptions;

public class ApiRequestException extends RuntimeException
{
    //Constructor
    public ApiRequestException(String message)
    {
        super(message);
    }

    //Constructor
    public ApiRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
