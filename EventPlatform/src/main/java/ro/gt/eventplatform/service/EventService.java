package ro.gt.eventplatform.service;

import org.springframework.stereotype.Service;
import ro.gt.eventplatform.model.Event;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EventService {
    private final List<Event> events = new ArrayList<>();

    public Event createEvent(Event event) {
        event.setId(UUID.randomUUID().toString());
        events.add(event);
        return event;
    }

    public List<Event> getAllEvents() {
        return new ArrayList<>(events);
    }

    public Optional<Event> getEventById(String id) {
        return events.stream().filter(event -> event.getId().equals(id)).findFirst();
    }

    public Optional<Event> updateEvent(String id, Event updatedEvent) {
        return getEventById(id).map(existingEvent -> {
            existingEvent.setTitle(updatedEvent.getTitle());
            existingEvent.setDescription(updatedEvent.getDescription());
            existingEvent.setDateTime(updatedEvent.getDateTime());
            existingEvent.setLocation(updatedEvent.getLocation());
            return existingEvent;
        });
    }

    public boolean deleteEvent(String id) {
        return events.removeIf(event -> event.getId().equals(id));
    }
}
