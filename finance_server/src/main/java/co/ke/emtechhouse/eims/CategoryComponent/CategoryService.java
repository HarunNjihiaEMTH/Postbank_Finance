package co.ke.emtechhouse.eims.CategoryComponent;

import co.ke.emtechhouse.eims.CustomerComponent.Customer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CategoryService {
    private final CategoryRepo categoryRepo;

    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    public Category addCategory(Category category){
        try {
            return categoryRepo.save(category);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public List<Category> findAllCategory(){
        try {
            return categoryRepo.findAll();
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public Category findCategoryById(Long id){
        try {
            return (Category) categoryRepo.getCategoryById(id).orElse(null);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public Category updateCategory(Category category){
        try {
            return categoryRepo.save(category);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public void deleteCategoryById(Long id){
        try {
            categoryRepo.deleteById(id);
        }catch (Exception e) {
            log.info("Error {} "+e);
        }

    }
}
