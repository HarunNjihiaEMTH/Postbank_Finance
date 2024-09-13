package co.ke.emtechhouse.eims.Finacle.GlSubHeads;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v1/glsubheadcodes/")
public class GLSubheadsController {
    @Autowired
    private GLSubheadsService service;

    @GetMapping("/all")
    public ResponseEntity<?> getAllGLSubheadCodes (@RequestParam("glcode") String glcode) {
        return new ResponseEntity<>(service.getGLSubheadCodes(glcode), HttpStatus.OK);
    }
}
