package co.ke.emtechhouse.eims.ExpenseComponent;



import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ExpenseService {
    private final ExpenseRepo expenseRepo;

    public ExpenseService(ExpenseRepo expenseRepo) {
        this.expenseRepo = expenseRepo;
    }
    //create
    public Expense addExpense(Expense expense){
        try {
            return expenseRepo.save(expense);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }}
//
    public List<Expense> findAllExpense(){
        try {
            return expenseRepo.findAll();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}
    //
    public Expense findById(long id){
        try{
            return expenseRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}
  //
  public Expense updateExpense(Expense expense){
      try {
          return expenseRepo.save(expense);
      }catch (Exception e) {
          log.info("Error {} "+e);
          return null;
      }
  }

    public void deleteExpenseById(Long id) {
    }
}

