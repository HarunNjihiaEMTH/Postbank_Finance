package co.ke.emtechhouse.eims.InvoiceComponent.ImportServicesSeller;

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
public class ImportServicesSeller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String importBusinessName;
    private String importEmailAddress;
    private String importContactNumber;
    private String importAddress;
    private String importInvoiceDate;
    private String importAttachmentName;
    private String importAttachmentContent;
    private String invoiceID;
}
