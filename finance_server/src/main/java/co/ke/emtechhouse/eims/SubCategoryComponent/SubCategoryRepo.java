package co.ke.emtechhouse.eims.SubCategoryComponent;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubCategoryRepo extends JpaRepository<SubCategory, Long> {
    Optional<Object> getSubCategoryById(Long id);
}
