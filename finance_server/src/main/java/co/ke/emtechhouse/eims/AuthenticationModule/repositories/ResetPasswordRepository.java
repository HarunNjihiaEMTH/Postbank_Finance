/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package co.ke.emtechhouse.eims.AuthenticationModule.repositories;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.ResetPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
public interface ResetPasswordRepository extends JpaRepository<ResetPassword,Long> {
    @Transactional
    @Query(nativeQuery = true,value = "SELECT date FROM reset_password WHERE emailaddress = :emailaddress AND status = 'N'")
    java.sql.Date getDate(
            @Param(value = "emailaddress") String emailaddress
    );

    //Select Token
    @Transactional
    @Query(nativeQuery = true,value = "SELECT code FROM reset_password WHERE emailaddress = :emailaddress AND status = 'N'")
    int getToken(
            @Param(value = "emailaddress") String emailaddress
    );

    @Transactional
    @Query(nativeQuery = true,value = "SELECT requesthr FROM reset_password WHERE emailaddress = :emailaddress AND status = 'N'")
    int getRequestHr(
            @Param(value = "emailaddress") String emailaddress
    );

    @Transactional
    @Query(nativeQuery = true,value = "SELECT count(*) FROM reset_password WHERE emailaddress = :emailaddress AND status = 'N'")
    int countRecords(@Param(value = "emailaddress") String emailaddress);

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "update reset_password set code = :code,requesthr = :requesthr,date =:date where emailaddress = :emailaddress")
    void UpdateResetCode(
            @Param(value = "emailaddress") String emailaddress,
            @Param(value = "requesthr") int requesthr,
            @Param(value = "code") int code,
            @Param(value ="date") java.sql.Date date
    );


    //Update Status of an Email after sending
    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "UPDATE reset_password set status=?1 WHERE id=?2")
    void updateEmailStatus(@Param("status") String status, @Param("id") String id);

    //Return id of the email sent
    @Transactional
    @Query(nativeQuery = true,value = "SELECT id FROM reset_password WHERE code =?1 and emailaddress =?2")
    String getEmailId(int code, String emailaddress);

    //Select code status
    @Transactional
    @Query(nativeQuery = true,value = "SELECT count(status) FROM reset_password WHERE emailaddress = :emailaddress AND status != 'Y'")
    int getCodeStatus(
            @Param(value = "emailaddress") String emailaddress
    );
}
