package com.parkify.back.repository;
import com.parkify.back.model.Role;
import com.parkify.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
    User findByRole(Role role);
    User findMeById(int id);


}
