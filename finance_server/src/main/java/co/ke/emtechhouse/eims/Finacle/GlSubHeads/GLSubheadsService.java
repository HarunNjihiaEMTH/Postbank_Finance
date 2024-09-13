package co.ke.emtechhouse.eims.Finacle.GlSubHeads;


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
public class GLSubheadsService {
    Configurations cn = new Configurations();
    String query = cn.getProperties().getProperty("sql.query.glsubheads");


    //Get GLSubheads From Finacle Database
    public List<GLSubheadsResponse> getGLSubheadCodes(String glcode) {
        DatabaseConnection dc = new DatabaseConnection();
        Connection con = dc.dbConnection();

        List<GLSubheadsResponse> ja = new ArrayList<>();
        try {
            PreparedStatement st = null;
            st = con.prepareStatement(query);
            st.setString(1, glcode);
            ResultSet rs = st.executeQuery();
            while (rs.next()) {
                GLSubheadsResponse br = new GLSubheadsResponse();
                br.setSubheadcode(rs.getString(1));
                br.setSubheaddesc(rs.getString(2));
                ja.add(br);
            }

        } catch (SQLException e) {
            GLSubheadsResponse br = new GLSubheadsResponse();
            br.setSubheadcode("ERROR");
            br.setSubheaddesc(e.getLocalizedMessage());
            ja.add(br);
            return ja;
        }
        return ja;
    }
}
