package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "invoicesauditdetails")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InvoiceAuditDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Expose
    private String localInvoiceNo;
    private String status = "Pending";
    private String reason = "-";
    private String postedToURABy;
    private String postedToURAFlag;
    private Date postedToURATime;
    private String modifiedBy;
    private String modifiedFlag;
    private Date modifiedTime;
    private String verifiedBy;
    private String verifiedFlag;
    private Date verifiedTime;
    private String deletedBy;
    private String deletedFlag;
    private Date deletedTime;
    private String importOrLocal = "NO";
}
