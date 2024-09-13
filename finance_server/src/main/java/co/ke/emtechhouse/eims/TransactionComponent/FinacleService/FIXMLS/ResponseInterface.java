package co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FIXMLS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseInterface {
    private String status;
    private String transactionCode;
    private String transactionDate;
}
