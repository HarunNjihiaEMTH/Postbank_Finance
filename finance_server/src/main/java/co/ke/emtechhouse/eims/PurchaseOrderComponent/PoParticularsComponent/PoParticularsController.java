package co.ke.emtechhouse.eims.PurchaseOrderComponent.PoParticularsComponent;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.DeliveryHistory.Delivery;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.DeliveryHistory.DeliveryRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/po/particulars")
public class PoParticularsController {
    private final PoParticularsService poParticularsService;
    private final PoParticularsRepo poParticularsRepo;
    private final DeliveryRepo deliveryRepo;

    public PoParticularsController(PoParticularsService poParticularsService, PoParticularsRepo poParticularsRepo, DeliveryRepo deliveryRepo) {
        this.poParticularsService = poParticularsService;
        this.poParticularsRepo = poParticularsRepo;
        this.deliveryRepo = deliveryRepo;
    }

    @PostMapping("/add")
    public ResponseEntity<PoParticulars> addPoParticulars(@RequestBody PoParticulars poParticulars){
        try {
            PoParticulars newPoParticulars = poParticularsService.addPoParticulars(poParticulars);
//            Update History of Deliverables;
            Delivery delivery = new Delivery();
//            public void setId(Long id);
//            public void setItemName(String itemName);
//            public void setItemQuantity(String itemQuantity);
//            public void setItemUnitPrice(Double itemUnitPrice);
//            public void setItemTotalValue(Double itemTotalValue);
//            public void setExpenseId(String expenseId);
//            public void setVatAmount(Double vatAmount);
//            public void setIncomeWithholdingamount(Double incomeWithholdingamount);
//            public void setVatWitholding(Double vatWitholding);
//            public void setDeliveryStatus(String deliveryStatus);
//            public void setAmountTobepaid(Double amountTobepaid);
//            public void setAmountBalance(Double amountBalance);
//            public void setServiceName(String serviceName);
//            public void setServicePrice(String servicePrice);
//            public void setRemarks(String remarks);
//            public void setInvoiceNo(String invoiceNo);
//            public void setPoParticulars_id(String poParticulars_id);
//            public void setPoNumber(String poNumber);
            return  new ResponseEntity<>(newPoParticulars, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<PoParticulars>> getAllPoParticularss () {
        try {
            List<PoParticulars> poParticularss = poParticularsService.getAllPoParticulars();
            return  new ResponseEntity<>(poParticularss, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<PoParticulars> getPoParticularsById (@PathVariable("id") Long id){
        try {
            PoParticulars poParticulars = poParticularsService.getById(id);
            return new ResponseEntity<>(poParticulars, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @PutMapping("/update")
    public ResponseEntity<PoParticulars> updatePoParticulars(@RequestBody PoParticulars poParticulars) {
        Optional<PoParticulars> _existing = poParticularsRepo.findById(poParticulars.getId());
        if (_existing.isPresent()){
            PoParticulars newPoParticulars = poParticularsService.updatePoParticulars(poParticulars);
            return new ResponseEntity<>(newPoParticulars, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deletePoParticulars(@PathVariable("id") Long id) {
//        poParticularsService..deletePoParticularsById(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}
