package co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FailureResponse;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Failure {
    private String status;
    private String type;
    private String description;
    private Integer errorCode;

}
