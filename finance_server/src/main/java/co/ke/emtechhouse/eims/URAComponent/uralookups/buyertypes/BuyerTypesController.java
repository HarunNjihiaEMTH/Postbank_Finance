package co.ke.emtechhouse.eims.URAComponent.uralookups.buyertypes;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.URAComponent.uralookups.invoicekinds.InvoiceKinds;
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
@RequestMapping("/api/v1/buyertypes/")
public class BuyerTypesController {
    Configurations cn = new Configurations();
    String json = cn.getProperties().getProperty("json.buyertype");

    @GetMapping("/all")
    public ResponseEntity<?> listAllBuyerTypes()
    {
        List<BuyerTypes> it = new ArrayList<>();
        JSONObject ob = new JSONObject(json);
        for (Object jo: ob.getJSONArray("buyerType")) {
            Gson gs = new Gson();
            BuyerTypes um = gs.fromJson(jo.toString(),BuyerTypes.class);
            it.add(um);
        }
        return new ResponseEntity<>(it, HttpStatus.OK);
    }
}
