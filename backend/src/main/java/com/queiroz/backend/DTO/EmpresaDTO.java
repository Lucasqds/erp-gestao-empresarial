package com.queiroz.backend.DTO;

import com.queiroz.backend.entity.Empresa;

import java.util.Set;
import java.util.stream.Collectors;

public class EmpresaDTO {
    private Long id;
    private String cnpj;
    private String nomeFantasia;
    private String cep;
    private Set<Long> fornecedores;
    public EmpresaDTO(Empresa empresa) {
        this.id = empresa.getId();
        this.cnpj = empresa.getCnpj();
        this.nomeFantasia = empresa.getNomeFantasia();
        this.cep = empresa.getCep();
        this.fornecedores = empresa.getEmpresaFornecedores()
                .stream()
                .map(empresaFornecedor -> empresaFornecedor.getFornecedor().getId())
                .collect(Collectors.toSet());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public Set<Long> getFornecedores() {
        return fornecedores;
    }

    public void setFornecedores(Set<Long> fornecedores) {
        this.fornecedores = fornecedores;
    }
}
