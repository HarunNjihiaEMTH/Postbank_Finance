package co.ke.emtechhouse.eims.Finacle.pickingaccounts;


import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.Finacle.utilities.DatabaseConnection;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PickingDetailsService {
    Configurations cn = new Configurations();
    String query = cn.getProperties().getProperty("sql.query.pickingaccounts");
    String query1 = cn.getProperties().getProperty("sql.query.pickingaccounts.contradetails");

    //Get Picking account additional details From Finacle Database
    public List<PickingAccountsDetails> getPickingAccountsDetails(String foracid) {
        DatabaseConnection dc = new DatabaseConnection();
        Connection con = dc.dbConnection();
        List<PickingAccountsDetails> res = new ArrayList<>();

        try {
            PreparedStatement st = null;
            st = con.prepareStatement(query);
            st.setString(1, foracid);
            ResultSet rs = st.executeQuery();
            while (rs.next()) {
                List<ContraDetails> ja = new ArrayList<>();
                PickingAccountsDetails br = new PickingAccountsDetails();
                br.setTranid(rs.getString(1));
                br.setTrandate(rs.getString(2));
                br.setTranparticular(rs.getString(3));
                br.setCurrency(rs.getString(4));
                br.setTranamount(rs.getString(5));
                br.setReversedamount(rs.getString(6));
                ja = getContraDetails(rs.getString(1));
                br.setContraDetails(ja);
                res.add(br);
            }

        } catch (SQLException e) {
            List<ContraDetails> ja = new ArrayList<>();
            PickingAccountsDetails br = new PickingAccountsDetails();
            br.setTranid("NA");
            br.setTrandate("NA");
            br.setTranparticular("NA");
            br.setCurrency("NA");
            br.setTranamount("NA");
            br.setReversedamount("NA");
            ja = null;
            br.setContraDetails(ja);
            return res;
        }
        return res;
    }




    public List<ContraDetails> getContraDetails(String orgtranid) {
        DatabaseConnection dc = new DatabaseConnection();
        Connection con = dc.dbConnection();

        List<ContraDetails> ja = new ArrayList<>();

        try {
            PreparedStatement st = null;
            st = con.prepareStatement(query1);
            st.setString(1, orgtranid);
            ResultSet rs = st.executeQuery();
            while (rs.next()) {
                ContraDetails br = new ContraDetails();
                br.setContratranid(rs.getString(1));
                br.setContratrandate(rs.getString(2));
                br.setParttransrlnum(rs.getString(3));
                br.setAmtoffset(rs.getString(4));
                br.setCrncycode(rs.getString(5));
                ja.add(br);
                System.out.println(ja);
            }

        } catch (SQLException e) {
            List<ContraDetails> ja1 = new ArrayList<>();
            ContraDetails br = new ContraDetails();
            br.setContratranid("ERROR");
            br.setContratrandate(e.getLocalizedMessage());
            br.setParttransrlnum("NA");
            br.setAmtoffset("NA");
            br.setCrncycode("NA");
            ja1.add(br);
            return ja1;
        }
        return ja;
    }
}
