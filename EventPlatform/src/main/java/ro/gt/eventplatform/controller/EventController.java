package ro.gt.eventplatform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ro.gt.eventplatform.controller.DTO.Converter;
import ro.gt.eventplatform.controller.DTO.EventDTO;
import ro.gt.eventplatform.model.Event;
import ro.gt.eventplatform.service.CustomUserDetails;
import ro.gt.eventplatform.service.EventService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents(Authentication authentication) {
        List<Event> events = eventService.getAllEvents();
        List<EventDTO> eventsDTO = new ArrayList<>();

        if (events.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        for(Event event: events){
            eventsDTO.add(Converter.toDTO(event, userDetails.getId()));
        }
        return new ResponseEntity<>(eventsDTO, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasPermission(null, 'ADD_EVENT')")
    public ResponseEntity<EventDTO> createEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event);
        EventDTO eventDTO = Converter.toDTO(createdEvent, (long) -1);
        return new ResponseEntity<>(eventDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id, Authentication authentication) {
        Optional<Event> event = Optional.ofNullable(eventService.getEventById(id));
        if (event.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        EventDTO eventDTO = Converter.toDTO(event.get(), userDetails.getId());
        return new ResponseEntity<>(eventDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'DELETE_EVENT')")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        Event existingEvent = eventService.getEventById(id);
        if (existingEvent != null) {
            eventService.deleteEvent(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'UPDATE_EVENT')")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Event existingEvent = eventService.getEventById(id);
        if (existingEvent != null) {
            existingEvent.setTitle(updatedEvent.getTitle());
            existingEvent.setDescription(updatedEvent.getDescription());
            existingEvent.setLocation(updatedEvent.getLocation());
            existingEvent.setDateTime(updatedEvent.getDateTime());

            Event savedEvent = eventService.createEvent(existingEvent);
            EventDTO eventDTO = Converter.toDTO(savedEvent, (long) -1);
            return new ResponseEntity<>(eventDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/book/{eventId}")
    @PreAuthorize("hasPermission(null, 'BOOK_EVENT')")
    public ResponseEntity<String> bookEvent(@PathVariable Long eventId, Authentication authentication) {
        String username = authentication.getName();
        eventService.bookEvent(eventId, username);
        return ResponseEntity.ok("Event booked successfully");
    }
}
