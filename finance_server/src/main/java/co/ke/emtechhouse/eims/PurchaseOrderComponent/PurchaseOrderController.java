package co.ke.emtechhouse.eims.PurchaseOrderComponent;


import co.ke.emtechhouse.eims.PurchaseOrderComponent.ModifiablePOParticulars.ModifiablePoParticularsRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PO.POExpenseResponce;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PO.POResponceService;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PoParticularsComponent.PoParticulars;
import co.ke.emtechhouse.eims.ReportService.ReportMailService;
import co.ke.emtechhouse.eims.ReportService.ReportService;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import co.ke.emtechhouse.eims.SupplierComponent.Supplier;
import co.ke.emtechhouse.eims.SupplierComponent.SupplierRepo;
import co.ke.emtechhouse.eims.Utils.CodeGenerator;
import co.ke.emtechhouse.eims.Utils.Response;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JRException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/po/")
public class PurchaseOrderController {
    private final PurchaseOrderRepo purchaseOrderRepo;
    private final PurchaseOrderService purchaseOrderService;
    private final ReportMailService reportMailService;
    private final ReportService reportService;
    private final SupplierRepo supplierRepo;
    private final CodeGenerator codeGenerator;
    private final ModifiablePoParticularsRepo modifiablePoParticularsRepo;
    private final POResponceService poResponceService;

    public PurchaseOrderController(PurchaseOrderRepo purchaseOrderRepo, PurchaseOrderService purchaseOrderService, ReportMailService reportMailService, ReportService reportService, SupplierRepo supplierRepo, CodeGenerator codeGenerator, ModifiablePoParticularsRepo modifiablePoParticularsRepo, POResponceService poResponceService) {
        this.purchaseOrderRepo = purchaseOrderRepo;
        this.purchaseOrderService = purchaseOrderService;
        this.reportMailService = reportMailService;
        this.reportService = reportService;
        this.supplierRepo = supplierRepo;
        this.codeGenerator = codeGenerator;
        this.modifiablePoParticularsRepo = modifiablePoParticularsRepo;
        this.poResponceService = poResponceService;

    }

