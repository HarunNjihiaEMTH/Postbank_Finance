
package co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteCancellation;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CreditNotCancellationRequest {

    private String oriInvoiceId;
    private String invoiceNo;
    private String reason;
    private String reasonCode;
    private String invoiceApplyCategoryCode;

}
