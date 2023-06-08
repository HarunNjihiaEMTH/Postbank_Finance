package co.ke.emtechhouse.eims.URAComponent.uralookups.sectors;

import co.ke.emtechhouse.eims.URAComponent.uralookups.payway.URAPayWay;
import com.google.gson.Gson;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class URASectorsService {
    @Autowired
    private URASectorsRepository repository;

    //Save URASectors
    public ResponseEntity<?> addURASectors(URASectors payWay)
    {
        repository.save(payWay);
        return new ResponseEntity<>("Added Successfully - "+payWay.getName() , HttpStatus.OK);
    }

    //Update URASectors
    public ResponseEntity<?> updateURASectors(URASectors payWay)
    {
        repository.save(payWay);
        return new ResponseEntity<>("Updated Successfully - "+payWay.getName() , HttpStatus.OK);
    }

    //Delete URA Sectors
    public ResponseEntity<?> deleteURASector(Long id)
    {
        repository.deleteById(id);
        return new ResponseEntity<>("Deleted Successfully - ID : "+id , HttpStatus.OK);
    }

    //List all URA Sectors
    public ResponseEntity<?> listURASectors()
    {
        return new ResponseEntity<>(repository.findAll() , HttpStatus.OK);
    }

    //Find By ID
    public ResponseEntity<?> listURASectorByID(Long id)
    {
        return new ResponseEntity<>(repository.findById(id) , HttpStatus.OK);
    }

    //JSON OBJECT PROCESSING (Import URA Sectors data in Bulk)
    public ResponseEntity<?> parseJSON(String json)
    {
        JSONObject ob = new JSONObject(json);
        URASectors um = null;
        for (Object jo: ob.getJSONArray("sector")) {
            Gson gs = new Gson();
            um = gs.fromJson(jo.toString(),URASectors.class);
            repository.save(um);
        }
        return new ResponseEntity<>(um.getName()+" - "+um.getName()+" - "+um.getCode(),HttpStatus.OK);
    }
}
