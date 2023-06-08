package co.ke.emtechhouse.eims.URAComponent.uralookups.invoicekinds;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InvoiceKinds {
    @Expose
    private String code;
    @Expose
    private String name;
}
