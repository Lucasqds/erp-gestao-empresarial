package com.queiroz.backend.repository;

import com.queiroz.backend.entity.Empresa;
import com.queiroz.backend.entity.Fornecedor;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    Optional<Fornecedor> findByDocumento(String documento);

    @Query("SELECT ef.empresa FROM EmpresaFornecedor ef WHERE ef.fornecedor.id = :fornecedorId")
    List<Empresa> findEmpresasByFornecedorId(@Param("fornecedorId") Long fornecedorId);
}
