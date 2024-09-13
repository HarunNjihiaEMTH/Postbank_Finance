package co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteCancellation;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CancelCreditNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String oriInvoiceId;
    private String invoiceNo;
    private String reason;
    private String reasonCode;
    private String invoiceApplyCategoryCode;

    //custom fields
    private Date postedAt = new Date();
    private String postedBy;
    private String status="Pending";
    private String verifiedBy;
    private Date verifiedTime;
    //
    private String uraStatus="Pending";
    private String postedStatus="N";
    private String responseCode;
    private String referenceNo;



}
