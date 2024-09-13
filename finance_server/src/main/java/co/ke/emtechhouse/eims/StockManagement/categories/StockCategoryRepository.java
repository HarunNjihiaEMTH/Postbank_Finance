package co.ke.emtechhouse.eims.StockManagement.categories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockCategoryRepository extends JpaRepository<StockCategory, Long>{
    Optional<Object> getCategoryById(Long id);
}
