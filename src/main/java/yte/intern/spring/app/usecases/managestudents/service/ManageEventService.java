package yte.intern.spring.app.usecases.managestudents.service;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import yte.intern.spring.app.usecases.common.helper.QRCodeHelper;
import yte.intern.spring.app.usecases.managestudents.entity.Event;
import yte.intern.spring.app.usecases.managestudents.entity.Person;
import yte.intern.spring.app.usecases.managestudents.repository.EventRepository;

import javax.imageio.ImageIO;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;

@Service
@RequiredArgsConstructor
public class ManageEventService {

    private final JavaMailSender mailSender;
    private final EventRepository eventRepository;

    public List<Event> listAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventByEventNumber(String eventNumber){
        return eventRepository.findByEventNumber(eventNumber).orElseThrow(EntityNotFoundException::new);
    }

    public Set<Person> getEventsPersons(String eventNumber){
        return eventRepository.findByEventNumber(eventNumber).map(Event::getPersons).orElseThrow(EntityNotFoundException::new);
    }

    public Event addEvent(Event event){
        return eventRepository.save(event);
    }

    @Transactional
    public Event updateEvent(String eventNumber, Event event){
        Optional<Event> optionalEvent = eventRepository.findByEventNumber(eventNumber);
        if (optionalEvent.isPresent()){
            updateEventFromDB(event, optionalEvent.get());
            return event;
        } else {
            throw new EntityNotFoundException();
        }
    }

    private void updateEventFromDB(Event event, Event eventFromDB) {
        eventFromDB.setTitle(event.getTitle());
        eventFromDB.setStartDate(event.getStartDate());
        eventFromDB.setEndDate(event.getEndDate());
        eventFromDB.setQuota(event.getQuota());
    }

    public void deleteEvent(String eventNumber){
        eventRepository.deleteByEventNumber(eventNumber);
    }

    public Person addPersonToEvent(String eventNumber, Person person){
        Optional<Event> optionalEvent = eventRepository.findByEventNumber(eventNumber);
        if (optionalEvent.isPresent()){
            Event event = optionalEvent.get();
            if( event.getQuota() <= 0){
                throw new IllegalStateException();
            }
            if (event.hasPerson(person)){
                throw new IllegalArgumentException();
            }
            Set<Person> persons = event.getPersons();
            persons.add(person);
            event.setQuota(event.getQuota()-1);
            Event savedEvent = eventRepository.save(event);
            try {
                sendMailWithAttachment(person, event);
            } catch (Exception e){
                e.printStackTrace();
            }
            return savedEvent.getPersons()
                    .stream()
                    .filter(it -> it.getTcKimlikNo().equals(person.getTcKimlikNo()))
                    .collect(toList())
                    .get(0);
        } else {
            throw new EntityNotFoundException();
        }
    }

