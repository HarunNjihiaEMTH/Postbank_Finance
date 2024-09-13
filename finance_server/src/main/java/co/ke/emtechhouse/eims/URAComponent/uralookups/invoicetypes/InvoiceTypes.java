
package co.ke.emtechhouse.eims.URAComponent.uralookups.invoicetypes;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InvoiceTypes {
    @Expose
    private String code;
    @Expose
    private String name;
}
