package com.queiroz.backend.DTO;

import com.queiroz.backend.entity.Fornecedor;
import java.time.LocalDate;

public class FornecedorDTO {

    private Long id;
    private String documento;
    private String nome;
    private String email;
    private String cep;
    private String rg;
    private LocalDate dataNascimento;

    public FornecedorDTO(Fornecedor fornecedor) {
        this.id = fornecedor.getId();
        this.documento = fornecedor.getDocumento();
        this.nome = fornecedor.getNome();
        this.email = fornecedor.getEmail();
        this.cep = fornecedor.getCep();
        this.rg = fornecedor.getRg();
        this.dataNascimento = fornecedor.getDataNascimento();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
}
