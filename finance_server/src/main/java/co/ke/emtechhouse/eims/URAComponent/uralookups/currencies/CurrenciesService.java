package co.ke.emtechhouse.eims.URAComponent.uralookups.currencies;

import com.google.gson.Gson;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CurrenciesService {
    @Autowired
    private CurrenciesRepository repository;

    //Save Currencies
    public ResponseEntity<?> addCurrencies(Currencies crncy)
    {
        repository.save(crncy);
        return new ResponseEntity<>("Added Successfully - "+crncy.getName() , HttpStatus.OK);
    }

    //Update Currency
    public ResponseEntity<?> updateCurrency(Currencies crncy)
    {
        repository.save(crncy);
        return new ResponseEntity<>("Updated Successfully - "+crncy.getName() , HttpStatus.OK);
    }

    //Delete Currency
    public ResponseEntity<?> deleteCurrencies(Long id)
    {
        repository.deleteById(id);
        return new ResponseEntity<>("Deleted Successfully - ID : "+id , HttpStatus.OK);
    }

    //List all Currencies
    public ResponseEntity<?> listCurrencies()
    {
        return new ResponseEntity<>(repository.findAll() , HttpStatus.OK);
    }

    //Find By ID
    public ResponseEntity<?> listCurrenciesByID(Long id)
    {
        return new ResponseEntity<>(repository.findById(id) , HttpStatus.OK);
    }

    //JSON OBJECT PROCESSING (Import Currencies in Bulk)
    public ResponseEntity<?> parseJSON(String json)
    {
        JSONObject ob = new JSONObject(json);
        Currencies um = null;
        for (Object jo: ob.getJSONArray("currencyType")) {
            Gson gs = new Gson();
            um = gs.fromJson(jo.toString(),Currencies.class);
            repository.save(um);
        }
        return new ResponseEntity<>(um.getName()+" - "+um.getValue()+" - "+um.getDescription(),HttpStatus.OK);
    }
}
