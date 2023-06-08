package co.ke.emtechhouse.eims.AuthenticationModule.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdatePassword {
    private String username;
    private String password;
    private String confirmpassword;
}
