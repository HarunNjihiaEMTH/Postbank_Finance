package co.ke.emtechhouse.eims.URAComponent.uralookups.payway;

import com.google.gson.Gson;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class URAPayWayService {
    @Autowired
    private URAPayWayRepository repository;

    //Save payWay
    public ResponseEntity<?> addURAPayWay(URAPayWay payWay)
    {
        repository.save(payWay);
        return new ResponseEntity<>("Added Successfully - "+payWay.getName() , HttpStatus.OK);
    }

    //Update PayWay
    public ResponseEntity<?> updatePayWay(URAPayWay payWay)
    {
        repository.save(payWay);
        return new ResponseEntity<>("Updated Successfully - "+payWay.getName() , HttpStatus.OK);
    }

    //Delete Payway
    public ResponseEntity<?> deletePayWay(Long id)
    {
        repository.deleteById(id);
        return new ResponseEntity<>("Deleted Successfully - ID : "+id , HttpStatus.OK);
    }

    //List all Pay Ways
    public ResponseEntity<?> listPayWays()
    {
        return new ResponseEntity<>(repository.findAll() , HttpStatus.OK);
    }

    //Find By ID
    public ResponseEntity<?> listPayWayByID(Long id)
    {
        return new ResponseEntity<>(repository.findById(id) , HttpStatus.OK);
    }

    //JSON OBJECT PROCESSING (Import Pay Way data in Bulk)
    public ResponseEntity<?> parseJSON(String json)
    {
        JSONObject ob = new JSONObject(json);
        URAPayWay um = null;
        for (Object jo: ob.getJSONArray("payWay")) {
            Gson gs = new Gson();
            um = gs.fromJson(jo.toString(),URAPayWay.class);
            repository.save(um);
        }
        return new ResponseEntity<>(um.getName()+" - "+um.getValue()+" - "+um.getDescription(),HttpStatus.OK);
    }
}
