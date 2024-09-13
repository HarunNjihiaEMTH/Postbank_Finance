package co.ke.emtechhouse.eims.URAComponent.CreditNote.TaxDetail;

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

public class TaxDetailsCr {

    @Expose
    private String grossAmount;
    @Expose
    private String netAmount;
    @Expose
    private String taxAmount;
    @Expose
    private String taxCategoryCode;
    @Expose
    private String taxRate;
    @Expose
    private String taxRateName;

    @Expose
    private String exciseUnit;


    @Expose
    private String localInvoiceNo;
}
