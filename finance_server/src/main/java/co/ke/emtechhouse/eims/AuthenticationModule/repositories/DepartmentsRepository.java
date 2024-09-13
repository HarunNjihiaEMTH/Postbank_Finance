package co.ke.emtechhouse.eims.AuthenticationModule.repositories;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.Departments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentsRepository extends JpaRepository<Departments,Long> {
    List<Departments> findByName(String name);
}
