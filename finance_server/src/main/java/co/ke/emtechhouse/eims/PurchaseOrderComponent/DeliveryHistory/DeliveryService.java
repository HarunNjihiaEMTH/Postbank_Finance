package co.ke.emtechhouse.eims.PurchaseOrderComponent.DeliveryHistory;

import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class DeliveryService {
    private final DeliveryRepo deliveryRepo;

    public DeliveryService(DeliveryRepo deliveryRepo) {
        this.deliveryRepo = deliveryRepo;
    }

    public Delivery addDelivery(Delivery delivery){
        try {
            return deliveryRepo.save(delivery);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }}
    //
    public List<Delivery> getAllDelivery(){
        try {
            return deliveryRepo.findAll();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}
    //
    public Delivery getById(Long id){
        try{
            return deliveryRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}


    public Delivery updateDelivery(Delivery purchaseorder){
        try{
            return deliveryRepo.save(purchaseorder);
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }
    }
}