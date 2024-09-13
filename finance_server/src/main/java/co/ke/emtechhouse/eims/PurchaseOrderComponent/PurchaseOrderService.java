package co.ke.emtechhouse.eims.PurchaseOrderComponent;

import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
@Slf4j
public class PurchaseOrderService {
    private final PurchaseOrderRepo purchaseOrderRepo;

    public PurchaseOrderService(PurchaseOrderRepo purchaseOrderRepo) {
        this.purchaseOrderRepo = purchaseOrderRepo;
    }
    //
    public PurchaseOrder addPO(PurchaseOrder purchaseOrder){
        try {
            return purchaseOrderRepo.save(purchaseOrder);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }}
    //
    public List<PurchaseOrder> getAllPO(){
        try {
            return purchaseOrderRepo.getPending();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}
    public List<PurchaseOrder> getrejected(){
        try {
            return purchaseOrderRepo.getRejectedpos();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public List<PurchaseOrder> getCancelled(){
        try {
            return purchaseOrderRepo.getCancelled();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }
    }
    public void cancelPo(Long id,String reason,String cancelBy){
        try {
            PurchaseOrder po = purchaseOrderRepo.getById(id);
            po.setCancelStatus("Cancelled");
            po.setCanceledBy(cancelBy);
            po.setCancelReason(reason);
            po.setCanceledTime(new Date());
            purchaseOrderRepo.save(po);

        }catch (Exception e){
            log.info("Catched Error {} " + e);
        }}
    //
    public PurchaseOrder getById(Long id){
        try{
            return purchaseOrderRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}


    public PurchaseOrder updatePO(PurchaseOrder purchaseorder){
        try{
            return purchaseOrderRepo.save(purchaseorder);
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }
    }
    public List<ExpenseData> getexpenseData(String purchaseorder_id){
        try {
            return  purchaseOrderRepo.getexpenses(purchaseorder_id);
        } catch (Exception e) {
            log.error("Error occured : {}",e);
            throw new RuntimeException(e);
        }
    }

    public List<PurchaseOrder> bills(){
        try {
            return purchaseOrderRepo.listPuchaseorders();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }
    }
    public List<Unpaidbills> getUpaidbills(){
        try {
            return purchaseOrderRepo.UnpaidBills();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }
    }
    public List<ExpensePerOrder> expensePerOrder(String po_number){
        try {
            return  purchaseOrderRepo.getexpensesPerorder(po_number);
        } catch (Exception e) {
            log.error("Error occured : {}",e);
            throw new RuntimeException(e);
        }
    }
}
