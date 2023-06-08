/*
 * Copyright (c) 2022. Omukubwa Software Solutions, OSS.
 * All Rights Reserved.
 */

package co.ke.emtechhouse.eims.Finacle.utilities;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/*@author Omukubwa Emukule*/

//Handles all Connections to the Database
//MySQL and Oracle.
public class DatabaseConnection {
    //Instance of the configuration class
    static Configurations cn = new Configurations();
    //Encryption Key
    static private String key = cn.getProperties().getProperty("enc.key");
    //Encryption Init Vector
    static private String initVector =  cn.getProperties().getProperty("enc.initVector");

    //Connecting to Oracle Database
    public static Connection dbConnection() {
        Connection conn = null;
        //connect to database
        try {
//            String c_lass = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.class")).trim();
//            Class.forName(c_lass);
//            String serverName = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.ip").trim());
//            String portNumber = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.port").trim());
//            String sid = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.database").trim());
//            String url = "jdbc:oracle:thin:@" + serverName + ":" + portNumber + ":" + sid;
//            String username = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.username").trim());
//            String password = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.password").trim());
//
            String c_lass = cn.getProperties().getProperty("db.class");
            Class.forName(c_lass);
            String serverName = cn.getProperties().getProperty("db.ip").trim();
            String portNumber = cn.getProperties().getProperty("db.port");
            String sid = cn.getProperties().getProperty("db.database");
            String url = "jdbc:oracle:thin:@" + serverName + ":" + portNumber + ":" + sid;
            String username = cn.getProperties().getProperty("db.username").trim();
            String password = cn.getProperties().getProperty("db.password").trim();


            //Postbank Uganda
//            String c_lass = "oracle.jdbc.driver.OracleDriver";
//            Class.forName(c_lass);
//            String serverName = "finuat-db-scan.postbank.co.ug";
//            String portNumber = "1521";
//            String sid = "FINUAT2";
//            String url = "jdbc:oracle:thin:@" + serverName + ":" + portNumber + ":" + sid;
//            String username = "system";
//            String password = "manager";


            //Emtech
//            String c_lass = "oracle.jdbc.driver.OracleDriver";
//            Class.forName(c_lass);
//            String serverName = "3.21.220.181";
//            String portNumber = "1521";
//            String sid = "SITDB";
//            String url = "jdbc:oracle:thin:@" + serverName + ":" + portNumber + ":" + sid;
//            String username = "system";
//            String password = "manager";




            conn = DriverManager.getConnection(url, username, password);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        if (conn != null) {
            return conn;

        } else {
        }
        return null;
    }


    /*public static Connection dbConnection() {
        Connection conn = null;
        try {
            //logger.info("DATABASE CONNECTION :: Connection variables  :: "+host_ip+" :: "+username+" :: "+port+":"+database_name);
            String c_lass = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.class")).trim();
            Class.forName(c_lass);
            String serverName = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.ip").trim());
            String portNumber = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.port").trim());
            String sid = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.database").trim());
            String url = "jdbc:mysql://";
            String username = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.username").trim());
            String password = Encryptor.decrypt(key, initVector,cn.getProperties().getProperty("db.password").trim());
            conn = DriverManager.getConnection(url + serverName + ":" + portNumber + "/" + sid+"?autoReconnect=true&useSSL=false", username, password);
        } catch (ClassNotFoundException | SQLException asd) {
            System.err.println(asd.getLocalizedMessage());
            //logger.info("DATABASE CONNECTION :: Connection failed :: ERROR :: "+asd.getLocalizedMessage());
            System.out.println("DATABASE CONNECTION :: Connection failed :: ERROR :: "+asd.getLocalizedMessage());
        }
        if (conn != null) {
            return conn;

        } else {
        }
        return null;
    }*/



    //Closing the Connection to te database
    public static void closeConn(Connection con) {
        try {
            if (con != null) {
                con.close();
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}
