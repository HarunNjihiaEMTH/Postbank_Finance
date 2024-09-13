package co.ke.emtechhouse.eims.URAComponent.uralookups.unitsofmeasure;

import com.google.gson.Gson;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UnitsOfMeasureService {
    @Autowired
    private UnitsOfMeasureRepository repository;

    //Save Units Of measure
    public ResponseEntity<?> addUnitsOfMeasure(UnitsOfMeasure um)
    {
        repository.save(um);
        return new ResponseEntity<>("Added Successfully - "+um.getName() , HttpStatus.OK);
    }

    //Update Unit of measure
    public ResponseEntity<?> updateUnitOfMeasure(UnitsOfMeasure um)
    {
        repository.save(um);
        return new ResponseEntity<>("Updated Successfully - "+um.getName() , HttpStatus.OK);
    }

    //Delete Unit of measure
    public ResponseEntity<?> deleteUnitOfMeasure(Long id)
    {
        repository.deleteById(id);
        return new ResponseEntity<>("Deleted Successfully - ID : "+id , HttpStatus.OK);
    }

    //List all units of measure
    public ResponseEntity<?> listUnitsOfMeasure()
    {
        return new ResponseEntity<>(repository.findAll() , HttpStatus.OK);
    }

    //Find By ID
    public ResponseEntity<?> listUnitsOfMeasureByID(Long id)
    {
        return new ResponseEntity<>(repository.findById(id) , HttpStatus.OK);
    }

    //JSON OBJECT PROCESSING (Import Units Of Measure in Bulk)
    public ResponseEntity<?> parseJSON(String json)
    {
        JSONObject ob = new JSONObject(json);
        UnitsOfMeasure um = null;
        for (Object jo: ob.getJSONArray("rateUnit")) {
            Gson gs = new Gson();
            um = gs.fromJson(jo.toString(),UnitsOfMeasure.class);
            repository.save(um);
        }
        return new ResponseEntity<>(um.getName()+" - "+um.getValue()+" - "+um.getDescription(),HttpStatus.OK);
    }
}