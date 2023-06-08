package co.ke.emtechhouse.eims.AuthenticationModule.blacklistedwords;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/blacklist")
public class WordsBlacklistController {
    @Autowired
    private WordsBlacklistRepository wordsBlacklistRepository;

    //List All Words not deleted
    @GetMapping("/view")
    public ResponseEntity<?> getAllWordsNotDeleted()
    {
        return new ResponseEntity<>(wordsBlacklistRepository.findByDeletedFlag("N"), HttpStatus.OK);
    }

    //List all deleted blacklisted words
    @GetMapping("/deleted")
    public ResponseEntity<?> getAllWordsDeleted()
    {
        return new ResponseEntity<>(wordsBlacklistRepository.findByDeletedFlag("Y"), HttpStatus.OK);
    }

    //List All
    @GetMapping("/all")
    public ResponseEntity<?> getAllWords()
    {
        return new ResponseEntity<>(wordsBlacklistRepository.findAll(), HttpStatus.OK);
    }

    //Create New Blacklisted Word
    @PostMapping("/add")
    public ResponseEntity<?> newBlacklistedWord(@RequestBody WordsBlacklist blacklist)
    {
        Optional<WordsBlacklist> wbl = wordsBlacklistRepository.findByWord(blacklist.getWord());
        if(wbl.isPresent())
        {
            return new ResponseEntity<>(new MessageResponse(blacklist.getWord()+ " - Already Blacklisted!"), HttpStatus.NOT_EXTENDED);
        }
        else {
            wordsBlacklistRepository.save(blacklist);
            return new ResponseEntity<>(new MessageResponse("Successful"), HttpStatus.OK);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateBlacklistedWord(@RequestBody WordsBlacklist blacklist)
    {
        Optional<WordsBlacklist> wbl = wordsBlacklistRepository.findByWord(blacklist.getWord());
        if(wbl.isPresent())
        {
            return new ResponseEntity<>(new MessageResponse(blacklist.getWord()+ " - Already Blacklisted!"), HttpStatus.NOT_EXTENDED);
        }
        else {
            wordsBlacklistRepository.save(blacklist);
            return new ResponseEntity<>(new MessageResponse("Successful"), HttpStatus.OK);
        }
    }

    @GetMapping("delete")
    public ResponseEntity<?> deleteBlacklistedWord(@RequestParam("id") Long id,@RequestParam("deletedBy") String deletedBy)
    {
        Optional<WordsBlacklist> wbl = wordsBlacklistRepository.findById(id);
        if(wbl.isPresent())
        {
            //Update
            WordsBlacklist bl = wbl.get();
            bl.setDeletedBy(deletedBy);
            bl.setDeletedFlag("Y");
            bl.setDeletedOn(new Date());
            wordsBlacklistRepository.save(bl);
            return new ResponseEntity<>(new MessageResponse("Successful"), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new MessageResponse("Record Does Not Exist!"), HttpStatus.NO_CONTENT);
        }
    }
}
