package co.ke.emtechhouse.eims.CustomerComponent;

import co.ke.emtechhouse.eims.InvoiceComponent.Invoice;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/customer/")
public class CustomerController {

        private final CustomerRepo customerRepo;
        private  final  CustomerService customerService;

    public CustomerController(CustomerRepo customerRepo, CustomerService customerService) {
        this.customerRepo = customerRepo;
        this.customerService = customerService;
    }


    @PostMapping("/add")
        public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer){
            try {
                Customer newCustomer = customerService.addCustomer(customer);
                return  new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
            }catch (Exception e) {
                log.info("Error {} "+e);
                return null;
            }
        }
        @GetMapping("/all")
        public ResponseEntity<List<Customer>> getAllCustomers () {
            try {
                List<Customer> customers = customerService.findAllCustomers();
                return  new ResponseEntity<>(customers, HttpStatus.OK);
            }catch (Exception e) {
                log.info("Error {} "+e);
                return null;
            }
        }
        @GetMapping("/find/{id}")
        public ResponseEntity<Customer> getCustomerById (@PathVariable("id") Long id){
            try {
                Customer customer = customerService.findCustomerById(id);
                return new ResponseEntity<>(customer, HttpStatus.OK);
            }catch (Exception e) {
                log.info("Error {} "+e);
                return null;
            }
        }
    @PutMapping("/update")
    public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer) {
        Optional<Customer> _existing = customerRepo.findById(customer.getId());
        if (_existing.isPresent()){
            Customer newCustomer = customerService.updateCustomer(customer);
            return new ResponseEntity<>(newCustomer, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable("id") Long id) {
        customerService.deleteCustomerById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/update/status")
    public ResponseEntity<Customer> updateCustomer(@RequestParam Long id, @RequestParam String status, @RequestParam String reason, @RequestParam String verifiedBy, @RequestParam Date verifiedTime ) {

        Optional<Customer> _existing = customerRepo.findById(id);
        if (_existing.isPresent()) {
            Customer customer = _existing.get();
            customer.setStatus(status);
            customer.setVerifiedBy(verifiedBy);
            customer.setReason(reason);
            customer.setVerifiedTime(verifiedTime);

            customerRepo.save(customer);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
//    @PutMapping("/update/status")
//    public ResponseEntity<Customer> updateCustomer(@RequestParam Long id, @RequestParam String status, @RequestParam Double amount, @RequestParam String verifiedBy, @RequestParam Date verifiedTime ) {
//
//        Optional<Customer> _existing = customerRepo.findById(id);
//        if (_existing.isPresent()) {
//            Customer customer = _existing.get();
//            customer.setStatus(status);
//            customer.setVerifiedBy(verifiedBy);
//            customer.setVerifiedTime(verifiedTime);
//
//            customerRepo.save(customer);
//            return new ResponseEntity<>(customer, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
}
