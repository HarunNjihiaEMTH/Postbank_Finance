package co.ke.emtechhouse.eims.StockManagement.data;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/uracategories/")
public class StockDataController {
@Autowired
private StockDataRepository repository;

	@PostMapping("/add")
	public ResponseEntity<?> addSupplier(@RequestBody Receive rc){
		List<StockData> ld = rc.getGoodsAndServices();
		for (StockData a : ld) {
			repository.save(a);
		}

		return  new ResponseEntity<>(rc, HttpStatus.OK);
	}

	//By Type (goods or services)
	@GetMapping("/products/type")
	public ResponseEntity<Map<String, Object>> filterByType(
			@RequestParam("page") int page,
			@RequestParam("size") int size,
			@RequestParam("query") String query
	) {
		try {
			List<StockData> services = new ArrayList<StockData>();
			Pageable paging = PageRequest.of(page, size);

			Page<StockData> pageTuts = repository.searchByIsservice(query, paging);
			services = pageTuts.getContent();

			Map<String, Object> response = new HashMap<>();
			response.put("items", services);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	//By Segment Name
	@GetMapping("/products/segmentname")
	public ResponseEntity<Map<String, Object>> filterBySegmentName(
			@RequestParam("page") int page,
			@RequestParam("size") int size,
			@RequestParam("query") String query
	) {
		try {
			List<StockData> products = new ArrayList<StockData>();
			Pageable paging = PageRequest.of(page, size);

			Page<StockData> pageTuts = repository.searchBySegmentname(query, paging);
			products = pageTuts.getContent();

			Map<String, Object> response = new HashMap<>();
			response.put("items", products);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//By Class Name
	@GetMapping("/products/classname")
	public ResponseEntity<Map<String, Object>> filterByClassName(
			@RequestParam("page") int page,
			@RequestParam("size") int size,
			@RequestParam("query") String query
	) {
		try {
			List<StockData> products = new ArrayList<StockData>();
			Pageable paging = PageRequest.of(page, size);

			Page<StockData> pageTuts = repository.searchByClassname(query, paging);
			products = pageTuts.getContent();

			Map<String, Object> response = new HashMap<>();
			response.put("items", products);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	//By Class Code
	@GetMapping("/products/classcode")
	public ResponseEntity<Map<String, Object>> filterByClassCode(
			@RequestParam("page") int page,
			@RequestParam("size") int size,
			@RequestParam("query") String query
	) {
		try {
			List<StockData> products = new ArrayList<StockData>();
			Pageable paging = PageRequest.of(page, size);

			Page<StockData> pageTuts = repository.searchByClasscode(query, paging);
			products = pageTuts.getContent();

			Map<String, Object> response = new HashMap<>();
			response.put("items", products);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//By Commodity Code
	@GetMapping("/products/commoditycode")
	public ResponseEntity<Map<String, Object>> filterByCommodityCode(
			@RequestParam("page") int page,
			@RequestParam("size") int size,
			@RequestParam("query") String query
	) {
		try {
			List<StockData> products = new ArrayList<StockData>();
			Pageable paging = PageRequest.of(page, size);

			Page<StockData> pageTuts = repository.searchByCommoditycode(query, paging);
			products = pageTuts.getContent();

			Map<String, Object> response = new HashMap<>();
			response.put("items", products);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	//By Commodity Name
	@GetMapping("/products/commodityname")
	public ResponseEntity<Map<String, Object>> filterByCommodityName(
			@RequestParam("page") int page,
			@RequestParam("size") int size,
			@RequestParam("query") String query
	) {
		try {
			List<StockData> products = new ArrayList<StockData>();
			Pageable paging = PageRequest.of(page, size);

			Page<StockData> pageTuts = repository.searchByCommodityname(query, paging);
			products = pageTuts.getContent();

			Map<String, Object> response = new HashMap<>();
			response.put("items", products);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//By Family Name
	@GetMapping("/products/familyname")
	public ResponseEntity<Map<String, Object>> filterByFamilyName(
			@RequestParam("page") int page,
			@RequestParam("size") int size,
			@RequestParam("query") String query
	) {
		try {
			List<StockData> products = new ArrayList<StockData>();
			Pageable paging = PageRequest.of(page, size);

			Page<StockData> pageTuts = repository.searchByFamilyname(query, paging);
			products = pageTuts.getContent();

			Map<String, Object> response = new HashMap<>();
			response.put("items", products);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//By FamilyCode
	@GetMapping("/products/familycode")
	public ResponseEntity<Map<String, Object>> filterByFamilyCode(
			@RequestParam("page") int page,
			@RequestParam("size") int size,
			@RequestParam("query") String query
	) {
		try {
			List<StockData> products = new ArrayList<StockData>();
			Pageable paging = PageRequest.of(page, size);

			Page<StockData> pageTuts = repository.searchByFamilycode(query, paging);
			products = pageTuts.getContent();

			Map<String, Object> response = new HashMap<>();
			response.put("items", products);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
