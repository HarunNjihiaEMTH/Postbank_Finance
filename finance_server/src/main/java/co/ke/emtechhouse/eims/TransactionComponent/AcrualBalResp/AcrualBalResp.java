package co.ke.emtechhouse.eims.TransactionComponent.AcrualBalResp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AcrualBalResp {
    String Description;
    Date CollectionDate;
    String Month;
    String Transid;
    Double Accrualbal;
}
