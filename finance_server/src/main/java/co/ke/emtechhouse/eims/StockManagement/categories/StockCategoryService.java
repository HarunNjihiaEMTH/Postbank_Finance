package co.ke.emtechhouse.eims.StockManagement.categories;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class StockCategoryService {
    private final StockCategoryRepository categoryRepo;

    public StockCategoryService(StockCategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    public StockCategory addCategory(StockCategory category){
        try {
            return categoryRepo.save(category);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public List<StockCategory> findAllCategory(){
        try {
            return categoryRepo.findAll();
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public StockCategory findCategoryById(Long id){
        try {
            return (StockCategory) categoryRepo.getCategoryById(id).orElse(null);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public StockCategory updateCategory(StockCategory category){
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
