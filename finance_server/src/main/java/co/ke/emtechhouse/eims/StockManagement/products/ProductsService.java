package co.ke.emtechhouse.eims.StockManagement.products;

import co.ke.emtechhouse.eims.StockManagement.categories.StockCategory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ProductsService {
    @Autowired
    private ProductsRepository repository;

    public Products addProduct(Products product){
        try {
            return repository.save(product);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public List<Products> findAllProducts(){
        try {
            return repository.findAll();
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    public Products findProductById(Long id){
        try {
            return (Products) repository.getProductById(id).orElse(null);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public Products updateProduct(Products product){
        try {
            return repository.save(product);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public void deleteProductById(Long id){
        try {
            repository.deleteById(id);
        }catch (Exception e) {
            log.info("Error {} "+e);
        }

    }
}
