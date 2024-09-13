package co.ke.emtechhouse.eims.TransactionComponent.PointingContraDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PointingAccountContraDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;
	private String tranId;
	private String partTranSrlNum;
	private String solId;
	private String partTranType;
	private String acctCrncyCode;
	private Double amt=0.00;
	private String acctName;
	private String orgTranAmt;
	private String totalOffsetAmt;
	private String tranDate;
	private String numOffsetPtran;
	private String tranParticular;
	private String foracid;
}