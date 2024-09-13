package co.ke.emtechhouse.eims.AuthenticationModule.payload;

import co.ke.emtechhouse.eims.Utils.ValidationConstraints.Password;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SignupRequest {
    @NotBlank
    @Size(max = 100)
    private String firstname;
    @NotBlank
    @Size(max = 100)
    private String lastname;
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
    @NotBlank
    @Size(max = 100)
    private String phonenumber;
    @NotBlank
    @Size(max = 100)
    @Email
    private String email;
    @Password
    private String password;
    @NotBlank
    @Size(max = 100)
    private String department;
    private String role;
}
