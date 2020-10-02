package yte.intern.spring.app.usecases.managestudents.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.spring.app.usecases.common.entity.BaseEntity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "BOOK_SEQ")
public class Book extends BaseEntity {

    @Column(name = "PUBLISH_DATE")
    private LocalDate publishDate;

    @Column(name = "PAGE_COUNT")
    private Long pageCount;
}
