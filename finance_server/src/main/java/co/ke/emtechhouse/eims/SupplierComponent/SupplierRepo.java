package co.ke.emtechhouse.eims.SupplierComponent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SupplierRepo extends JpaRepository<Supplier, Long> {
    Optional<Supplier> findById(Long id);
    @Query(value = "select * from supplier s where s.id=:supplier_id",nativeQuery = true)
    Supplier getSupplier(Long supplier_id);
    void deleteSupplierById(Long id);
    Optional<Supplier> findBySupplierTin(String supplierTin);
    List<Supplier> findBySupplierName(String supplierName);

}
