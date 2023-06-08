
package co.ke.emtechhouse.eims.ExpenseComponent;

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
@RequestMapping("/api/v1/expense/")
public class ExpenseController {
    private final ExpenseRepo expenseRepo;
    private  final ExpenseService expenseService;

    public ExpenseController(ExpenseRepo expenseRepo, ExpenseService expenseService) {
        this.expenseRepo = expenseRepo;
        this.expenseService = expenseService;
    }
    @PostMapping("/add")
    public  ResponseEntity<?> addExpense(@RequestBody Expense expense){
        try {
            if (expense.getExpenseCode() == null){
                int randomWithMathRandom = (int) ((Math.random() * (99999 - 1)) + 1);
                expense.setExpenseCode(String.valueOf(randomWithMathRandom));
            }
            if (expense.getExpenseMajorCategory()==null || expense.getExpenseMajorCategory().isEmpty()){
                expense.setExpenseMajorCategory("1");
            }
            if (expense.getExpenseSubCategory() ==null || expense.getExpenseSubCategory().isEmpty()){
                expense.setExpenseSubCategory("1");
            }
            Expense newExpense = expenseService.addExpense(expense);
            return  new ResponseEntity<>(newExpense, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @PostMapping("/array/add")
    public void addExpense(@RequestBody List<Expense> expense){
        try {
            for (int i=0; i<expense.size(); i++) {
                Expense expense1 = expense.get(i);
                if (expense1.getExpenseCode() == null) {
                    int randomWithMathRandom = (int) ((Math.random() * (99999 - 1)) + 1);
                    expense1.setExpenseCode(String.valueOf(randomWithMathRandom));
                }
                if (expense1.getExpenseMajorCategory() == null || expense1.getExpenseMajorCategory().isEmpty()) {
                    expense1.setExpenseMajorCategory("1");
                }
                if (expense1.getExpenseSubCategory() == null || expense1.getExpenseSubCategory().isEmpty()) {
                    expense1.setExpenseSubCategory("1");
                }
                System.out.println("**************************************");
                Expense newExpense = expenseService.addExpense(expense1);
            }
        }catch (Exception e) {
            log.info("Error {} "+e);
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Expense>> getAllExpense () {
        try {
            List<Expense> expense = expenseService.findAllExpense();
            return  new ResponseEntity<>(expense, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Expense> getExpenseById (@PathVariable("id") Long id){
        try {
            Expense expense = expenseService.findById(id);
            return new ResponseEntity<>(expense, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/by/expensetype/")
    public ResponseEntity<?> getExpensesByType (@RequestParam String expense_type){
        try {
            List<Expense> expense = expenseRepo.getExpensesByType(expense_type);
            return new ResponseEntity<>(expense, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateExpense(@RequestBody Expense expense){
        Expense newExpense = expenseService.updateExpense(expense);
        return new ResponseEntity<>(newExpense, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable("id") Long id) {
        expenseService.deleteExpenseById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/update/status")
    public ResponseEntity<Expense> updateExpense(@RequestParam Long id, @RequestParam String status, @RequestParam String verifiedBy, @RequestParam String reason, @RequestParam Date verifiedTime ) {
        Optional<Expense> _existing = expenseRepo.findById(id);
        if (_existing.isPresent()){
            Expense expense = _existing.get();
            expense.setStatus(status);
            expense.setVerifiedBy(verifiedBy);
            expense.setVerifiedTime(verifiedTime);
            expense.setReason(reason);
            expenseRepo.save(expense);
            return new ResponseEntity<>(expense, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
