package com.queiroz.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.HashSet;
import java.util.Set;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "empresas")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String cnpj;

    @Column(nullable = false)
    private String nomeFantasia;

    @Column(nullable = false)
    private String cep;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<EmpresaFornecedor> empresaFornecedores = new HashSet<>();

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

    public Set<EmpresaFornecedor> getEmpresaFornecedores() {
        return empresaFornecedores;
    }

    public void setEmpresaFornecedores(Set<EmpresaFornecedor> empresaFornecedores) {
        this.empresaFornecedores = empresaFornecedores;
    }
    public Set<Fornecedor> getFornecedores() {
        Set<Fornecedor> fornecedores = new HashSet<>();
        for (EmpresaFornecedor empresaFornecedor : empresaFornecedores) {
            fornecedores.add(empresaFornecedor.getFornecedor());
        }
        return fornecedores;
    }

}
