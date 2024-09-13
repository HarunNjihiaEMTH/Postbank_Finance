package co.ke.emtechhouse.eims.PurchaseOrderComponent.DeliveryHistory;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/po/particulars/delivery")
public class DeliveryController {
    private final DeliveryService deliveryService;
    private final DeliveryRepo deliveryRepo;

    public DeliveryController(DeliveryService deliveryService, DeliveryRepo deliveryRepo) {
        this.deliveryService = deliveryService;
        this.deliveryRepo = deliveryRepo;
    }

    @PostMapping("/add")
    public ResponseEntity<Delivery> addDelivery(@RequestBody Delivery delivery){
        try {
            Delivery newDelivery = deliveryService.addDelivery(delivery);
            return  new ResponseEntity<>(newDelivery, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Delivery>> getAllDeliverys () {
        try {
            List<Delivery> deliverys = deliveryService.getAllDelivery();
            return  new ResponseEntity<>(deliverys, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Delivery> getDeliveryById (@PathVariable("id") Long id){
        try {
            Delivery delivery = deliveryService.getById(id);
            return new ResponseEntity<>(delivery, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @PutMapping("/update")
    public ResponseEntity<Delivery> updateDelivery(@RequestBody Delivery delivery) {
        Optional<Delivery> _existing = deliveryRepo.findById(delivery.getId());
        if (_existing.isPresent()){
            Delivery newDelivery = deliveryService.updateDelivery(delivery);
            return new ResponseEntity<>(newDelivery, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deleteDelivery(@PathVariable("id") Long id) {
//        deliveryService..deleteDeliveryById(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}

