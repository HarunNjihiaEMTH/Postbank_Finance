package co.ke.emtechhouse.eims.URAComponent.SellerAndBasicDetails.basic;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/basicdetails/")
public class PostBankBasicDetailsController {
    @Autowired
    private PostBankBasicDetailsRepository repository;

    //Add Basic Details Details
    @PostMapping("/add")
    public ResponseEntity<?> addBasicDetails(@RequestBody PostBankBasicDetails sd) {
        repository.save(sd);
        return new ResponseEntity<>("Basic Details Saved Successfully!", HttpStatus.CREATED);
    }

    //Update Basic Details
    @PutMapping("/update")
    public ResponseEntity<?> updateBasicDetails(@RequestBody PostBankBasicDetails sd) {
        repository.save(sd);
        return new ResponseEntity<>("Basic Details Updated Successfully!", HttpStatus.OK);
    }
//    @PutMapping("/update")
//    public ResponseEntity<?> updateBasicDetails(@RequestBody PostBankBasicDetails sd) {
//        repository.save(sd);
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "Basic Details Updated Successfully!");
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    //Fetch by ID
    @GetMapping("/fetchbyid/")
    public ResponseEntity<?> fetchBasicDetailsByID(Long id)
    {
        return new ResponseEntity<>(repository.findById(id),HttpStatus.OK);
    }

    //Fetch All Basic Details
    @GetMapping("/all")
    public ResponseEntity<?> fetchBasicDetails()
    {
        return new ResponseEntity<>(repository.findAll(),HttpStatus.OK);
    }

    //Delete Basic Details
    @DeleteMapping
    public ResponseEntity<?> deleteBasicDetails(Long id)
    {
        if(repository.existsById(id))
        {
            repository.deleteById(id);
            return new ResponseEntity<>("Basic Details Deleted Successfully! ID => "+id,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("No Basic Details Found for ID => "+id,HttpStatus.OK);
        }
    }
}
