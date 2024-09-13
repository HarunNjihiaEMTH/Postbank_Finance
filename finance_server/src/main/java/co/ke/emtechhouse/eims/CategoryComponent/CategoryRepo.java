package co.ke.emtechhouse.eims.CategoryComponent;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepo extends JpaRepository<Category, Long>{
    Optional<Object> getCategoryById(Long id);
}
