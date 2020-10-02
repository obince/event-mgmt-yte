package yte.intern.spring.app.usecases.managestudents.mapper;

import org.mapstruct.Mapper;
import yte.intern.spring.app.usecases.managestudents.dto.StudentDTO;
import yte.intern.spring.app.usecases.managestudents.entity.Student;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudentMapper {

    StudentDTO mapToDto(Student student);

    Student mapToEntity(StudentDTO studentDTO);

    List<StudentDTO> mapToDto(List<Student> studentList);

    List<Student> mapToEntity(List<StudentDTO> studentDTOList);
}