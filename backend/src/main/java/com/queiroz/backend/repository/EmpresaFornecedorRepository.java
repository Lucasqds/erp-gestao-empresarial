package com.queiroz.backend.repository;

import com.queiroz.backend.entity.EmpresaFornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaFornecedorRepository extends JpaRepository<EmpresaFornecedor, Long> {
}
