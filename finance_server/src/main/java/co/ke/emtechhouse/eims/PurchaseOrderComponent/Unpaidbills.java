package co.ke.emtechhouse.eims.PurchaseOrderComponent;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.PoParticularsComponent.PoParticulars;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;

public interface Unpaidbills {
        String getPoId();
        String getSupplierName();
        String getPoName();
        String getPo_Number();
        String getPoStatus();
        String getTotal_after_tax();
        String getIncome_withholding_amount();
        String getVat_amount();
        String getPostedTime();
        String getInvoiceNo();
        String getSupplierAccount();
        String getInvoiceDate();
        String getInvoiceAmount();
}

//        @OneToMany(targetEntity = PoParticulars.class, cascade = CascadeType.ALL)
//        @JoinColumn(name = "purchaseOrder_id", referencedColumnName = "id")
//        private List<PoParticulars> poParticulars;
