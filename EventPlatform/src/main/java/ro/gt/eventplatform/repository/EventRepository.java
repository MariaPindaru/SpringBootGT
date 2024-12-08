package ro.gt.eventplatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.gt.eventplatform.model.Event;
public interface EventRepository extends JpaRepository<Event, Long> {
}