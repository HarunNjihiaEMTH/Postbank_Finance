package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response.URAInvoiceResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UploadInvoiceResponse {
    private String code;
    private String description;
    private URAInvoiceResponse body;
}
