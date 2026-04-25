package com.parkify.back.repository;

import com.parkify.back.model.PendingUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingUserRepository extends JpaRepository<PendingUser,Long> {
    boolean existsByEmail(String email);
    PendingUser findByEmail(String email);
}
