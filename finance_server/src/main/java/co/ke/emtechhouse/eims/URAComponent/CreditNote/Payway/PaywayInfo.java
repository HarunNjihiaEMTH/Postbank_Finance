package co.ke.emtechhouse.eims.URAComponent.CreditNote.Payway;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PaywayInfo {

    @Expose
    private String localInvoiceNo;
    @Expose
    private String orderNumber;
    @Expose
    private String paymentAmount;
    @Expose
    private String paymentMode;

}
