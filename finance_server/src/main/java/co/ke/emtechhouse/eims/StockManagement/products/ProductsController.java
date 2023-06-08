package co.ke.emtechhouse.eims.StockManagement.products;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/products/")
public class ProductsController {
    @Autowired
    private ProductsService service;

    @Autowired
    private ProductsRepository repository;

    @PostMapping("/add")
    public ResponseEntity<Products> addNewProduct(@RequestBody Products product){
        try {
            Products newProduct = service.addProduct(product);
            return  new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Products>> getAllProducts() {
        try {
            List<Products> products = service.findAllProducts();
            return  new ResponseEntity<>(products, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Products> getProductById (@PathVariable("id") Long id){
        try {
            Products product = service.findProductById(id);
            return new ResponseEntity<>(product, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @PutMapping("/update")
    public ResponseEntity<Products> updateProducts(@RequestBody Products product) {
        Optional<Products> _existing = repository.findById(product.getId());
        if (_existing.isPresent()){
            Products newProduct = service.updateProduct(product);
            return new ResponseEntity<>(newProduct, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteService(@PathVariable("id") Long id) {
        service.deleteProductById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/update/status")
    public ResponseEntity<Products> updateProductStatus(@RequestParam Long id, @RequestParam String status, @RequestParam String verifiedBy, @RequestParam String reason, @RequestParam Date verifiedTime ) {
        Optional<Products> _existing = repository.findById(id);
        if (_existing.isPresent()){
            Products product = _existing.get();
            product.setStatus(status);
            product.setVerifiedBy(verifiedBy);
            product.setVerifiedTime(verifiedTime);
            product.setReason(reason);
            repository.save(product);
            return new ResponseEntity<>(product, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
