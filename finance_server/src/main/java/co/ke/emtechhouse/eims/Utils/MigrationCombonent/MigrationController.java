package co.ke.emtechhouse.eims.Utils.MigrationCombonent;

import co.ke.emtechhouse.eims.CostCentersComponent.Costcenters;
import co.ke.emtechhouse.eims.CostCentersComponent.CostcentersRepo;
import co.ke.emtechhouse.eims.CostCentersComponent.CostcentersService;
import co.ke.emtechhouse.eims.CostCentersComponent.ExpensesComponent.Expenses;
import co.ke.emtechhouse.eims.CostCentersComponent.ExpensesComponent.ExpensesRepo;
import co.ke.emtechhouse.eims.ExpenseComponent.Expense;
import co.ke.emtechhouse.eims.ExpenseComponent.ExpenseRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import co.ke.emtechhouse.eims.SupplierComponent.Supplier;
import co.ke.emtechhouse.eims.SupplierComponent.SupplierRepo;
import co.ke.emtechhouse.eims.SupplierComponent.SupplierService;
import co.ke.emtechhouse.eims.TransactionComponent.AcrualSupplierMaintenance.Supplierdetails;
import co.ke.emtechhouse.eims.TransactionComponent.AcrualSupplierMaintenance.SupplierdetailsRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

////@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/migration/")
public class MigrationController {
    private final SupplierService supplierService;
    private final SupplierRepo supplierRepo;
    private final CostcentersRepo costcentersRepo;
    private final ExpensesRepo expensesRepo;
    private final CostcentersService costcentersService;
    private final ExpenseRepo expenseRepo;
    private final SupplierdetailsRepo supplierdetailsRepo;

    public MigrationController(SupplierService supplierService, SupplierRepo supplierRepo, CostcentersRepo costcentersRepo, ExpensesRepo expensesRepo, CostcentersService costcentersService, ExpenseRepo expenseRepo, SupplierdetailsRepo supplierdetailsRepo) {
        this.supplierService = supplierService;
        this.supplierRepo = supplierRepo;
        this.costcentersRepo = costcentersRepo;
        this.expensesRepo = expensesRepo;
        this.costcentersService = costcentersService;
        this.expenseRepo = expenseRepo;
        this.supplierdetailsRepo = supplierdetailsRepo;
    }

