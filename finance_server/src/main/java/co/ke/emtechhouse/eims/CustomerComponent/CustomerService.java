package co.ke.emtechhouse.eims.CustomerComponent;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CustomerService {
    private final CustomerRepo customerRepo;


    public CustomerService(CustomerRepo customerRepo) {

        this.customerRepo = customerRepo;
    }
    public Customer addCustomer(Customer customer){
        try {
            return customerRepo.save(customer);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public List<Customer> findAllCustomers(){
        try {
            return customerRepo.findAll();
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public Customer findCustomerById(Long id){
        try {
            return (Customer) customerRepo.getCustomerById(id).orElse(null);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public Customer updateCustomer(Customer customer){
        try {
            return customerRepo.save(customer);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public void deleteCustomerById(Long id){
        try {
            customerRepo.deleteById(id);
        }catch (Exception e) {
            log.info("Error {} "+e);
        }

    }

}
