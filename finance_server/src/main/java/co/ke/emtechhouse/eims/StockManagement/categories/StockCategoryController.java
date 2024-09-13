package co.ke.emtechhouse.eims.StockManagement.categories;


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
@RequestMapping("/api/v1/stockcategory/")
public class StockCategoryController {
    public final StockCategoryRepository categoryRepo;
            public final StockCategoryService categoryService;

    public StockCategoryController(StockCategoryRepository categoryRepo, StockCategoryService categoryService) {
        this.categoryRepo = categoryRepo;
        this.categoryService = categoryService;
    }

    @PostMapping("/add")
    public ResponseEntity<StockCategory> addCategory(@RequestBody StockCategory category){
        try {
            StockCategory newCategory = categoryService.addCategory(category);
            return  new ResponseEntity<>(newCategory, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<StockCategory>> getAllCategory () {
        try {
            List<StockCategory> category = categoryService.findAllCategory();
            return  new ResponseEntity<>(category, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<StockCategory> getCategoryById (@PathVariable("id") Long id){
        try {
            StockCategory category = categoryService.findCategoryById(id);
            return new ResponseEntity<>(category, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @PutMapping("/update")
    public ResponseEntity<StockCategory> updateCategory(@RequestBody StockCategory category) {
        Optional<StockCategory> _existing = categoryRepo.findById(category.getId());
        if (_existing.isPresent()){
            StockCategory newCategory = categoryService.updateCategory(category);
            return new ResponseEntity<>(newCategory, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id) {
        categoryService.deleteCategoryById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/update/status")
    public ResponseEntity<StockCategory> updateCategory(@RequestParam Long id, @RequestParam String status, @RequestParam String verifiedBy, @RequestParam String reason, @RequestParam Date verifiedTime ) {
        Optional<StockCategory> _existing = categoryRepo.findById(id);
        if (_existing.isPresent()){
            StockCategory category = _existing.get();
            category.setStatus(status);
            category.setVerifiedBy(verifiedBy);
            category.setVerifiedTime(verifiedTime);
            category.setReason(reason);
            categoryRepo.save(category);
            return new ResponseEntity<>(category, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
