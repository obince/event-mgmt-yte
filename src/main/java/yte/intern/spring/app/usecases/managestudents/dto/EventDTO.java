package yte.intern.spring.app.usecases.managestudents.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class EventDTO {

    @NotBlank(message = "UYARI! - Etkinliğin ismi boş olamaz.")
    @Size(max = 255, message = "UYARI! - Etkinliğin ismi 255 karakterden fazla olamaz.")
    private String title;

    @NotBlank(message = "UYARI! - Etkinliğin numarası boş olamaz.")
    @Size(max = 32, message = "UYARI! - Etkinliğin ismi 32 karakterden fazla olamaz.")
    private String eventNumber;

    @Future( message = "UYARI! - Etkinliğin başlangıç tarihi bugünden önce olamaz.")
    private LocalDate startDate;

    @Future(message = "UYARI! - Etkinliğin bitiş tarihi bugünden önce olamaz.")
    private LocalDate endDate;

    @Min(value = 1, message = "UYARI! - Etkinliğin kotası 1'den az olamaz.")
    @Max(value = 100, message = "UYARI! - Etkinliğin kotası 100'den fazla olamaz.")
    private Long quota;

    private List<String> questions;

    @AssertTrue( message = "UYARI! - Bitiş tarihi başlangıç tarihinden önce olamaz.")
    public boolean isAfter(){
        return endDate.isAfter(startDate);
    }

    @JsonCreator
    public EventDTO(@JsonProperty("title") String title,
                    @JsonProperty("eventNumber") String eventNumber,
                    @JsonProperty("startDate") LocalDate startDate,
                    @JsonProperty("endDate") LocalDate endDate,
                    @JsonProperty("quota") Long quota,
                    @JsonProperty("questions") List<String> questions) {
        this.title = title;
        this.eventNumber = eventNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.quota = quota;
        this.questions = questions;
    }
}
