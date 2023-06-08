package co.ke.emtechhouse.eims.URAComponent.SellerAndBasicDetails.seller;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerDetailsRepository extends JpaRepository<SellerDetails,Long> {
}
