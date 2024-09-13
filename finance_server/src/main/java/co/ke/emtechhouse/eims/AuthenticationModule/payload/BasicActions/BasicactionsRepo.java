package co.ke.emtechhouse.eims.AuthenticationModule.payload.BasicActions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BasicactionsRepo extends JpaRepository<Basicactions, Long> {
}