    @PostMapping("/add/suppliers")
    public ResponseEntity<?> addSupplierAray(@RequestBody List<Supplier> supplier){
        try {
            List<Supplier> succeed = new ArrayList<>();
            List<Supplier> exist = new ArrayList<>();
            List<Supplier> failed = new ArrayList<>();
            for (int i =0; i<supplier.size(); i++){
                System.out.println("************************************************************");
                System.out.println(supplier.get(i).getSupplierName());
                if ( supplier.get(i).getSupplierAccount() == null){
                    failed.add(supplier.get(i));
                }else {
//                Check if exist
                    Supplier newSupplier = supplierService.addSupplier(supplier.get(i));
                    succeed.add(supplier.get(i));
                }
            }
            MigrationResponse migrationResponse = new MigrationResponse();
            migrationResponse.setSucceed(succeed);
            migrationResponse.setExist(exist);

            EntityResponse response = new EntityResponse();
            response.setMessage("Process Completed");
            response.setEntity(migrationResponse);
            return  new ResponseEntity<>(response, HttpStatus.OK);

        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @PostMapping("/add/accrual/suppliers")
    public ResponseEntity<?> addAcrualSupplierAray(@RequestBody List<SupplierRequest> supplier){
        try {
            List<SupplierRequest> succeed = new ArrayList<>();
            List<SupplierRequest> exist = new ArrayList<>();
            List<SupplierRequest> failed = new ArrayList<>();
            for (int i =0; i<supplier.size(); i++){
                if (supplier.get(i).getSupplierName() == null){
                    supplier.get(i).setSupplierName("-");
                }
                if (supplier.get(i).getSupplierTin() == null){
                    supplier.get(i).setSupplierTin("-");
                }
                if ( supplier.get(i).getSupplierAccount() == null){
                    supplier.get(i).setSupplierAccount("-");
                }
                if ( supplier.get(i).getAcrualAccountName() == null){
                    supplier.get(i).setAcrualAccountName("-");
                }
                if (supplier.get(i).getSupplierCountry() == null){
                    supplier.get(i).setSupplierCountry("-");
                }
                if (supplier.get(i).getSupplierCurrency() == null){
                    supplier.get(i).setSupplierCurrency("UGX");
                }
                if (supplier.get(i).getSupplierAddress() == null){
                    supplier.get(i).setSupplierAddress("-");
                }
                if (supplier.get(i).getAcrualDescription() == null){
                    supplier.get(i).setAcrualDescription(supplier.get(i).getSupplierServices());
                }
                System.out.println("---------------------------------------- ");
                System.out.println(supplier.get(i).getAcrualAccount());
                System.out.println(supplier.get(i).getAcrualDescription());

//                Check if exist
                    Optional<Supplier> check = supplierRepo.findBySupplierTin(supplier.get(i).getSupplierTin());
                    if (check.isPresent()) {
                        exist.add(supplier.get(i));
                        Supplier supplier1 = check.get();
//                        TODO ADD TO ACRUAL TABLE
                        Supplierdetails supplierdetails = new Supplierdetails();
                        supplierdetails.setReferenceID(supplier1.getId().toString());
                        supplierdetails.setSupplierName(supplier1.getSupplierName());
                        supplierdetails.setSupplierAc(supplier1.getSupplierAccount());
                        supplierdetails.setAcrualDescription(supplier.get(i).getAcrualDescription());
                        supplierdetails.setAcrualAmount("0.00");
                        supplierdetails.setAcrualPeriod(supplier.get(i).getAcrualPeriod());
                        supplierdetails.setAccrualAccountName(supplier.get(i).getAcrualAccountName());
                        supplierdetails.setAccrualAccount(supplier.get(i).getAcrualAccount());
                        supplierdetailsRepo.save(supplierdetails);
                        succeed.add(supplier.get(i));
                    } else {
                        if (supplier.get(i).getSupplierEmail() == null){
                            supplier.get(i).setSupplierEmail("N/A");
                        }
                        if (supplier.get(i).getSupplierContact() == null){
                            supplier.get(i).setSupplierContact("N/A");
                        }
                        Supplier supplierMain = new Supplier();
                        supplierMain.setSupplierAccount(supplier.get(i).getSupplierAccount());
                        supplierMain.setSupplierAddress(supplier.get(i).getSupplierAddress());
                        supplierMain.setSupplierTin(supplier.get(i).getSupplierTin());
                        supplierMain.setSupplierBank(supplier.get(i).getSupplierBank());
                        supplierMain.setSupplierCurrency(supplier.get(i).getSupplierCurrency());
                        supplierMain.setSupplierCountry(supplier.get(i).getSupplierCountry());
                        supplierMain.setSupplierContact(supplier.get(i).getSupplierContact());
                        supplierMain.setSupplierEmail(supplier.get(i).getSupplierEmail());
                        supplierMain.setSupplierName(supplier.get(i).getSupplierName());
                        supplierMain.setSupplierNumber(supplier.get(i).getSupplierNumber());
                        supplierMain.setSupplierServices(supplier.get(i).getSupplierServices());
                        supplierMain.setSupplierServiceDescription(supplier.get(i).getSupplierServiceDescription());
                        supplierMain.setStatus("pending");
                        supplierMain.setReason("-");
                        supplierMain.setPostedBy(supplier.get(i).getPostedBy());
                        supplierMain.setPostedFlag(supplier.get(i).getPostedFlag());
                        supplierMain.setPostedTime(supplier.get(i).getPostedTime());
                        supplierService.addSupplier(supplierMain);
                        Optional<Supplier> getSupplier = supplierRepo.findBySupplierTin(supplier.get(i).getSupplierTin());
//                        TODO ADD TO ACRUAL TABLE

                        System.out.println("----------------------");
                        System.out.println(supplier.get(i).getAcrualAccount());

                        Supplierdetails supplierdetails = new Supplierdetails();
                        supplierdetails.setReferenceID(getSupplier.get().getId().toString());
                        supplierdetails.setSupplierName(getSupplier.get().getSupplierName());
                        supplierdetails.setSupplierAc(getSupplier.get().getSupplierAccount());
                        supplierdetails.setAcrualDescription(supplier.get(i).getAcrualDescription());
                        supplierdetails.setAcrualAmount("0.00");
                        supplierdetails.setAcrualPeriod(supplier.get(i).getAcrualPeriod());
                        supplierdetails.setAccrualAccountName(supplier.get(i).getAcrualAccountName());
                        supplierdetails.setAccrualAccount(supplier.get(i).getAcrualAccount());

                        supplierdetailsRepo.save(supplierdetails);
                        succeed.add(supplier.get(i));
                    }

            }
            MigrationResponse migrationResponse = new MigrationResponse();
            migrationResponse.setSucceed(succeed);
            migrationResponse.setExist(exist);

            EntityResponse response = new EntityResponse();
            response.setMessage("Process Completed");
            response.setEntity(migrationResponse);
            return  new ResponseEntity<>(response, HttpStatus.OK);

        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    @PostMapping("/costcenters/array/add")
    public void addArrayCostcenters(@RequestBody List<Costcenters> costcenters){
        try {
            for (int i=0; i<costcenters.size(); i++){
                Costcenters costcenters1 = costcenters.get(i);
                Costcenters newcostcenters = costcentersService.addCostcenters(costcenters1);
            }
        }catch (Exception e) {
            log.info("Error {} "+e);
        }
    }


    @PostMapping("/expensecostcenter/expense/mapping/array/add")
    public ResponseEntity addExpenseArrayCostcenters(@RequestBody List<Expensecostcenter> expensecostcenter){
        try {//
//            GL_SUB_HEAD_CODE_DESC = expenseName
//            BRANCH_NAME = costcenterName
            List<Expensecostcenter> succeed = new ArrayList<>();
            List<Expensecostcenter> failedcostcenter = new ArrayList<>();
            List<Expensecostcenter> failedexpense = new ArrayList<>();
            System.out.println(expensecostcenter);
            System.out.println("//////////BRANCH_NAME");
            System.out.println(expensecostcenter.size());

            for (int i=0; i<expensecostcenter.size(); i++){
                Expensecostcenter expensecostcenter1 = expensecostcenter.get(i);
                System.out.println("**********************************************************");
                System.out.println(expensecostcenter1.getBranchname());
                System.out.println(expensecostcenter1.getGlsubheadcodedesc());
                System.out.println("**********************************************************");
//                Save Expense to expense Table

                Optional<Expense> expenseExist = expenseRepo.findByExpenseDescription(expensecostcenter1.getGlsubheadcodedesc());
                if (expenseExist.isPresent()){

                }else{
                    Expense expense = new Expense();
                    expense.setExpenseCode(String.valueOf((int) ((Math.random() * (99999 - 1)) + 1)));
                    expense.setExpenseDescription(expensecostcenter1.getGlsubheadcodedesc());
                    expense.setExpenseMajorCategory("1");
                    expense.setExpenseSubCategory("1");
                    expense.setGlCode(expensecostcenter1.getGlsubheadcode());
                    expense.setPostedBy("soaadmin");
                    expense.setPostedFlag('Y');
                    expense.setPostedTime(new Date());
                    expenseRepo.save(expense);
                }

//                check if exist
                Optional<Costcenters> costcenters = costcentersRepo.findByCostCenterName(expensecostcenter1.getBranchname());
                if (costcenters.isPresent()){
                    Optional<Expense> expense1 = expenseRepo.findByExpenseDescription(expensecostcenter1.getGlsubheadcodedesc());
                    if (expense1.isPresent()){
                        Optional<Expenses> expensesCheck = expensesRepo.findByExpenseIdAndCostcenterId(expense1.get().getId(), costcenters.get().getId());
                        if (expensesCheck.isPresent()){

                        }else {
                            Expenses expenses = new Expenses();
                            expenses.setExpense(expense1.get().getExpenseDescription());
                            expenses.setExpenseId(expense1.get().getId());
                            expenses.setExpenseAccount(expensecostcenter1.getAccount());
                            expenses.setExpenseAccountName(expensecostcenter1.getAccname());
                            expenses.setIsPointing(false);
                            expenses.setCostcenterId(costcenters.get().getId());
                            expensesRepo.save(expenses);
                            succeed.add(expensecostcenter1);
                        }
                    }else {
//                        add to fail array
                        failedexpense.add(expensecostcenter1);

                    }
                }else{
//                    add into failed array
                    failedcostcenter.add(expensecostcenter1);
                }
            }
            MigrationResponse migrationResponse = new MigrationResponse();
            migrationResponse.setSucceed(succeed);
            migrationResponse.setFailedcostcenter(failedcostcenter);
            migrationResponse.setFailedexpense(failedexpense);

            EntityResponse response = new EntityResponse();
            response.setMessage("Process Completed");
            response.setEntity(migrationResponse);
            return  new ResponseEntity<>(response, HttpStatus.OK);


        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
}