    @PostMapping("/add")
    public ResponseEntity<PurchaseOrder> addPO(@RequestBody PurchaseOrder purchaseOrder) {
        try {//
            Double totalAmount = 0.0;
//            Loop through particulars and get each value, add to the total amount;
            List<PoParticulars> poParticulars = purchaseOrder.getPoParticulars();
            for (int i = 0; i < poParticulars.size(); i++) {
                Double sum = totalAmount + poParticulars.get(i).getItemTotalValue();
                totalAmount = sum;
            }
//            purchaseOrder.setPoNumber(codeGenerator.generateRandomCode(3));
            purchaseOrder.setPoNumber(getCodeGenRetailCustomerCode());
//            purchaseOrder.setPoTotalAmount(totalAmount);
            PurchaseOrder newpurchaseOrder = purchaseOrderService.addPO(purchaseOrder);
            return new ResponseEntity<>(newpurchaseOrder, HttpStatus.CREATED);
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }

    public String getCodeGenRetailCustomerCode() {
        int runNumber = 000000000;
        String poNumber = "#";
        Optional<PurchaseOrder> purchaseOrder = purchaseOrderRepo.findLastEntry();
        if (purchaseOrder.isPresent()){
            runNumber = (int) (runNumber + purchaseOrder.get().getId());
            poNumber = poNumber + runNumber;
        }else {
            runNumber = runNumber + 1;
            poNumber = poNumber + runNumber;
        }
        return poNumber;
    }

    @PostMapping("/generate/email")
    public ResponseEntity<?> email(@RequestParam String po_number) {
        try {
            PurchaseOrder purchaseOrder = purchaseOrderRepo.getByPo_number(po_number);
            if (purchaseOrder!=null) {
//                Get SUpplier Details
                Optional<Supplier> supplier = supplierRepo.findById(purchaseOrder.getSupplierId());
                if (supplier.isPresent()) {

                    String supplier_email = supplier.get().getSupplierEmail();
                    String poNumber = purchaseOrder.getPoNumber();
                    System.out.println("Email is "+ supplier_email + "Po number is "+ poNumber);
                    reportMailService.sendPO(supplier_email, poNumber);
                    Response response = new Response();
                    response.setMessage("Email Sent successfully to "+ supplier.get().getSupplierEmail());
                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
                    EntityResponse response = new EntityResponse();
                    response.setMessage("No Supplier with such details");
                    response.setStatusCode(200);
                    response.setEntity("");
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }
            } else {
                EntityResponse response = new EntityResponse();
                response.setMessage("No Purchase Order Found with such details");
                response.setStatusCode(200);
                response.setEntity("");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }

    @PostMapping("/generate/download")
    public ResponseEntity<?> download(@RequestBody PurchaseOrder purchaseOrder) {
        try {
            Optional<PurchaseOrder> purchaseOrder1 = purchaseOrderRepo.findById(purchaseOrder.getId());
            if (purchaseOrder1.isPresent()) {
//                Get Supplier Details
                Optional<Supplier> supplier = supplierRepo.findById(purchaseOrder.getSupplierId());
                if (supplier.isPresent()) {
                    String partner_address = supplier.get().getSupplierAddress();
                    String partner_name = supplier.get().getSupplierName();
                    String partner_company_name = supplier.get().getSupplierName();
                    String partner_email = supplier.get().getSupplierEmail();
                    String partner_zip_postalCode = supplier.get().getPartner_zip_postalCode();
                    String poNumber = purchaseOrder.getPoNumber();
                    reportService.generatePOOrder(partner_address, partner_name, partner_company_name, partner_email, partner_zip_postalCode, poNumber);

                } else {
                    EntityResponse response = new EntityResponse();
                    response.setMessage("No Supplier with such details");
                    response.setStatusCode(400);
                    response.setEntity("");
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }
                EntityResponse response = new EntityResponse();
                response.setMessage("No Purchase Order Found with such details");
                response.setStatusCode(400);
                response.setEntity("");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            } else {
                EntityResponse response = new EntityResponse();
                response.setMessage("No Purchase Order Found with such details");
                response.setStatusCode(400);
                response.setEntity("");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<PurchaseOrder>> getAllPO() {
        try {
            List<PurchaseOrder> purchaseOrder = purchaseOrderService.getAllPO();
            return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }
    @GetMapping("/rejected")
    public ResponseEntity<List<PurchaseOrder>> getreject() {
        try {
            List<PurchaseOrder> purchaseOrder = purchaseOrderService.getrejected();
            return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }
    @GetMapping("/cancelled")
    public ResponseEntity<List<PurchaseOrder>> getCancelled() {
        try {
            List<PurchaseOrder> purchaseOrder = purchaseOrderService.getCancelled();
            return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }
    @GetMapping("/paid")
    public ResponseEntity<List<PurchaseOrder>> getPaid() {
        try {
            List<PurchaseOrder> purchaseOrder = purchaseOrderRepo.getAllPaid();
            return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }
    @PutMapping("/cancel")
    public ResponseEntity<?> cancel(@RequestParam Long purchaseorder_id,@RequestParam String reason,@RequestParam String cancelledBy ) {
        try {
            Optional<PurchaseOrder> purchaseOrder = purchaseOrderRepo.findById(purchaseorder_id);
            if (purchaseOrder.isPresent()){
                PurchaseOrder po = purchaseOrder.get();
                po.setPoStatus("Canceled");
                po.setCanceledBy(cancelledBy);
                po.setReason(reason);
                purchaseOrderRepo.save(po);
                return new ResponseEntity<>(new Response("Purchase order cancelled successfully"), HttpStatus.OK);

            }else{
                return new ResponseEntity<>(new Response("Purchase order Not Found"), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }


    @GetMapping("/all/po-expense-payments")
    public ResponseEntity<List<POExpenseResponce>> getpoResponceService() {
        try {
            List<POExpenseResponce> datares = poResponceService.getPOExpensePayments();
            return new ResponseEntity<>(datares, HttpStatus.OK);
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }
    @GetMapping("/all/sent")
    public ResponseEntity<List<PurchaseOrder>> getallsent() {
        try {
            List<PurchaseOrder> purchaseOrder = purchaseOrderRepo.sentpo();
            return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }

    @GetMapping("/all/not/sent")
    public ResponseEntity<List<PurchaseOrder>> getAllnotsent() {
        try {
            List<PurchaseOrder> purchaseOrder = purchaseOrderRepo.unsentpo();
            return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<PurchaseOrder> getById(@PathVariable("id") Long id) {
        PurchaseOrder purchaseOrder = purchaseOrderService.getById(id);
        return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
    }

    @PutMapping("/update/status")
    public ResponseEntity<PurchaseOrder> updatePO(@RequestParam Long id, @RequestParam String Status, @RequestParam Boolean isSent, @RequestParam String verifiedBy, @RequestParam String reason, @RequestParam Date verifiedTime ) throws JRException, SQLException, MessagingException, FileNotFoundException {

        Optional<PurchaseOrder> _existing = purchaseOrderRepo.findById(id);
        if (_existing.isPresent()) {
            PurchaseOrder purchaseOrder = _existing.get();
            purchaseOrder.setPoStatus(Status);
            if(Status.equalsIgnoreCase("Approved")){
                Optional<Supplier> supplier = supplierRepo.findById(purchaseOrder.getSupplierId());
                String supplier_email = supplier.get().getSupplierEmail();
                try{
                    reportMailService.sendPO(supplier_email, purchaseOrder.getPoNumber());
                    Response response = new Response();
                    response.setMessage("Email Sent successfully to "+ supplier.get().getSupplierEmail());
                }catch (Exception e){
                    e.printStackTrace();
                    log.error("Error: {}",e.getLocalizedMessage());
                }

            }else if(Status.equalsIgnoreCase("Rejected")){
                purchaseOrder.setReason(reason);
            }
            purchaseOrder.setVerifiedBy(verifiedBy);
            purchaseOrder.setVerifiedTime(verifiedTime);
            purchaseOrder.setIsSent(isSent);
            purchaseOrderService.updatePO(purchaseOrder);
            return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<PurchaseOrder> updatePO(@RequestBody PurchaseOrder purchaseOrder) {
        Optional<PurchaseOrder> _existing = purchaseOrderRepo.findById(purchaseOrder.getId());
        if (_existing.isPresent()) {
            PurchaseOrder newpurchaseOrder = purchaseOrderService.updatePO(purchaseOrder);
            return new ResponseEntity<>(newpurchaseOrder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePurchaseOrder(@PathVariable("id") Long id) {
        purchaseOrderRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(path = "movettobill/{id}/{invoice_no}")
    public ResponseEntity movetobill(@PathVariable Long id, @PathVariable String invoice_no) {
        PurchaseOrder purchaseOrder = purchaseOrderRepo.getById(id);
        if (purchaseOrder != null) {
            purchaseOrder.setInvoice_no(invoice_no);
            purchaseOrder.setMoveToBill(true);
            purchaseOrderRepo.save(purchaseOrder);
            return ResponseEntity.ok().body(new Response("Order updated"));
        }
        else{
            return null;
        }
    }
    @GetMapping(path = "bills")
    public ResponseEntity<?> getbills() {
        return ResponseEntity.ok().body(purchaseOrderRepo.moveBills());
    }
}