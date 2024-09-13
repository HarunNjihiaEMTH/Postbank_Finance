package co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FIXMLS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SuccessReponse {
    private  String tran_id;
    private String tran_date;
    private String status="-";
    private String type="-";
    private String description="-";
    private String errorCode;
}
