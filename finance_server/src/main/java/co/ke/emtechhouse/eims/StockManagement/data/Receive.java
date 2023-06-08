package co.ke.emtechhouse.eims.StockManagement.data;

import java.util.List;

public class Receive {
	public List<StockData> getGoodsAndServices() {
		return GoodsAndServices;
	}

	public void setGoodsAndServices(List<StockData> goodsAndServices) {
		GoodsAndServices = goodsAndServices;
	}

	public Receive(List<StockData> goodsAndServices) {
		GoodsAndServices = goodsAndServices;
	}

	private List<StockData> GoodsAndServices;
}
