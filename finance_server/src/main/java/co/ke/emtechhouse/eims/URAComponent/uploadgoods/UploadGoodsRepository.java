package co.ke.emtechhouse.eims.URAComponent.uploadgoods;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UploadGoodsRepository extends JpaRepository<Good,Long> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "UPDATE portalgoods SET urastatus=:urastatus WHERE goods_code= :goods_code")
    void updateURAstatus(
            @Param(value = "urastatus") String urastatus,
            @Param(value = "goods_code") String code
    );

    @Transactional
    @Query(nativeQuery = true,value = "SELECT * from portalgoods WHERE urastatus = 'SUCCESS'")
    List<Good> allGoodsPostedToURA();

    @Transactional
    @Query(nativeQuery = true,value = "SELECT * from portalgoods WHERE urastatus = 'SUCCESS' AND goodorservice='Good'")
    List<Good> onlyGoodsPostedToURA();

    @Transactional
    @Query(nativeQuery = true,value = "SELECT * from portalgoods WHERE urastatus = 'SUCCESS' AND goodorservice='Service'")
    List<Good> onlyServicesPostedToURA();

    @Transactional
    @Query(nativeQuery = true,value = "SELECT * from portalgoods WHERE urastatus != 'SUCCESS'")
    List<Good> allGoodsFailedToPostToURA();
}
