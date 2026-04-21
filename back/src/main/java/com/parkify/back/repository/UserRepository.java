package com.parkify.back.repository;
import com.parkify.back.dto.UserDTO;
import com.parkify.back.model.Role;
import com.parkify.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
    User findByRole(Role role);
    User findMeById(long id);

    @Query("""
 select new com.parkify.back.dto.UserDTO(
 u.id,
 u.firstName,
 u.lastName,
 u.email,
 u.status,
 u.userLevel
 
 )
 from User u
 
""")
    List<UserDTO> findAllUserDTO();
    @Query("""
select new com.parkify.back.dto.UserDTO(
u.id,
 u.firstName,
 u.lastName,
 u.email,
 u.status,
 u.userLevel
)
from User u
where u.firstName like %:search% or u.lastName like %:search% or u.email like %:search%
""")
    List<UserDTO> search(@Param("search") String search);

}
