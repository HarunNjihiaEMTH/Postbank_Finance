package co.ke.emtechhouse.eims.AuthenticationModule.blacklistedwords;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordsBlacklistRepository extends JpaRepository<WordsBlacklist,Long> {
    Optional<WordsBlacklist> findByWord(String word);
    List<WordsBlacklist> findByDeletedFlag(String deletedFlag);
}
