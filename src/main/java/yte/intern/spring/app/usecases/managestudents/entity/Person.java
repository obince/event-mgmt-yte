package yte.intern.spring.app.usecases.managestudents.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.spring.app.usecases.common.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import java.util.List;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "PERSON_SEQ")
@AllArgsConstructor
@NoArgsConstructor
public class Person extends BaseEntity {

    @Column( name = "NAME")
    private String name;

    @Column( name = "SURNAME")
    private String surname;

    @Column( name = "TC_KIMLIK_NO", unique = true)
    private String tcKimlikNo;

    @Column( name = "EMAIL", unique = true)
    private String email;

    @Column( name = "ANSWERS")
    @ElementCollection
    private List<String> answers;
}
