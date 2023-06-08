package co.ke.emtechhouse.eims.AuthenticationModule.passwordhistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PasswordHistoryRepository extends JpaRepository<PasswordHistory,Long> {
    List<PasswordHistory> findByEncryptedPasswordAndUsername(String encryptedPassword,String username);
}