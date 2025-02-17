package com.queiroz.backend.service;

import com.queiroz.backend.entity.Empresa;
import com.queiroz.backend.entity.Fornecedor;
import com.queiroz.backend.repository.FornecedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FornecedorService {
    private final FornecedorRepository fornecedorRepository;

    public FornecedorService(FornecedorRepository fornecedorRepository) {
        this.fornecedorRepository = fornecedorRepository;
    }

    public List<Fornecedor> findAll() {
        return fornecedorRepository.findAll();
    }

    public Optional<Fornecedor> findById(Long id) {
        return fornecedorRepository.findById(id);
    }

    public Fornecedor save(Fornecedor fornecedor) {
        return fornecedorRepository.save(fornecedor);
    }

    public void delete(Long id) {
        fornecedorRepository.deleteById(id);
    }

    public List<Empresa> findEmpresasByFornecedorId(Long fornecedorId) {
        return fornecedorRepository.findEmpresasByFornecedorId(fornecedorId);
    }

    public Fornecedor update(Long id, Fornecedor fornecedor) {
        Optional<Fornecedor> fornecedorExistente = fornecedorRepository.findById(id);
        if (fornecedorExistente.isPresent()) {
            Fornecedor fornecedorAtualizado = fornecedorExistente.get();
            fornecedorAtualizado.setNome(fornecedor.getNome());
            fornecedorAtualizado.setDocumento(fornecedor.getDocumento());
            fornecedorAtualizado.setEmail(fornecedor.getEmail());
            fornecedorAtualizado.setCep(fornecedor.getCep());
            fornecedorAtualizado.setRg(fornecedor.getRg());
            fornecedorAtualizado.setDataNascimento(fornecedor.getDataNascimento());
            return fornecedorRepository.save(fornecedorAtualizado);
        } else {
            throw new RuntimeException("Fornecedor não encontrado com ID: " + id);
        }
    }
}