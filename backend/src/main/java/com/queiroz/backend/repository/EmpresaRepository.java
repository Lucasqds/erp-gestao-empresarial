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
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByCnpj(String cnpj);

    @Query("SELECT ef.fornecedor FROM EmpresaFornecedor ef WHERE ef.empresa.id = :empresaId")
    List<Fornecedor> findFornecedoresByEmpresaId(@Param("empresaId") Long empresaId);

}