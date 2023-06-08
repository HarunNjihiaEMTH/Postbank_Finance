package co.ke.emtechhouse.eims.AuthenticationModule.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler
{
    @ExceptionHandler(value={ApiRequestException.class})
    public ResponseEntity<Object> handleException(ApiRequestException e)
    {
        //Create payload containing exception details
        //Return actual exception
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ApiExceptions apiException = new ApiExceptions(
                e.getMessage(),
                e,
                badRequest,
                ZonedDateTime.now(ZoneId.of("Z"))
        );
        return new ResponseEntity<>(apiException,badRequest);
    }
}
