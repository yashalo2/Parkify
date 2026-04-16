package com.parkify.back.repository;

import com.parkify.back.dto.BookDTO;
import com.parkify.back.model.Spots;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpotsRepository extends JpaRepository<Spots, Long> {

    @Query("""
select new com.parkify.back.dto.BookDTO(
 s.id,
 p.name,
 l.price,
 l.level,
 s.spotName
)
from Spots s
join s.parkingLots l
join l.parkingArea p
where s.id = :id
""")
    List<BookDTO> getBooks(@Param("id") long id);
}
