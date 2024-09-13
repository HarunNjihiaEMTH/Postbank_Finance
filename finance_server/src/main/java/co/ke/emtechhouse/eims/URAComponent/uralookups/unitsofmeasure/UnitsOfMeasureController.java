package co.ke.emtechhouse.eims.URAComponent.uralookups.unitsofmeasure;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/unitsofmeasure/")
public class UnitsOfMeasureController {
    @Autowired
    private UnitsOfMeasureService service;


    //Add
    @PostMapping("/add")
    public ResponseEntity<?> addUnitOfMeasure(@RequestBody UnitsOfMeasure measure)
    {
        return new ResponseEntity<>(service.addUnitsOfMeasure(measure), HttpStatus.CREATED);
    }

    //Update
    @PutMapping("/update")
    public ResponseEntity<?> updateUnitOfMeasure(@RequestBody UnitsOfMeasure measure)
    {
        return new ResponseEntity<>(service.updateUnitOfMeasure(measure), HttpStatus.OK);
    }

    //Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUnitOfMeasure(@PathVariable Long id)
    {
        return new ResponseEntity<>(service.deleteUnitOfMeasure(id), HttpStatus.OK);
    }

    //List All
    @GetMapping("/all")
    public ResponseEntity<?> listAllUnitsOfMeasure()
    {
        return new ResponseEntity<>(service.listUnitsOfMeasure(), HttpStatus.OK);
    }

    //Find By Id
    @GetMapping("/find/{id}")
    public ResponseEntity<?> findUnitOfMeasureById(@PathVariable Long id)
    {
        return new ResponseEntity<>(service.listUnitsOfMeasureByID(id), HttpStatus.OK);
    }

    //Bulk Import Units of measure
    @PostMapping("/bulkimport")
    public ResponseEntity<?> parseJSONArray(@RequestBody String json)
    {
        return new ResponseEntity<>(service.parseJSON(json), HttpStatus.OK);
    }
}
