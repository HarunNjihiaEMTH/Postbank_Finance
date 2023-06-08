package co.ke.emtechhouse.eims.CostCentersComponent;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.MessageResponse;
import co.ke.emtechhouse.eims.CostCentersComponent.ExpensesComponent.Expenses;
import co.ke.emtechhouse.eims.CostCentersComponent.ExpensesComponent.ExpensesRepo;
import co.ke.emtechhouse.eims.ExpenseComponent.Expense;
import co.ke.emtechhouse.eims.ExpenseComponent.ExpenseRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import co.ke.emtechhouse.eims.Utils.MigrationCombonent.Expensecostcenter;
import co.ke.emtechhouse.eims.Utils.MigrationCombonent.MigrationResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.Message;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

////@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/costcenters/")
public class CostcentersController {
    private final CostcentersRepo costcentersRepo;
    private final ExpensesRepo expensesRepo;
    private final CostcentersService costcentersService;
    private final ExpenseRepo expenseRepo;

    public CostcentersController(CostcentersRepo costcentersRepo, ExpensesRepo expensesRepo, CostcentersService costcentersService, ExpenseRepo expenseRepo) {
        this.costcentersRepo = costcentersRepo;
        this.expensesRepo = expensesRepo;
        this.costcentersService = costcentersService;
        this.expenseRepo = expenseRepo;
    }

    @PostMapping("/add")
    public ResponseEntity<Costcenters> addCostcenters(@RequestBody Costcenters costcenters){
        try {//
            Costcenters newcostcenters = costcentersService.addCostcenters(costcenters);
            return  new ResponseEntity<>(newcostcenters, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }



    @GetMapping("/all")
    public ResponseEntity<List<Costcenters>> getAllCostcenters () {
        try {
            List<Costcenters> costcenters = costcentersService.findAllCostcenters();
            return  new ResponseEntity<>(costcenters, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Costcenters> getById (@PathVariable("id") Long id) {
        Costcenters costcenters = costcentersService.findById(id);
        return new ResponseEntity<>(costcenters, HttpStatus.OK);
    }

    @GetMapping("/per/expense")
    public ResponseEntity<?> getCostCentersPerExpense(@RequestParam String[] expenses) {
        try {
            List<CostcentersRepo.CostCentersPerExpense> al = new ArrayList<>();
            for (int i = 0; i < expenses.length; i++) {
                List<CostcentersRepo.CostCentersPerExpense> costCenters = costcentersRepo.getCostCentersPerExpense(expenses[i]);
                for(int j=0; j< costCenters.size(); j++){
                    al.add(costCenters.get(j));
                }
            }
            return new ResponseEntity<>(al, HttpStatus.OK);
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }

    @GetMapping("/accounts/per/costcenter/and/expense")
    public ResponseEntity<?> getCostCentersPerExpense(@RequestParam Long costCenterId, @RequestParam Long expenseId) {
        try {
            Optional<CostcentersRepo.ExpenseAccount> account = costcentersRepo.getCostCentersPerExpense(costCenterId,expenseId);
            if (account.isPresent()){
                return new ResponseEntity<>(account.get(), HttpStatus.OK);
            }else{
                return ResponseEntity.badRequest().body(new MessageResponse("No data for this cost center and Expense!"));
            }
        } catch (Exception e) {
            log.info("Error {} " + e);
            return null;
        }
    }



    @PutMapping("/update")
    public ResponseEntity<Costcenters> updatePO(@RequestBody Costcenters costcenters) {
        Optional<Costcenters> _existing = costcentersRepo.findById(costcenters.getId());
        if (_existing.isPresent()){
            Costcenters newcostcenters = costcentersService.updateCostcenters(costcenters);
            return new ResponseEntity<>(newcostcenters, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/status")
    public ResponseEntity<?> updatePO(@RequestParam Long id, @RequestParam String Status, @RequestParam String verifiedBy, @RequestParam String reason, @RequestParam Date verifiedTime ) {
        Optional<Costcenters> _existing = costcentersRepo.findById(id);
        if (_existing.isPresent()) {
            Costcenters costcenters = _existing.get();
            costcenters.setStatus(Status);
            costcenters.setVerifiedBy(verifiedBy);
            costcenters.setVerifiedTime(verifiedTime);
            costcenters.setReason(reason);
            costcentersRepo.save(costcenters);
            return new ResponseEntity<>(costcenters, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCostcenters(@PathVariable("id") Long id) {
        costcentersService.deleteCostcentersById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}