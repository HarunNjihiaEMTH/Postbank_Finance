package co.ke.emtechhouse.eims.Utils.MigrationCombonent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Expensecostcenter {
    private String account;
    private String branch;
    private String branchname;
    private String acccy;
    private String accname;
    private String glsubheadcode;
    private String glsubheadcodedesc;
    private String schemetype;
    private String schemecode;
}
