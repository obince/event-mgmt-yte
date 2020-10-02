package yte.intern.spring.app.usecases.managestudents.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.spring.app.usecases.common.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(name = "idgen", sequenceName = "STUDENT_SEQ")
public class Student extends BaseEntity {

    @Column(name = "NAME")
    private String name;

    @Column(name = "SURNAME")
    private  String surname;

    @Column(name = "EMAIL", unique = true)
    private String email;

    @Column(name = "TC_KIMLIK_NO", unique = true)
    private String tcKimlikNo;

    @Column(name = "STUDENT_NUMBER", unique = true)
    private String studentNumber;
}
