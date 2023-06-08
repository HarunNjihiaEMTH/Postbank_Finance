package co.ke.emtechhouse.eims.Utils.MigrationCombonent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MigrationResponse<T> {
    List<T> succeed = new ArrayList<>();
    List<T> failed = new ArrayList<>();
    List<T> exist = new ArrayList<>();
    List<T> failedcostcenter = new ArrayList<>();
    List<T> failedexpense = new ArrayList<>();
}
