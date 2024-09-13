package co.ke.emtechhouse.eims.Finacle.GlCodes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v1/glcodes/")
public class GLCodesController {
    @Autowired
    private GLCodesService service;

    @GetMapping("/all")
    public ResponseEntity<?> getAllGLSubheadCodes () {
        return new ResponseEntity<>(service.getGLCodes(), HttpStatus.OK);
    }
}
