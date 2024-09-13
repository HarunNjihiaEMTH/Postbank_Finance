package co.ke.emtechhouse.eims.CategoryComponent;


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
@RequestMapping("/api/v1/category/")
public class CategoryController {
            public final CategoryRepo categoryRepo;
            public final CategoryService categoryService;

    public CategoryController(CategoryRepo categoryRepo, CategoryService categoryService) {
        this.categoryRepo = categoryRepo;
        this.categoryService = categoryService;
    }


    @PostMapping("/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        try {
            Category newCategory = categoryService.addCategory(category);
            return  new ResponseEntity<>(newCategory, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategory () {
        try {
            List<Category> category = categoryService.findAllCategory();
            return  new ResponseEntity<>(category, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Category> getCategoryById (@PathVariable("id") Long id){
        try {
            Category category = categoryService.findCategoryById(id);
            return new ResponseEntity<>(category, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @PutMapping("/update")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        Optional<Category> _existing = categoryRepo.findById(category.getId());
        if (_existing.isPresent()){
            Category newCategory = categoryService.updateCategory(category);
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
    public ResponseEntity<Category> updateCategory(@RequestParam Long id, @RequestParam String status, @RequestParam String verifiedBy, @RequestParam String reason, @RequestParam Date verifiedTime ) {
        Optional<Category> _existing = categoryRepo.findById(id);
        if (_existing.isPresent()){
            Category category = _existing.get();
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
