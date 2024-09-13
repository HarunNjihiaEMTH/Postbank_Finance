package co.ke.emtechhouse.eims.InvoiceComponent;


import co.ke.emtechhouse.eims.InvoiceComponent.AgingComponent.Aging;
import co.ke.emtechhouse.eims.InvoiceComponent.AgingComponent.AgingRepo;
import co.ke.emtechhouse.eims.InvoiceComponent.AgingComponent.CONSTANTS;
import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class InvoiceService {
        private final InvoiceRepo invoiceRepo;

        @Autowired
        private AgingRepo agingRepo;

        public InvoiceService(InvoiceRepo invoiceRepo) {
        this.invoiceRepo = invoiceRepo;
    }

    //add
    public Invoice addInvoice(Invoice invoice){
        try {
            return invoiceRepo.save(invoice);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
        }

        public List<Invoice> findAllInvoice(){
        try {

            return invoiceRepo.findAll();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}

    public Invoice findById(Long id){
        try{
            return invoiceRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}

    public Invoice updateInvoice(Invoice invoice){
            try{
                return invoiceRepo.save(invoice);
            }catch (Exception e){
                log.info("Error {}"+e);
                return null;
            }
}
    public void deleteInvoiceById(Long id) {
        try {
            invoiceRepo.deleteById(id);
        } catch (Exception e) {
            log.info("Error {} " + e);
        }
    }

    public List<Aging> getagingreport() throws ParseException {
           List<Invoice> invoices= invoiceRepo.getpendinginvoices();

            System.out.println("Invoices length" + invoices.size());
            agingRepo.deleteAll();




        ArrayList<Invoice> all_invoices1= new ArrayList<>();
        ArrayList<Invoice> all_invoices2= new ArrayList<>();
        ArrayList<Invoice> all_invoices3= new ArrayList<>();
        ArrayList<Invoice> all_invoices4= new ArrayList<>();
        ArrayList<Invoice> all_invoices5= new ArrayList<>();


        Double amount1=0.00;
        Double amount2=0.00;
        Double amount3=0.00;
        Double amount4=0.00;
        Double amount5=0.00;






        for (Invoice invoice: invoices) {

            System.out.println("invoices ::::  "+ invoice);
            Date issued_date= invoice.getIssuedDate();
//               Date invoice_date=new SimpleDateFormat("yyyy-mm-dd HH:mm:ss z").parse(issued_date);
//            LocalDateTime invoice_date2 = LocalDateTime.parse(issued_date);
//            DateTimeFormatter invoice_date = DateTimeFormatter.ofPattern(issued_date);
            System.out.println("Issued Date  :: "+ issued_date);
//               System.out.println("Date  :: "+ invoice_date+ " :: - "+  invoice_date.getTime());

            Date today=new Date();


               long diffInMillies = Math.abs(today.getTime() - issued_date.getTime());
               long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
               System.out.println("Days ago :: "+ diff);


               if (diff>=0 && diff<=15){
                   amount1+=invoice.getTotal_after_tax();
                   all_invoices1.add(invoice);


               }else if (diff>15 && diff<=30){
                   amount2+=invoice.getTotal_after_tax();
                all_invoices2.add(invoice);

               }else if (diff>31 && diff<=60){
                   amount3+=invoice.getTotal_after_tax();
                   all_invoices3.add(invoice);

               }else if (diff>61 && diff<=120){
                   amount4+=invoice.getTotal_after_tax();

                   all_invoices4.add(invoice);

               }else if (diff>121){
                   amount5+=invoice.getTotal_after_tax();
                   all_invoices5.add(invoice);

               }


            System.out.println("-----------------------------");


        }
//        aging.setAmount(null);
//        agingRepo.save(aging);

        System.out.println("-----------------------------"+ all_invoices1.size() +"  ::  "+ amount1);
        System.out.println("-----------------------------" + all_invoices2.size()+"  ::  "+ amount2);
        System.out.println("-----------------------------"+ all_invoices3.size()+"  ::  "+ amount3);
        System.out.println("-----------------------------"+ all_invoices4.size()+"  ::  "+ amount4);
        System.out.println("-----------------------------"+ all_invoices5.size()+"  ::  "+ amount5);
        Aging aging1 =new Aging();
        aging1.setDays_range(CONSTANTS.zero_to_fifteen);
        aging1.setInvoices(all_invoices1.size());
        aging1.setAmount(amount1);
        agingRepo.save(aging1);


        Aging aging2 =new Aging();
        aging2.setDays_range(CONSTANTS.fifteen_to_thirty);
        aging2.setInvoices(all_invoices2.size());
        aging2.setAmount(amount2);
        agingRepo.save(aging2);


        Aging aging3 =new Aging();
        aging3.setDays_range(CONSTANTS.thirty_to_sixty);
        aging3.setInvoices(all_invoices3.size());
        aging3.setAmount(amount3);
        agingRepo.save(aging3);

        Aging aging4 =new Aging();
        aging4.setDays_range(CONSTANTS.sixty_to_onetwenty);
        aging4.setInvoices(all_invoices4.size());
        aging4.setAmount(amount4);
        agingRepo.save(aging4);

        Aging aging5 =new Aging();
        aging5.setDays_range(CONSTANTS.beyond_oneTwenty);
        aging5.setInvoices(all_invoices5.size());
        aging5.setAmount(amount5);
        agingRepo.save(aging5);



        return  agingRepo.findAll();
    }


}
