package co.ke.emtechhouse.eims.StockManagement.data;

import javax.persistence.*;

@Entity
@Table(name = "efriscats")
public class StockData {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;
	private String segmentname;
	private String familycode;
	private String familyname;
	private String classcode;
	private String classname;

	public StockData() {
	}

	private String commoditycode;
	private String commodityname;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSegmentname() {
		return segmentname;
	}

	public void setSegmentname(String segmentname) {
		this.segmentname = segmentname;
	}

	public String getFamilycode() {
		return familycode;
	}

	public void setFamilycode(String familycode) {
		this.familycode = familycode;
	}

	public String getFamilyname() {
		return familyname;
	}

	public void setFamilyname(String familyname) {
		this.familyname = familyname;
	}

	public String getClasscode() {
		return classcode;
	}

	public void setClasscode(String classcode) {
		this.classcode = classcode;
	}

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getCommoditycode() {
		return commoditycode;
	}

	public void setCommoditycode(String commoditycode) {
		this.commoditycode = commoditycode;
	}

	public String getCommodityname() {
		return commodityname;
	}

	public void setCommodityname(String commodityname) {
		this.commodityname = commodityname;
	}

	public String getIsservice() {
		return isservice;
	}

	public void setIsservice(String isservice) {
		this.isservice = isservice;
	}

	public StockData(Long id, String segmentname, String familycode, String familyname, String classcode, String classname, String commoditycode, String commodityname, String isservice) {
		this.id = id;
		this.segmentname = segmentname;
		this.familycode = familycode;
		this.familyname = familyname;
		this.classcode = classcode;
		this.classname = classname;
		this.commoditycode = commoditycode;
		this.commodityname = commodityname;
		this.isservice = isservice;
	}

	private String isservice;

}
