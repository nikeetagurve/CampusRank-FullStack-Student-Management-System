package com.campusrank.repository;
import com.campusrank.model.StudentProfile;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;
public interface StudentRepository extends JpaRepository<StudentProfile,Long> {
 Optional<StudentProfile> findByUserId(Long userId);
 @EntityGraph(attributePaths={"user"}) Page<StudentProfile> findAll(Pageable pageable);
 @EntityGraph(attributePaths={"user"}) @Query("select s from StudentProfile s order by s.totalPoints desc, s.user.fullName asc") Page<StudentProfile> leaderboard(Pageable pageable);
}
