package co.ke.emtechhouse.eims.URAComponent.clientinit;

import co.ke.emtechhouse.eims.URAComponent.KeyAndSignature.KeyAndSignatureService;
import co.ke.emtechhouse.eims.URAComponent.loginrequest.URALoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class ClientIntializationController {
    @Autowired
    private ClientInitializationService service;

    @Autowired
    private URALoginService uraLoginService;

    @Autowired
    private KeyAndSignatureService keyAndSignatureService;

    @Scheduled(fixedDelay = 828000000)
    public void initializeURWebService () {
        try {
            //TCS Init
            service.clientInitialization();
            Thread.sleep(1000L);
            //Log In
            uraLoginService.logInToURA();
            Thread.sleep(1000L);
            //Update Key
            keyAndSignatureService.getSymmetricKeyAndSignature();
        }catch (Exception e) {
            log.info("{ ERROR } TCS Init - "+e.getLocalizedMessage());
        }
    }
}
