package yte.intern.spring.app.usecases.managestudents.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Builder
public class PersonDTO {
    @NotBlank(message = "İsim boş olamaz.")
    @Size(max = 255, message = "İsim 256 karakterden kısa olmalıdır.")
    private String name;

    @NotBlank(message = "Soyisim boş olamaz.")
    @Size(max = 255, message = "Soyisim 256 karakterden kısa olmalıdır.")
    private String surname;

    @NotBlank(message = "TC Kimlik No boş olamaz.")
    @Size(min = 11, max = 11, message = "TC Kimilk No 11 karakterden oluşmalıdır.")
    private String tcKimlikNo;

    @Email( message = "Email is not valid!")
    private String email;

    private List<String> answers;

    @JsonCreator
    public PersonDTO(
            @JsonProperty("name") String name,
            @JsonProperty("surname") String surname,
            @JsonProperty("tcKimlikNo") String tcKimlikNo,
            @JsonProperty("email") String email,
            @JsonProperty("answers") List<String> answers
    ) {
        this.name = name;
        this.surname = surname;
        this.tcKimlikNo = tcKimlikNo;
        this.email = email;
        this.answers = answers;
    }
}
