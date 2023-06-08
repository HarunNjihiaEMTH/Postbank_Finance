package co.ke.emtechhouse.eims.Analysis;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/analysis/")
public class Analysis {
    private final AnalysisRepo analysisRepo;

    public Analysis(AnalysisRepo analysisRepo) {
        this.analysisRepo = analysisRepo;
    }
    @GetMapping("/iwt/yearwise")
    public ResponseEntity<?> getIWTYearwise() {
        List<AnalysisRepo.ChartInterface> resp =  analysisRepo.getIWTYearwise();
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
    @GetMapping("/iwt/monthwise")
    public ResponseEntity<?> getIWTMonthwise(@RequestParam String Year) {
        List<AnalysisRepo.ChartInterface> resp =  analysisRepo.getIWTMonthwise(Year);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
    @GetMapping("/iwt/datewise")
    public ResponseEntity<?> getIWTDatewise(@RequestParam String Month, @RequestParam String Year) {
        List<AnalysisRepo.ChartInterface> resp =  analysisRepo.getIWTDatewise(Month, Year);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @GetMapping("/vat/yearwise")
    public ResponseEntity<?> getVATYearwise() {
        List<AnalysisRepo.ChartInterface> resp =  analysisRepo.getVATYearwise();
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
    @GetMapping("/vat/monthwise")
    public ResponseEntity<?> getVATMonthwise(@RequestParam String Year) {
        List<AnalysisRepo.ChartInterface> resp =  analysisRepo.getVATMonthwise(Year);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
    @GetMapping("/vat/datewise")
    public ResponseEntity<?> getVATDatewise(@RequestParam String Month, @RequestParam String Year) {
        List<AnalysisRepo.ChartInterface> resp =  analysisRepo.getVATDatewise(Month, Year);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

//    PO
    @GetMapping("find/po/monthwise")
    public ResponseEntity<?> poMonthwise(@RequestParam String year){
    List<AnalysisRepo.countPerMonth> countPerMonths = analysisRepo.poMonthwise(year);
    return new ResponseEntity<>(countPerMonths, HttpStatus.OK);
}

    @GetMapping("find/po/dateWise")
    public ResponseEntity<?> poDatewise(@RequestParam String year, @RequestParam String month){
        List<AnalysisRepo.countPerMonth> countPerMonths = analysisRepo.poDateWise(year, month);
        return new ResponseEntity<>(countPerMonths, HttpStatus.OK);
    }

    @GetMapping("/find/per/yearwise")
    public ResponseEntity<?> poSummaryYearwise() {
        List<AnalysisRepo.countPerMonth> countPerYear =  analysisRepo.poYearWise();
        return  new ResponseEntity<>(countPerYear, HttpStatus.OK);
    }

//    Invoices
@GetMapping("/invoices/yearwise")
public ResponseEntity<?> getInvoicesYearwise() {
    List<AnalysisRepo.ChartInvoicesInterface> resp =  analysisRepo.getInvoicesYearwise();
    return new ResponseEntity<>(resp, HttpStatus.OK);
}
    @GetMapping("/invoices/monthwise")
    public ResponseEntity<?> getInvoicesMonthwise(@RequestParam String Year) {
        List<AnalysisRepo.ChartInvoicesInterface> resp =  analysisRepo.getInvoicesMonthwise(Year);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
    @GetMapping("/invoices/datewise")
    public ResponseEntity<?> getInvoicesDatewise(@RequestParam String Month, @RequestParam String Year) {
        List<AnalysisRepo.ChartInvoicesInterface> resp =  analysisRepo.getInvoicesDatewise(Month, Year);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

}
