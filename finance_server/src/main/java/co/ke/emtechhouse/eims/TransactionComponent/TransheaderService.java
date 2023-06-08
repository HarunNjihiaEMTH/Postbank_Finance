package co.ke.emtechhouse.eims.TransactionComponent;

import co.ke.emtechhouse.eims.TransactionComponent.AcrualBalResp.AcrualBalResp;
import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class TransheaderService {
    private final TransheaderRepo transheaderRepo;

    public TransheaderService(TransheaderRepo transheaderRepo) {
        this.transheaderRepo = transheaderRepo;
    }

    public Transheader addTransheader(Transheader transheader){
        try {
            return transheaderRepo.save(transheader);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public List<Transheader> findAllTransheader(){
        try {
            return transheaderRepo.findAll();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}

    public Transheader findById(Long id){
        try{
            return transheaderRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}

    public Transheader updateTransheader(Transheader transheader){
        try{
            return transheaderRepo.save(transheader);
        }catch (Exception e){
            log.info("Error {}"+e);
            return null;
        }
    }
    public void deleteTransheaderById(Long id) {
        try {
            transheaderRepo.deleteById(id);
        } catch (Exception e) {
            log.info("Error {} " + e);
        }
    }
    //*****************************************New Code ***************************************

    public List<AcrualBalResp> getAcualBalance(Long supplier_id){
        try {
            ArrayList<AcrualBalResp> finalresp = new ArrayList<AcrualBalResp>();
            Double totalAcrualBalance = 0.00;
            List<TransheaderRepo.CollectAcrualBalInterface> dataresp = transheaderRepo.getAccrualAdvance(supplier_id);
            if (dataresp.size()<1){
                totalAcrualBalance = 0.00;
                return finalresp;
            }else {
                for (int i = 0; i<dataresp.size(); i++){
                    System.out.println(supplier_id);
                    System.out.println(dataresp.get(i).getTransid());
                    Double reversalamount = transheaderRepo.getAccrualReverse(supplier_id, dataresp.get(i).getTransid());
                    Double supplierCredit =  transheaderRepo.getSupplierCredits(supplier_id, dataresp.get(i).getTransid());
                    Double acrualbal = dataresp.get(i).getAccrualbal();
                    Double newAcrualBal = acrualbal - reversalamount - supplierCredit;
//                    Push to an new arraylist
                    AcrualBalResp acrualBalResp = new  AcrualBalResp();
                    acrualBalResp.setDescription(dataresp.get(i).getDescription());
                    acrualBalResp.setMonth(dataresp.get(i).getMonth());
                    acrualBalResp.setTransid(dataresp.get(i).getTransid());
                    acrualBalResp.setCollectionDate(dataresp.get(i).getCollectionDate());
                    acrualBalResp.setAccrualbal(newAcrualBal);
                    finalresp.add(acrualBalResp);
                }
            }
            return finalresp;
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }
    }
}

