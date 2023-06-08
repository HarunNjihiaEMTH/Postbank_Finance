package co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteresponse;

import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response.URAInvoiceResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CreditNoteResponse {

    private String code;
    private String description;
    private String status;
//    private URAInvoiceResponse body;
}
