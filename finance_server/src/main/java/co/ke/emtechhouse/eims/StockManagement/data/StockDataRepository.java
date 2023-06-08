package co.ke.emtechhouse.eims.StockManagement.data;


import co.ke.emtechhouse.eims.URAComponent.uploadgoods.Good;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StockDataRepository extends JpaRepository<StockData,Long> {

	@Transactional
	@Query(nativeQuery = true,value = "SELECT * from efriscats WHERE isservice like %:isservice%")
	Page<StockData> searchByIsservice(@Param("isservice")String isservice, Pageable pageable);
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * from efriscats WHERE classname like %:classname%")
	Page<StockData> searchByClassname(@Param("classname") String classname, Pageable pageable);
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * from efriscats WHERE commoditycode like %:commoditycode%")
	Page<StockData> searchByCommoditycode(@Param("commoditycode") String commoditycode, Pageable pageable);
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * from efriscats WHERE classcode like %:classcode%")
	Page<StockData> searchByClasscode(@Param("classcode")String  classcode, Pageable pageable);
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * from efriscats WHERE commodityname like %:commodityname%")
	Page<StockData> searchByCommodityname(@Param("commodityname") String commodityname, Pageable pageable);
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * from efriscats WHERE familycode like %:familycode%")
	Page<StockData> searchByFamilycode(@Param("familycode") String familycode, Pageable pageable);
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * from efriscats WHERE familyname like %:familyname%")
	Page<StockData> searchByFamilyname(@Param("familyname") String familyname, Pageable pageable);
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * from efriscats WHERE segmentname like %:segmentname%")
	Page<StockData> searchBySegmentname(@Param("segmentname") String segmentname, Pageable pageable);


//	@Transactional
//	@Query(nativeQuery = true,value = "SELECT * from efriscats WHERE classcode like %:classcode%")
//	List<StockData> searchByTerm();
}
