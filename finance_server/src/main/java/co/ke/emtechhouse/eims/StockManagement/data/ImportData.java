package co.ke.emtechhouse.eims.StockManagement.data;

import org.json.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
public class ImportData {
	public static Connection ConnectToDB() throws Exception {
		//Getting the connection
		String mysqlUrl = "jdbc:mysql://localhost:3306/eims_db_prod";
		Connection con = DriverManager.getConnection(mysqlUrl, "root", "emtech@2022");
		System.out.println("Connection established......");
		return con;
	}

	public void main() {
		//Creating a JSONParser object
		JSONParser jsonParser = new JSONParser();
		try {
			//Parsing the contents of the JSON file
			JSONObject jsonObject = (JSONObject) jsonParser.parse(new FileReader("/home/ubuntu/excel-to-json.json"));
			//Retrieving the array
			JSONArray jsonArray = (JSONArray) jsonObject.get("GoodsAndServices");
			Connection con = ConnectToDB();
			//Insert a row into the MyPlayers table
			PreparedStatement pstmt = con.prepareStatement("INSERT INTO efriscats (segmentname,familycode,familyname,classcode,classname,commoditycode,commodityname,isservice) values (?, ?, ?, ?, ?, ?,?,? )");
			for (Object object : jsonArray) {
				JSONObject record = (JSONObject) object;
				String sn  = record.get("segmentname").toString();
				String fc = record.get("familycode").toString();
				String fn =  record.get("familyname").toString();
				String cc = record.get("classcode").toString();
				String cn = record.get("classname").toString();
				String cc1 =  record.get("commoditycode").toString();
				String cn1 = record.get("commodityname").toString();
				String is = record.get("isservice").toString();

				pstmt.setString(1, sn);
				pstmt.setString(2, fc);
				pstmt.setString(3, fn);
				pstmt.setString(4, cc);
				pstmt.setString(5, cn);
				pstmt.setString(6, cc1);
				pstmt.setString(7, cn1);
				pstmt.setString(8, is);
				pstmt.executeUpdate();
			}
			System.out.println("Records inserted.....");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
