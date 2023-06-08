package co.ke.emtechhouse.eims.StockManagement.products;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductsRepository extends JpaRepository<Products,Long>{
    Optional<Object> getProductById(Long id);
}
