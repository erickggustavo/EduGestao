package com.dti.sistema_notas.repository; // <-- O segredo está nesta linha!

import com.dti.sistema_notas.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}