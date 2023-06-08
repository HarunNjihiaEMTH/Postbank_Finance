/*
 * Copyright (c) 2022. Omukubwa Software Solutions, OSS.
 * All Rights Reserved.
 */

package co.ke.emtechhouse.eims.Finacle.AccountsLookUp;


import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.Finacle.utilities.DatabaseConnection;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class OfficeAccountsService {
    Configurations cn = new Configurations();
    String query = cn.getProperties().getProperty("sql.query.officeaccounts");
    String brcodes_query = cn.getProperties().getProperty("sql.query.branchcodes");
    String schemecodes_query = cn.getProperties().getProperty("sql.query.schemecodes");
    String banks_query = cn.getProperties().getProperty("sql.query.banks");

    //Get Office Accounts From Finacle Database
    public List<OfficeAccountsResponse> getOfficeAccountsCodes(String SOL_ID,String schemeCode) {
        DatabaseConnection dc = new DatabaseConnection();
        Connection con = dc.dbConnection();

        List<OfficeAccountsResponse> ja = new ArrayList<>();
        try {
            PreparedStatement st = null;
            st = con.prepareStatement(query);
            st.setString(1,SOL_ID);
            st.setString(2,schemeCode);
            ResultSet rs = st.executeQuery();

            while (rs.next()) {
                OfficeAccountsResponse br = new OfficeAccountsResponse();

//                System.out.println("result set ::"+ rs.getString(1));
                br.setAccountnumber(rs.getString(1).trim());
                br.setAccountname(rs.getString(2).trim());
                br.setBranchId(rs.getString(3).trim());
                br.setCurrency(rs.getString(4).trim());
                br.setSchemeType(rs.getString(5).trim());
                ja.add(br);
            }

        } catch (SQLException e) {
            OfficeAccountsResponse br = new OfficeAccountsResponse();
            br.setAccountnumber("NA");
            br.setAccountname(e.getLocalizedMessage());
            br.setBranchId("NA");
            br.setCurrency("NA");
            br.setSchemeType("NA");
            ja.add(br);
            return ja;
        }
        return ja;
    }

    @Data
    @ToString
    public class   BranchCodes{
        private String branchCode;
    }
    public List<BranchCodes> getBranchCodes() {
        DatabaseConnection dc = new DatabaseConnection();
        Connection con = dc.dbConnection();

        List<BranchCodes> branchCodesList = new ArrayList<>();
        try {
            PreparedStatement st = null;
            st = con.prepareStatement(brcodes_query);
            ResultSet rs = st.executeQuery();

            while (rs.next()) {
                BranchCodes brc = new BranchCodes();

//                System.out.println("result set ::"+ rs.getString(1));
               brc.setBranchCode(rs.getString(1));
                branchCodesList.add(brc);
            }

        } catch (SQLException e) {
            BranchCodes brc = new BranchCodes();

//                System.out.println("result set ::"+ rs.getString(1));
            brc.setBranchCode("N/A");
            branchCodesList.add(brc);
            return branchCodesList;
        }
        return branchCodesList;
    }

    @Data
    @ToString
    public class   SchemCodes{
        private String schemecode;
        private String schemeDesc;
    }
    public List<SchemCodes> getSchemeCodes() {
        DatabaseConnection dc = new DatabaseConnection();
        Connection con = dc.dbConnection();

        List<SchemCodes> schemCodesList = new ArrayList<>();
        try {
            PreparedStatement st = null;
            st = con.prepareStatement(schemecodes_query);
            ResultSet rs = st.executeQuery();

            while (rs.next()) {
                SchemCodes sc = new SchemCodes();

//                System.out.println("result set ::"+ rs.getString(1));
                sc.setSchemecode(rs.getString(1).trim());
                sc.setSchemeDesc(rs.getString(2).trim());
                schemCodesList.add(sc);
            }

        } catch (SQLException e) {
            SchemCodes sc = new SchemCodes();

//                System.out.println("result set ::"+ rs.getString(1));
            sc.setSchemecode("NA");
            schemCodesList.add(sc);
            return schemCodesList;
        }
        return schemCodesList;
    }


    public List<Banks> getBanks() {
        DatabaseConnection dc = new DatabaseConnection();
        Connection con = dc.dbConnection();

        List<Banks> banks = new ArrayList<>();
        try {
            PreparedStatement st = null;
            st = con.prepareStatement(banks_query);
            ResultSet rs = st.executeQuery();

            while (rs.next()) {
                Banks bank = new Banks();

//                System.out.println("result set ::"+ rs.getString(1));
                bank.setBankCode(rs.getString(1).trim());
                bank.setBankName(rs.getString(2).trim());
                bank.setBankShortName(rs.getString(3).trim());
                banks.add(bank);
            }

        } catch (SQLException e) {
            Banks bank = new Banks();

//                System.out.println("result set ::"+ rs.getString(1));
           bank.setBankName("NA");
            banks.add(bank);
            return  banks;
        }
        return banks;
    }



}
