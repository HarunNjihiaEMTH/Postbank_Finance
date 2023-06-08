package co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteCancellation;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CancelCreditNoteResponse {

    private String code;
    private String description;
    private String status;
}
