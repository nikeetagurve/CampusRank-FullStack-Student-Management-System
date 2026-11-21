package com.campusrank.repository;
import com.campusrank.model.PointTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface PointTransactionRepository extends JpaRepository<PointTransaction,Long> {
 Page<PointTransaction> findByStudentIdOrderByCreatedAtDesc(Long studentId, Pageable pageable);
}
