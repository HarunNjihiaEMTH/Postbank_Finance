package co.ke.emtechhouse.eims.URAComponent.SellerAndBasicDetails.seller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/sellerdetails/")
public class SellerDetailsController {
    @Autowired
    private SellerDetailsRepository repository;

    //Add Seller Details
    @PostMapping("/add")
    public ResponseEntity<?> addSellerDetails(@RequestBody SellerDetails sd) {
        repository.save(sd);
        return new ResponseEntity<>("Seller Details Saved Successfully!", HttpStatus.CREATED);
    }

    //Update Seller Details
    @PutMapping("/update")
    public ResponseEntity<?> updateSellerDetails(@RequestBody SellerDetails sd) {
        repository.save(sd);
        return new ResponseEntity<>("Seller Details Updated Successfully!", HttpStatus.OK);
    }

    //Fetch by ID
    @GetMapping("/fetchbyid/")
    public ResponseEntity<?> fetchSellerDetailsByID(Long id)
    {
        return new ResponseEntity<>(repository.findById(id),HttpStatus.OK);
    }

    //Fetch All Sellers Details
    @GetMapping("/all")
    public ResponseEntity<?> fetchSellerDetails()
    {
        return new ResponseEntity<>(repository.findAll(),HttpStatus.OK);
    }

    //Delete Seller Details
    @DeleteMapping
    public ResponseEntity<?> deleteSellerDetails(Long id)
    {
        if(repository.existsById(id))
        {
            repository.deleteById(id);
            return new ResponseEntity<>("Seller Details Deleted Successfully! ID => "+id,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("No Seller Details Found for ID => "+id,HttpStatus.OK);
        }
    }
}
