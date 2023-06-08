package co.ke.emtechhouse.eims.URAComponent.uralookups.taxcodes;


import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/taxcategories/")
public class TaxCategoriesController {

    @Autowired
    private TaxesRepository taxesRepository;

    Configurations cn = new Configurations();
    String json = cn.getProperties().getProperty("json.taxcodes");

    @GetMapping("/all")
    public ResponseEntity<?> listAllTaxCategories()
    {
        List<TaxCodes> it = new ArrayList<>();
        JSONObject ob = new JSONObject(json);
        for (Object jo: ob.getJSONArray("taxCategoryCode")) {
            Gson gs = new Gson();
            TaxCodes um = gs.fromJson(jo.toString(),TaxCodes.class);
            it.add(um);
        }
        return new ResponseEntity<>(it, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<?> addtaxes(@RequestBody Tax taxes){
           try {
               taxesRepository.save(taxes);
               return new ResponseEntity<>(new TaxResponse("Tax added successfully"), HttpStatus.OK);
           }catch (Exception exception){
               return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
           }
    }

    @GetMapping("/fetchalltaxes")
    public ResponseEntity<?> fetchalltaxes(){
        try {
            return new ResponseEntity<>(taxesRepository.findAll(), HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/fetchbyid/{id}")
    public ResponseEntity<?> fetchtaxbyid(@PathVariable("id") Long id){
        try {
            return new ResponseEntity<>(taxesRepository.findById(id), HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updatetaxes")
    public ResponseEntity<?> updatetaxesinfo(@RequestBody Tax taxes){
           try {
               taxesRepository.save(taxes);
               return new ResponseEntity<>(new TaxResponse("Tax information updated successfully"), HttpStatus.OK);
           }catch (Exception exception){
               return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
           }
    }

    @DeleteMapping("/deletetax/{id}")
    public ResponseEntity<?> deletetaxinfo(@PathVariable("id") Long id){
        try {
            taxesRepository.deleteById(id);
            return new ResponseEntity<>(new TaxResponse("Tax information deleted successfully"), HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
