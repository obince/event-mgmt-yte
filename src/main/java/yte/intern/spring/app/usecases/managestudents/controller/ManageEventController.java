package yte.intern.spring.app.usecases.managestudents.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.spring.app.usecases.common.helper.QRCodeHelper;
import yte.intern.spring.app.usecases.managestudents.dto.EventDTO;
import yte.intern.spring.app.usecases.managestudents.dto.PersonDTO;
import yte.intern.spring.app.usecases.managestudents.entity.Event;
import yte.intern.spring.app.usecases.managestudents.entity.Person;
import yte.intern.spring.app.usecases.managestudents.mapper.EventMapper;
import yte.intern.spring.app.usecases.managestudents.mapper.PersonMapper;
import yte.intern.spring.app.usecases.managestudents.service.ManageEventService;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/event")
@Validated
public class ManageEventController {
    private final EventMapper eventMapper;
    private final PersonMapper personMapper;
    private final ManageEventService manageEventService;

    @GetMapping
    public List<EventDTO> listAllEvents() {
        List<Event> event = manageEventService.listAllEvents();
        return eventMapper.mapToDto(event);
    }

    @GetMapping("/{eventNumber}")
    public EventDTO getEventById(@PathVariable String eventNumber){
        Event activity = manageEventService.getEventByEventNumber(eventNumber);
        return eventMapper.mapToDto(activity);
    }

    @PostMapping
    public EventDTO addEvent(@Valid @RequestBody EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        Event addedEvent = manageEventService.addEvent(event);
        return eventMapper.mapToDto(addedEvent);
    }

    @PutMapping("/{eventNumber}")
    public EventDTO updateEvent(@PathVariable String eventNumber, @Valid @RequestBody EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        Event updatedEvent = manageEventService.updateEvent(eventNumber, event);
        return eventMapper.mapToDto(updatedEvent);
    }

    @DeleteMapping("/{eventNumber}")
    public void deleteEvent(@PathVariable String eventNumber) {
        manageEventService.deleteEvent(eventNumber);
    }

    @GetMapping("/{eventNumber}/personno")
    public int getActivitiesPersonNo(@PathVariable String eventNumber) {
        return manageEventService.getEventsPersons(eventNumber).size();
    }

    @GetMapping("/{eventNumber}/persons")
    public List<PersonDTO> getEventsPersons(@PathVariable String eventNumber) {
        Set<Person> eventsPersons = manageEventService.getEventsPersons(eventNumber);
        return personMapper.mapToDto(new ArrayList<>(eventsPersons));
    }

    @PostMapping("/{eventNumber}/persons")
    public PersonDTO addPersonToEvent(@PathVariable String eventNumber, @RequestBody @Valid PersonDTO personDTO) {
        return personMapper.mapToDto(manageEventService.addPersonToEvent(eventNumber, personMapper.mapToEntity(personDTO)));
    }

    @PostMapping("/{eventNumber}/hasPerson")
    public boolean hasPerson(@PathVariable String eventNumber, @RequestBody @Valid PersonDTO personDTO) {
        return manageEventService.hasPerson(eventNumber, personMapper.mapToEntity(personDTO));
    }

    @DeleteMapping("/{eventNumber}/persons/{personName}")
    public void deletePerson(@PathVariable String eventNumber, @PathVariable String personName) {
        manageEventService.deletePerson(eventNumber, personName);
    }

    @PostMapping("/{eventNumber}/questions")
    public String addQuestion(@PathVariable String eventNumber, @RequestBody String question) {
        return manageEventService.addQuestion( eventNumber,question);
    }

    @GetMapping("/{eventNumber}/questions")
    public List<String> getQuestions(@PathVariable String eventNumber) {
        return manageEventService.getQuestions( eventNumber);
    }

}
