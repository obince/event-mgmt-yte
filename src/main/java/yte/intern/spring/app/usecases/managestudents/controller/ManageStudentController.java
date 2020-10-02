package yte.intern.spring.app.usecases.managestudents.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yte.intern.spring.app.usecases.managestudents.dto.StudentDTO;
import yte.intern.spring.app.usecases.managestudents.entity.Student;
import yte.intern.spring.app.usecases.managestudents.mapper.StudentMapper;
import yte.intern.spring.app.usecases.managestudents.service.ManageStudentService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/students")
public class ManageStudentController {

    private final StudentMapper studentMapper;
    private final ManageStudentService manageStudentService;

    @GetMapping
    public List<StudentDTO> listAllStudents() {
        List<Student> students = manageStudentService.listAllStudents();
        return studentMapper.mapToDto(students);
    }

    @GetMapping("/{studentNumber}")
    public StudentDTO getStudentByStudentNumber(@PathVariable String studentNumber){
        Student student = manageStudentService.getStudentByStudentNumber(studentNumber);
        return studentMapper.mapToDto(student);
    }

    @PostMapping
    public void addStudent(@RequestBody StudentDTO studentDTO) {
        Student student = studentMapper.mapToEntity(studentDTO);
        manageStudentService.addStudent(student);
    }

    @PutMapping("/{studentNumber}")
    public void updateStudent( @PathVariable String studentNumber, @RequestBody StudentDTO studentDTO){
        Student student = studentMapper.mapToEntity(studentDTO);
        manageStudentService.updateStudent(studentNumber, student);
    }

    @DeleteMapping("/{studentNumber}")
    public void deleteStudentByStudentNumber( @PathVariable String studentNumber){
        manageStudentService.deleteStudent(studentNumber);
    }
}
