package co.ke.emtechhouse.eims.TaxesComponent;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TaxesRepo extends JpaRepository<Taxes, Long> {
    @Query(value = "SELECT * FROM `taxes` WHERE taxes.tax_name =:tax_name LIMIT 1", nativeQuery = true)
    Optional<Taxes> checkByTaxName(String tax_name);
}

