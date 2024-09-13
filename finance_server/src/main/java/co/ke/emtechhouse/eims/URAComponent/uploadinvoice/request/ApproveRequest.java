package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ApproveRequest {
    private String invoiceno;
    private String username;
    private String action;
    private String message;
}
