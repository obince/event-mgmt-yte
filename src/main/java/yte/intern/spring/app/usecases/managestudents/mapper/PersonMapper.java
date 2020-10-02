package yte.intern.spring.app.usecases.managestudents.mapper;

import org.mapstruct.Mapper;
import yte.intern.spring.app.usecases.managestudents.dto.PersonDTO;
import yte.intern.spring.app.usecases.managestudents.entity.Person;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PersonMapper {
    PersonDTO mapToDto(Person person);

    Person mapToEntity(PersonDTO personDTO);

    List<PersonDTO> mapToDto(List<Person> personList);

    List<Person> mapToEntity(List<PersonDTO> personDTOList);
}
