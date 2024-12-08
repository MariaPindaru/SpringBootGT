package ro.gt.eventplatform.model;

import java.time.LocalDateTime;

public class Event {
    private String id;
    private String title;
    private String description;
    private LocalDateTime dateTime;
    private String location;

    public Event() {}

    public Event(String id, String title, String description, LocalDateTime dateTime, String location) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.location = location;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
