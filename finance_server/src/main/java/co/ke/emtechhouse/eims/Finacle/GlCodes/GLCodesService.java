package co.ke.emtechhouse.eims.Finacle.GlCodes;


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
public class GLCodesService {
    Configurations cn = new Configurations();
    String query = cn.getProperties().getProperty("sql.query.glcodes");


    //Get GL Codes From Finacle Database
    public List<GLCodesResponse> getGLCodes() {
        DatabaseConnection dc = new DatabaseConnection();
        Connection con = dc.dbConnection();

        List<GLCodesResponse> ja = new ArrayList<>();
        try {
            PreparedStatement st = null;
            st = con.prepareStatement(query);
            ResultSet rs = st.executeQuery();
            while (rs.next()) {
                GLCodesResponse br = new GLCodesResponse();
                br.setGlcode(rs.getString(1));
                br.setGlcodedesc(rs.getString(2));
                ja.add(br);
            }

        } catch (SQLException e) {
            GLCodesResponse br = new GLCodesResponse();
            br.setGlcode("ERROR");
            br.setGlcodedesc(e.getLocalizedMessage());
            ja.add(br);
            return ja;
        }
        return ja;
    }
}
