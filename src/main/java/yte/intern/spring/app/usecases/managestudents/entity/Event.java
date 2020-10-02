package yte.intern.spring.app.usecases.managestudents.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.spring.app.usecases.common.entity.BaseEntity;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "EVENT_SEQ")
public class Event extends BaseEntity {

    @Column(name = "TITLE")
    private String title;

    @Column(name = "EVENT_NUMBER", unique = true)
    private String eventNumber;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Column(name = "QUOTA")
    private Long quota;

    @Column(name = "QUESTIONS")
    @ElementCollection
    private List<String> questions;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "EVENT_ID", referencedColumnName = "ID")
    private Set<Person> persons;

    public boolean hasPerson(Person person) {
        return persons.stream().anyMatch(it -> it.getTcKimlikNo().equals(person.getTcKimlikNo()));
    }
}
