package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "urainvoices")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SaveInvoiceDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String invoiceno;
    private String customerid;
    private String uracode;
    private String uradescription;
    private String datetime;
    private String deviceoperator;
    private String paymentstatus="Pending";
    private String creditNoteStatus="Pending";
    private Integer retryCount=0;
}
