package co.ke.emtechhouse.eims.ResponseMessage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseMessage {
    private String status;
    private String transactionCode;
    private Date transactionDate;
}
