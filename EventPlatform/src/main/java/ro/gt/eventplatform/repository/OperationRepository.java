package ro.gt.eventplatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.gt.eventplatform.model.Operation;

public interface OperationRepository extends JpaRepository<Operation, String> {
}