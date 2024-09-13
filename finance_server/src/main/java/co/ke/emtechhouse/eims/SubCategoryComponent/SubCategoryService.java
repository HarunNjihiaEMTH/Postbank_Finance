package co.ke.emtechhouse.eims.SubCategoryComponent;

import co.ke.emtechhouse.eims.CategoryComponent.Category;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SubCategoryService {
    private final SubCategoryRepo subCategoryRepo;

    public SubCategoryService(SubCategoryRepo subCategoryRepo) {
        this.subCategoryRepo = subCategoryRepo;
    }


    public SubCategory addSubCategory(SubCategory subCategory){
        try {
            return subCategoryRepo.save(subCategory);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public List<SubCategory> findAllSubCategory(){
        try {
            return subCategoryRepo.findAll();
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public SubCategory findSubCategoryById(Long id){
        try {
            return (SubCategory) subCategoryRepo.getSubCategoryById(id).orElse(null);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public SubCategory updateSubCategory(SubCategory subCategory){
        try {
            return subCategoryRepo.save(subCategory);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public void deleteSubCategoryById(Long id){
        try {
            subCategoryRepo.deleteById(id);
        }catch (Exception e) {
            log.info("Error {} "+e);
        }

    }
}
