package co.ke.emtechhouse.eims.AuthenticationModule.payload;

public class UpdateUserRole {
    private Long roleid;

    public UpdateUserRole(Long roleid, Long userid) {
        this.roleid = roleid;
        this.userid = userid;
    }

    public UpdateUserRole() {
    }

    public Long getRoleid() {
        return roleid;
    }

    public void setRoleid(Long roleid) {
        this.roleid = roleid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    private Long userid;
}
