package co.ke.emtechhouse.eims.URAComponent.uralookups.taxcodes;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TaxCodes {
    @Expose
    private String code;
    @Expose
    private String name;
}
