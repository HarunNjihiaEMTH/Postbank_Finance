package co.ke.emtechhouse.eims.SubCategoryComponent;

import co.ke.emtechhouse.eims.CategoryComponent.Category;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/subcategory/")
public class SubCategoryController {
    final private SubCategoryRepo subCategoryRepo;
    final private SubCategoryService subCategoryService;

    public SubCategoryController(SubCategoryRepo subCategoryRepo, SubCategoryService subCategoryService) {
        this.subCategoryRepo = subCategoryRepo;
        this.subCategoryService = subCategoryService;
    }
    @PostMapping("/add")
    public ResponseEntity<SubCategory> addSubCategory(@RequestBody SubCategory subCategory){
        try {
            SubCategory newSubCategory = subCategoryService.addSubCategory(subCategory);
            return  new ResponseEntity<>(newSubCategory, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<SubCategory>> getAllSubCategory () {
        try {
            List<SubCategory> subcategory = subCategoryService.findAllSubCategory();
            return  new ResponseEntity<>(subcategory, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<SubCategory> getSubCategoryById (@PathVariable("id") Long id){
        try {
            SubCategory subCategory = subCategoryService.findSubCategoryById(id);
            return new ResponseEntity<>(subCategory, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @PutMapping("/update")
    public ResponseEntity<SubCategory> updateSubCategory(@RequestBody SubCategory subCategory) {
        Optional<SubCategory> _existing = subCategoryRepo.findById(subCategory.getId());
        if (_existing.isPresent()){
            SubCategory newSubCategory = subCategoryService.updateSubCategory(subCategory);
            return new ResponseEntity<>(newSubCategory, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubCategory(@PathVariable("id") Long id) {
       subCategoryService.deleteSubCategoryById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/status")
    public ResponseEntity<SubCategory> updateSubCategory(@RequestParam Long id, @RequestParam String status, @RequestParam String verifiedBy, @RequestParam String reason, @RequestParam Date verifiedTime ) {
        Optional<SubCategory> _existing = subCategoryRepo.findById(id);
        if (_existing.isPresent()){
            SubCategory subcategory = _existing.get();
            subcategory.setStatus(status);
            subcategory.setVerifiedBy(verifiedBy);
            subcategory.setVerifiedTime(verifiedTime);
            subcategory.setReason(reason);
            subCategoryRepo.save(subcategory);
            return new ResponseEntity<>(subcategory, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
