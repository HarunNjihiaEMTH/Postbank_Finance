package co.ke.emtechhouse.eims.URAComponent.uralookups.payway;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/urapayway/")
public class URAPayWayController {
    @Autowired
    private URAPayWayService service;

    //Add
    @PostMapping("/add")
    public ResponseEntity<?> addPayWay(@RequestBody URAPayWay payWay)
    {
        return new ResponseEntity<>(service.addURAPayWay(payWay), HttpStatus.CREATED);
    }

    //Update
    @PutMapping("/update")
    public ResponseEntity<?> updateURAPayWay(@RequestBody URAPayWay payWay)
    {
        return new ResponseEntity<>(service.updatePayWay(payWay), HttpStatus.OK);
    }

    //Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteURAPayWay(@PathVariable("id") Long id)
    {
        return new ResponseEntity<>(service.deletePayWay(id), HttpStatus.OK);
    }

    //List All
    @GetMapping("/all")
    public ResponseEntity<?> listAllURAPayWays()
    {
        return new ResponseEntity<>(service.listPayWays(), HttpStatus.OK);
    }

    //Find By Id
    @GetMapping("/find/{id}")
    public ResponseEntity<?> findURAPayWayById(@PathVariable("id") Long id)
    {
        return new ResponseEntity<>(service.listPayWayByID(id), HttpStatus.OK);
    }

    //Bulk Import Currency codes
    @PostMapping("/bulkimport")
    public ResponseEntity<?> parseJSONArray(@RequestBody String json)
    {
        return new ResponseEntity<>(service.parseJSON(json), HttpStatus.OK);
    }
}
