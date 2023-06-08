package co.ke.emtechhouse.eims.Finacle.pointingAccountInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@XmlRootElement(name = "body")
@XmlAccessorType(XmlAccessType.FIELD)
public class ContraDetails {
    @XmlElement(name = "foracids")
    private List<body> foracids;
}
