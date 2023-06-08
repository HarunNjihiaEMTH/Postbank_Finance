package co.ke.emtechhouse.eims.AuthenticationModule.exceptions;

import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

public class ApiExceptions
{
    private final String message;
    private final HttpStatus httpStatus;
    private final ZonedDateTime timestamp;

    //Constructor
    public ApiExceptions(String message,ApiRequestException e, HttpStatus httpStatus,
                         ZonedDateTime timestamp)
    {
        this.message = message;
        this.httpStatus = httpStatus;
        this.timestamp = timestamp;
    }

    //Getters and Setters
    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }
}
