package co.ke.emtechhouse.eims.URAComponent.uralookups.sectors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/urasectors/")
public class URASectorsController {
    @Autowired
    private URASectorsService service;

    //Add
    @PostMapping("/add")
    public ResponseEntity<?> addURASectors(@RequestBody URASectors uraSectors)
    {
        return new ResponseEntity<>(service.addURASectors(uraSectors), HttpStatus.CREATED);
    }

    //Update
    @PutMapping("/update")
    public ResponseEntity<?> updateURASectors(@RequestBody URASectors uraSectors)
    {
        return new ResponseEntity<>(service.updateURASectors(uraSectors), HttpStatus.OK);
    }

    //Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteURASectors(@PathVariable("id") Long id)
    {
        return new ResponseEntity<>(service.deleteURASector(id), HttpStatus.OK);
    }

    //List All
    @GetMapping("/all")
    public ResponseEntity<?> listAllURASectors()
    {
        return new ResponseEntity<>(service.listURASectors(), HttpStatus.OK);
    }

    //Find By Id
    @GetMapping("/find/{id}")
    public ResponseEntity<?> findURASectorsById(@PathVariable("id") Long id)
    {
        return new ResponseEntity<>(service.listURASectorByID(id), HttpStatus.OK);
    }

    //Bulk Import Currency codes
    @PostMapping("/bulkimport")
    public ResponseEntity<?> parseJSONArray(@RequestBody String json)
    {
        return new ResponseEntity<>(service.parseJSON(json), HttpStatus.OK);
    }
}
