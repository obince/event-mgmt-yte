package yte.intern.spring.app.usecases.managestudents.mapper;

import org.mapstruct.Mapper;
import yte.intern.spring.app.usecases.managestudents.dto.EventDTO;
import yte.intern.spring.app.usecases.managestudents.entity.Event;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventMapper {
    public EventDTO mapToDto(Event event);

    public Event mapToEntity(EventDTO eventDTO);

    public List<EventDTO> mapToDto(List<Event> eventList);

    public List<Event> mapToEntity(List<EventDTO> eventDTOList);
}
