/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package co.ke.emtechhouse.eims.AuthenticationModule.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "audittrails")
public class Auditing {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private Date starttime;
        private String username;
        private String requestip;
        private String activity;
}


