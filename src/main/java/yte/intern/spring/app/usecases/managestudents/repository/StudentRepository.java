package yte.intern.spring.app.usecases.managestudents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.spring.app.usecases.managestudents.entity.Student;

import javax.transaction.Transactional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByStudentNumber(String studentNumber);

    @Transactional
    void deleteByStudentNumber(String studentNumber);
}
