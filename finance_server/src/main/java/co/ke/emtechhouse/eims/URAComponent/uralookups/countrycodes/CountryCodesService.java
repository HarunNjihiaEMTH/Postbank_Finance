package co.ke.emtechhouse.eims.URAComponent.uralookups.countrycodes;

import com.google.gson.Gson;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CountryCodesService {
    @Autowired
    private CountryCodesRepository repository;

    //Save CountryCodes
    public ResponseEntity<?> addCountryCodes(CountryCodes crncy)
    {
        repository.save(crncy);
        return new ResponseEntity<>("Added Successfully - "+crncy.getName() , HttpStatus.OK);
    }

    //Update CountryCodes
    public ResponseEntity<?> updateCountryCodes(CountryCodes crncy)
    {
        repository.save(crncy);
        return new ResponseEntity<>("Updated Successfully - "+crncy.getName() , HttpStatus.OK);
    }

    //Delete CountryCodes
    public ResponseEntity<?> deleteCountryCodes(Long id)
    {
        repository.deleteById(id);
        return new ResponseEntity<>("Deleted Successfully - ID : "+id , HttpStatus.OK);
    }

    //List all CountryCodes
    public ResponseEntity<?> listCountryCodes()
    {
        return new ResponseEntity<>(repository.findAll() , HttpStatus.OK);
    }

    //Find By ID
    public ResponseEntity<?> listCountryCodesByID(Long id)
    {
        return new ResponseEntity<>(repository.findById(id) , HttpStatus.OK);
    }

    //JSON OBJECT PROCESSING (Import CountryCodes in Bulk)
    public ResponseEntity<?> parseJSON(String json)
    {
        JSONObject ob = new JSONObject(json);
        CountryCodes um = null;
        for (Object jo: ob.getJSONArray("countryCode")) {
            Gson gs = new Gson();
            um = gs.fromJson(jo.toString(),CountryCodes.class);
            repository.save(um);
        }
        return new ResponseEntity<>(um.getName()+" - "+um.getValue()+" - "+um.getDescription(),HttpStatus.OK);
    }
}
