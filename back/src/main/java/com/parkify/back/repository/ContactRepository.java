package com.parkify.back.repository;

import com.parkify.back.dto.ContactDTO;
import com.parkify.back.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Long> {
    @Query("""
select new com.parkify.back.dto.ContactDTO(
c.name,
c.email,
c.created,
c.message,
c.replied

)
from Contact c
""")
    List<ContactDTO> findAllMessage();
}
