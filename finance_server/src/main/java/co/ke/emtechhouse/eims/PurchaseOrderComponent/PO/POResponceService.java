package co.ke.emtechhouse.eims.PurchaseOrderComponent.PO;

import co.ke.emtechhouse.eims.Finacle.pickingaccounts.ContraDetails;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.ExpensePerOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.Unpaidbills;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class POResponceService {
    @Autowired
    PurchaseOrderRepo purchaseOrderRepo;

    public List<POExpenseResponce> getPOExpensePayments(){
        try {
            List<POExpenseResponce> customresponce = new ArrayList<>();
            List<Unpaidbills> query = purchaseOrderRepo.UnpaidBills();
            for (int i =0; i<query.size(); i++){
                POExpenseResponce payResponce  = new POExpenseResponce();
                payResponce.setSupplierName(query.get(i).getSupplierName());
                payResponce.setGetSupplierAccount(query.get(i).getSupplierAccount());
                payResponce.setInvoiceNo(query.get(i).getInvoiceNo());
                payResponce.setInvoiceDate(query.get(i).getInvoiceDate());
                payResponce.setInvoiceAmount(query.get(i).getInvoiceAmount());
                payResponce.setPaymentExpenses(getAllPO(query.get(i).getPo_Number()));
                customresponce.add(payResponce);
            }
            return customresponce;
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public List<ExpensePerOrder> getAllPO(String po_number){
        System.out.println("PO NO"+po_number);
        try {
            return purchaseOrderRepo.getexpensesPerorder(po_number);
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }
    }
}
