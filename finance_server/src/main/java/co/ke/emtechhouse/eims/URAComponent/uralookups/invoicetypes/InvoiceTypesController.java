package co.ke.emtechhouse.eims.URAComponent.uralookups.invoicetypes;


import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/urainvoicetypes/")
public class InvoiceTypesController {

    Configurations cn = new Configurations();
    String json = cn.getProperties().getProperty("json.invoicetypes");
    @GetMapping("/all")
    public ResponseEntity<?> listAllInvoiceTypes()
    {
        List<InvoiceTypes> it = new ArrayList<>();
        JSONObject ob = new JSONObject(json);
        for (Object jo: ob.getJSONArray("invoiceTypes")) {
            Gson gs = new Gson();
            InvoiceTypes um = gs.fromJson(jo.toString(),InvoiceTypes.class);
            it.add(um);
        }
        return new ResponseEntity<>(it, HttpStatus.OK);
    }
}
