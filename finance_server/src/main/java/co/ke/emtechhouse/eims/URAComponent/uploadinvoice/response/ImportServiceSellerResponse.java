package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "UraImportServicesSeller")
public class ImportServiceSellerResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @SerializedName("importAddress")
    private String importAddress;
    @SerializedName("importAttachmentContent")
    private String importAttachmentContent;
    @SerializedName("importAttachmentName")
    private String importAttachmentName;
    @SerializedName("importBusinessName")
    private String importBusinessName;
    @SerializedName("importContactNumber")
    private String importContactNumber;
    @SerializedName("importEmailAddress")
    private String importEmailAddress;
    @SerializedName("importInvoiceDate")
    private String importInvoiceDate;
    private String invoiceId;
    private String customerid;
}