    public boolean hasPerson( String eventNumber, Person person) {
        Optional<Event> optionalEvent = eventRepository.findByEventNumber(eventNumber);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            return event.hasPerson(person);
        }
        else {
            throw new EntityNotFoundException();
        }
    }

    public void deletePerson( String eventNumber, String tcKimlikNo){
        Optional<Event> optionalEvent = eventRepository.findByEventNumber(eventNumber);
        if (optionalEvent.isPresent()){
            Event event = optionalEvent.get();
            removePersonFromEvent(tcKimlikNo, event);
            event.setQuota(event.getQuota()+1);
            eventRepository.save(event);
        }
    }

    private void removePersonFromEvent(String tcKimlikNo, Event event) {
        Set<Person> selectedPersons = event.getPersons().stream().filter(it -> !it.getTcKimlikNo().equals(tcKimlikNo)).collect(toSet());
        event.getPersons().clear();
        event.getPersons().addAll(selectedPersons);
    }

    public Set<Person> listAllPersons( String eventNumber){
        Optional<Event> optionalEvent = eventRepository.findByEventNumber(eventNumber);
        if (optionalEvent.isPresent()){
            return optionalEvent.get().getPersons();
        } else {
            throw new EntityNotFoundException();
        }
    }

    public Person getPerson(String eventNumber, String tcKimlikNo){
        Optional<Event> optionalEvent = eventRepository.findByEventNumber(eventNumber);
        if (optionalEvent.isPresent()){
            Event event = optionalEvent.get();
            Set<Person> personSet =  event.getPersons();
            Optional<Person> optionalPerson = personSet.stream().filter( it -> it.getTcKimlikNo().equals(tcKimlikNo)).findAny();
            if(optionalPerson.isPresent()){
                return optionalPerson.get();
            } else {
                throw new EntityNotFoundException();
            }
        } else {
            throw new EntityNotFoundException();
        }
    }

    public String addQuestion(String eventNumber, String question) {
        Optional<Event> eventOptional = eventRepository.findByEventNumber(eventNumber);
        if(eventOptional.isPresent()) {
            Event event = eventOptional.get();
            List<String> questions = event.getQuestions();
            questions.add(question);
            eventRepository.save(event);
            return question;
        }
        else
            throw new EntityNotFoundException();
    }

    public List<String> getQuestions(String eventNumber) {
        Optional<Event> eventOptional = eventRepository.findByEventNumber(eventNumber);
        if(eventOptional.isPresent()) {
            Event event = eventOptional.get();
            List<String> questions = event.getQuestions();
            return questions;
        }
        else
            throw new EntityNotFoundException();
    }

    private void sendMail(Person person, Event event) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);

        try {
            String text = "Sayın " + person.getName() + " " + person.getSurname() + ",\n"
                    + event.getStartDate() + " - " + event.getEndDate()
                    + " tarihleri arasında gerçekleşecek " + event.getTitle() + " etkinliğine katılımınız başarıyla tamamlandı.";
            messageHelper.setFrom("osmanbaturince2@gmail.com");
            messageHelper.setTo(person.getEmail());
            messageHelper.setText(text);
            messageHelper.setSubject("Etkinliğe Katılımınız Onaylandı! - TÜBİTAK BİLGEM YTE");
            System.out.println(text);
        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
        mailSender.send(mimeMessage);
    }

    public void sendMailWithAttachment(Person person, Event event) throws Exception {

        MimeMessage mimeMessage= mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        try {
            BufferedImage bufferedImage = QRCodeHelper.generateQRCodeImage(event.getEventNumber() + "\t" + event.getTitle() + "\n"
                                                                                      + event.getPersons() + "\t" + event.getQuota() + "\n"
                                                                                        + event.getStartDate() + "\t" + event.getEndDate() + "\n");
        String start = "<div><strong>Sayın " + person.getName() + " " + person.getSurname() + ",<strong>";
        String date = "<div>"+event.getStartDate() + " - " + event.getEndDate()
                + " tarihleri arasında gerçekleşecek</div>";
        String title = "<div>" + event.getTitle() + " etkinliğine katılımınız başarıyla tamamlandı.</div>";

        helper.setText(
                "<html>"
                        + "<body>"
                        + "<div><strong>Karekod:</strong></div>"
                        + "<div>"
                        + "<img src='cid:rightSideImage' style='float:right;width:250px;height:250px;'/>"
                        + start
                        + date
                        + title
                        + "</div>"
                        + "<div>"
                        + "<img src='cid:leftSideImage' style='float:left;width:250px;height:250px;'/>"
                        + "<div><strong>TÜBİTAK BİLGEM YTE</strong></div>"
                        + "</div>"
                        + "<div>Teşekkürler,</div>"
                        + "Osman Batur İnce"
                        + "</div></body>"
                        + "</html>", true);
        helper.setFrom("osmanbaturince2@gmail.com");
        helper.setTo(person.getEmail());
        helper.setSubject("Etkinliğe Katılımınız Onaylandı! - TÜBİTAK BİLGEM YTE");

        File outputfile = new File("C:/Users/osmanbatur/spring-tutorials/app/src/main/webapp/public/QRCode.jpg");
        ImageIO.write(bufferedImage, "jpg", outputfile);
        helper.addInline("rightSideImage",
                outputfile);

        Resource res = new FileSystemResource(new File("C:/Users/osmanbatur/logo.png"));
        helper.addInline("leftSideImage",
                res);


        } catch (MessagingException | IOException m){
            System.out.println(m.getMessage());
        } catch (Exception e){
            e.printStackTrace();
        }

        mailSender.send(mimeMessage);
    }


}
