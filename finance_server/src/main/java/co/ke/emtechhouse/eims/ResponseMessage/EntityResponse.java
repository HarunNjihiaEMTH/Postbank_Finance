package co.ke.emtechhouse.eims.ResponseMessage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EntityResponse<T> {
    private String name;
    private String account_no;
    private String scheme_code;
    private String scheme_type;
    private String message;
    private T entity;
    private Integer statusCode;
}
