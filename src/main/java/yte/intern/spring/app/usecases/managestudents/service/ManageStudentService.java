package yte.intern.spring.app.usecases.managestudents.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.spring.app.usecases.common.MessageResponse;
import yte.intern.spring.app.usecases.common.MessageType;
import yte.intern.spring.app.usecases.managestudents.entity.Student;
import yte.intern.spring.app.usecases.managestudents.repository.StudentRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ManageStudentService {
    private final StudentRepository studentRepository;

    public List<Student> listAllStudents() {
        return studentRepository.findAll();
    }

    public MessageResponse addStudent(Student student) {
        studentRepository.save(student);
        return new MessageResponse("Öğrenci başarıyla eklendi.", MessageType.SUCCESS);
    }

    public Student getStudentByStudentNumber(String studentNumber) {
        return studentRepository.findByStudentNumber(studentNumber);
    }

    public MessageResponse updateStudent(String studentNumber, Student student) {
        Student fromDB = studentRepository.findByStudentNumber(studentNumber);
        if(fromDB != null){
            updateStudentFields(student, fromDB);
            studentRepository.save(fromDB);
            return new MessageResponse("Öğrenci başarıyla güncellendi.", MessageType.SUCCESS);
        }
        return new MessageResponse("Öğrenci güncellenemedi.", MessageType.ERROR);
    }

    private void updateStudentFields(Student student, Student fromDB) {
        fromDB.setName(student.getName());
        fromDB.setSurname(student.getSurname());
        fromDB.setStudentNumber(student.getStudentNumber());
    }

    public MessageResponse deleteStudent(String studentNumber) {
        studentRepository.deleteByStudentNumber(studentNumber);
        return new MessageResponse("Öğrenci başarıyla silindi.", MessageType.SUCCESS);
    }
}
