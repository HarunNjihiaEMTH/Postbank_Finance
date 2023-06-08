/*
 * Copyright (c) 2022. Omukubwa Software Solutions, OSS.
 * All Rights Reserved.
 */

package co.ke.emtechhouse.eims.Finacle.AccountsLookUp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OfficeAccountsResponse {
    private String accountnumber;
    private String accountname;
    private String currency;
    private String schemeType;
    private  String branchId;

}
