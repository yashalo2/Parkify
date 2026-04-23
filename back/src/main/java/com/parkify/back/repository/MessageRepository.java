package com.parkify.back.repository;

import com.parkify.back.dto.MessageSendDTO;
import com.parkify.back.dto.UserDTO;
import com.parkify.back.model.Message;
import com.parkify.back.model.Role;
import com.parkify.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {
    List<Message> findByReceiver(User receiver);
@Query("""
 select new com.parkify.back.dto.MessageSendDTO(
 m.sender.id,
 m.receiver.id,
 m.content,
 m.date
 
 )
 from Message m
 where m.sender.id = :id or m.receiver.id = :id
""")
    List<MessageSendDTO> findMyMessages(@Param("id") long id);
@Query("""
 select new com.parkify.back.dto.UserDTO(
 m.sender.id,
 m.sender.firstName,
 m.sender.lastName,
 m.sender.email,
 m.sender.status,
 m.sender.userLevel
 
 )
 from Message m
 where m.sender.role = :role
 group by m.sender.id,
 m.sender.firstName,
 m.sender.lastName,
 m.sender.email,
 m.sender.status,
 m.sender.userLevel
 
 
""")
    List<UserDTO> findNeedyUsers(@Param("role") Role role);
    @Query("""
 select new com.parkify.back.dto.UserDTO(
 m.sender.id,
 m.sender.firstName,
 m.sender.lastName,
 m.sender.email,
 m.sender.status,
 m.sender.userLevel
 
 )
 from Message m
 where m.sender.role = :role and m.sender.email like %:search% or m.sender.firstName like %:search% or m.sender.lastName like %:search%
 group by m.sender.id,
 m.sender.firstName,
 m.sender.lastName,
 m.sender.email,
 m.sender.status,
 m.sender.userLevel
 
 
""")
    List<UserDTO> findNeedyUsersBySearch(@Param("search") String search,@Param("role")  Role role);

}
