package com.parkify.back.repository;

import com.parkify.back.dto.AlertDTO;
import com.parkify.back.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert,Long> {
    @Query("""
select new com.parkify.back.dto.AlertDTO(
    a.id,
    a.content,
    a.created
)from Alert a
where a.user.id = :id
""")
    List<AlertDTO> getAllAlerts(@Param("id") long id);
}
