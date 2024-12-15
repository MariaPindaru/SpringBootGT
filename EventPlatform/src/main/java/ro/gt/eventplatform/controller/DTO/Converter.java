package ro.gt.eventplatform.controller.DTO;

import ro.gt.eventplatform.model.Event;
import ro.gt.eventplatform.model.User;

import java.util.Objects;

public class Converter {
    public static EventDTO toDTO(Event event, Long userID){
        EventDTO eventDTO = new EventDTO();
        eventDTO.setId(event.getId());
        eventDTO.setDescription(event.getDescription());
        eventDTO.setTitle(event.getTitle());
        eventDTO.setLocation(event.getLocation());
        eventDTO.setDateTime(event.getDateTime());

        for(User user: event.getUsers()){
            if (Objects.equals(user.getId(), userID)){
                eventDTO.setBooked(true);
            }
        }

        return eventDTO;
    }

}
