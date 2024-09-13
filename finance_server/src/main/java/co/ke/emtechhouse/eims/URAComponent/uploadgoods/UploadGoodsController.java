package co.ke.emtechhouse.eims.URAComponent.uploadgoods;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/restock/")
public class UploadGoodsController {
    @Autowired
    private UploadGoodsService service;
    @Autowired
    private UploadGoodsRepository repository;

    @PostMapping("/now")
    public ResponseEntity<?> restockNow (@RequestBody Good uraRequest) {
        try {
            return new ResponseEntity<>(service.addStockToURA(uraRequest), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    //Update Goods
    @PostMapping("/update")
    public ResponseEntity<?> modifyStock (@RequestBody Good uraRequest) {
        try {
            return new ResponseEntity<>(service.modifyProduct(uraRequest), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    //Fetch All Goods
    @GetMapping("/all")
    public ResponseEntity<?> fetchAllGoods()
    {
            return new ResponseEntity<>(repository.allGoodsPostedToURA(),HttpStatus.OK);
    }

    //Fetch all Goods
    @GetMapping("/all/goods")
    public ResponseEntity<?> fetchGoodsOnly()
    {
        return new ResponseEntity<>(repository.onlyGoodsPostedToURA(),HttpStatus.OK);
    }

    //Fetch All Services
    @GetMapping("/all/services")
    public ResponseEntity<?> fetchServicesOnly()
    {
        return new ResponseEntity<>(repository.onlyServicesPostedToURA(),HttpStatus.OK);
    }

    //Fetch All failed to upload goods
    @GetMapping("/allfailed")
    public ResponseEntity<?> fetchAllFailedGoods()
    {
        return new ResponseEntity<>(repository.allGoodsFailedToPostToURA(),HttpStatus.OK);
    }

    //Fetch Goods by id
    @GetMapping("/findbyid/{id}")
    public ResponseEntity<?> fetchAllGoodsById(Long id)
    {
        if(repository.existsById(id)) {
            return new ResponseEntity<>(repository.findById(id), HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("No Goods found for this Id => "+id, HttpStatus.OK);
        }
    }
}
