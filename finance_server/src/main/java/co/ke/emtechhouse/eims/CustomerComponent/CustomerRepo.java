package co.ke.emtechhouse.eims.CustomerComponent;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepo  extends JpaRepository<Customer, Long> {

    Optional<Object> getCustomerById(Long id);
}
