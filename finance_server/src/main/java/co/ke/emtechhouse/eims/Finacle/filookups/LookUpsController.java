package co.ke.emtechhouse.eims.Finacle.filookups;

import co.ke.emtechhouse.eims.Finacle.filookups.accounts.AccountsByAccountNameLookuUpService;
import co.ke.emtechhouse.eims.Finacle.filookups.accounts.AccountsByAccountNumberLookUpService;
import co.ke.emtechhouse.eims.Finacle.filookups.accounts.AccountsLookUpService;
import co.ke.emtechhouse.eims.Finacle.filookups.banks.BanksListLookUpService;
import co.ke.emtechhouse.eims.Finacle.filookups.branches.BranchListService;
import co.ke.emtechhouse.eims.Finacle.filookups.currencies.CurrenciesLookUPService;
import co.ke.emtechhouse.eims.Finacle.filookups.ratecodes.RateCodesService;
import co.ke.emtechhouse.eims.Finacle.filookups.schemecodes.SchemeCodesLookUpService;
import co.ke.emtechhouse.eims.Finacle.filookups.schemetypes.SchemeTypesLookUPService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/lookup/")
public class LookUpsController {
    @Autowired
    private AccountsByAccountNameLookuUpService accountsByAccountNameLookuUpService;
    @Autowired
    private CurrenciesLookUPService currenciesService;
    @Autowired
    private SchemeTypesLookUPService schemeTypesService;
    @Autowired
    private BranchListService branchListService;

    @Autowired
    private BanksListLookUpService banksListLookUpService;

    @Autowired
    private AccountsLookUpService accountsLookUpService;

    @Autowired
    private SchemeCodesLookUpService schemeCodesLookUpService;

    @Autowired
    private RateCodesService rateCodesService;

    @Autowired
    private AccountsByAccountNumberLookUpService accountsByAccountNumberLookUpService;

    //Fetch Branches
    @GetMapping("/branches")
    public ResponseEntity<?> getBranches()
    {
        return new ResponseEntity<>(branchListService.getBranchList(), HttpStatus.OK);
    }

    //Fetch Scheme Types
    @GetMapping("/schemetypes")
    public ResponseEntity<?> getSchemeTypes()
    {
        return new ResponseEntity<>(schemeTypesService.getSchemeTypesList(), HttpStatus.OK);
    }

    //Fetch Currencies
    @GetMapping("/currencies")
    public ResponseEntity<?> getCurrencies()
    {
        return new ResponseEntity<>(currenciesService.getCurrencyList(), HttpStatus.OK);
    }

    //Fetch Scheme Codes
    @GetMapping("/schemecodes")
    public ResponseEntity<?> getSchemeCodes()
    {
        return new ResponseEntity<>(schemeCodesLookUpService.getSchemeCodesList(), HttpStatus.OK);
    }

    //Fetch Accounts
    @GetMapping("/accounts")
    public ResponseEntity<?> getAccounts(@RequestParam("acctType") String accountType, @RequestParam("branchCode") String branchId,@RequestParam("schmCode") String schemeCode)
    {
        return new ResponseEntity<>(accountsLookUpService.fetchAcounts(accountType,branchId,schemeCode), HttpStatus.OK);
    }

    //Fetch Accounts By Account Name
    @GetMapping("/accounts/search")
    public ResponseEntity<?> getAccountsByAccountName(@RequestParam("acctName") String accountName)
    {
        return new ResponseEntity<>(accountsByAccountNameLookuUpService.fetchAcountsByAccountName(accountName), HttpStatus.OK);
    }

    //Fetch Banks List
    @GetMapping("/banks")
    public ResponseEntity<?> getBanksList()
    {
        return new ResponseEntity<>(banksListLookUpService.getBanksList(), HttpStatus.OK);
    }

    //Rate Codes
    @GetMapping("/rateCodes")
    public ResponseEntity<?> getRateCodes()
    {
        return new ResponseEntity<>(rateCodesService.getRateCodesList(), HttpStatus.OK);
    }

    //Rate Codes
    @GetMapping("/accountNumber/search")
    public ResponseEntity<?> getAccountNumberDetails(@RequestParam("acctNumber") String acctNumber)
    {
        return new ResponseEntity<>(accountsByAccountNumberLookUpService.fetchAcountsByAccountNumber(acctNumber), HttpStatus.OK);
    }
}
