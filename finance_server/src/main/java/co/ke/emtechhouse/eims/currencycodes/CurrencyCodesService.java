/*
 * Copyright (c) 2022. Omukubwa Software Solutions, OSS.
 * All Rights Reserved.
 */

package co.ke.emtechhouse.eims.currencycodes;


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
public class CurrencyCodesService {
    Configurations cn = new Configurations();
    String query = cn.getProperties().getProperty("sql.query.currencycodes");

    //Get Branch Codes From Finacle Database
    public List<CurrencyCodesResponse> getCurrencyCodes() {
        DatabaseConnection dc = new DatabaseConnection();
        Connection con = dc.dbConnection();

        List<CurrencyCodesResponse> ja = new ArrayList<>();
        try {
            PreparedStatement st = null;
            st = con.prepareStatement(query);
            ResultSet rs = st.executeQuery();
            while (rs.next()) {
                CurrencyCodesResponse cr = new CurrencyCodesResponse();
                cr.setCode(rs.getString(1).trim());
                cr.setName(rs.getString(2).trim());
                ja.add(cr);
            }

        } catch (SQLException e) {
            System.out.println(e.getLocalizedMessage());
        }
        return ja;
    }

}
