package com.queiroz.backend.controller;

import com.queiroz.backend.DTO.EmpresaDTO;
import com.queiroz.backend.DTO.FornecedorDTO;
import com.queiroz.backend.entity.Fornecedor;
import com.queiroz.backend.service.FornecedorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/fornecedores")
public class FornecedorController {

    private final FornecedorService fornecedorService;

    public FornecedorController(FornecedorService fornecedorService) {
        this.fornecedorService = fornecedorService;
    }

    @GetMapping
    public List<FornecedorDTO> getAll() {
        try {
            return fornecedorService.findAll().stream()
                    .map(FornecedorDTO::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar fornecedores: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public FornecedorDTO getById(@PathVariable Long id) {
        try {
            Optional<Fornecedor> fornecedor = fornecedorService.findById(id);
            if (fornecedor.isPresent()) {
                return new FornecedorDTO(fornecedor.get());
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado");
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar fornecedor com ID " + id + ": " + e.getMessage());
        }
    }

    @GetMapping("/{id}/empresas")
    public List<EmpresaDTO> getEmpresasDoFornecedor(@PathVariable Long id) {
        try {
            return fornecedorService.findEmpresasByFornecedorId(id).stream()
                    .map(EmpresaDTO::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar empresas do fornecedor", e);
        }
    }

    @PostMapping
    public FornecedorDTO create(@RequestBody Fornecedor fornecedor) {
        try {
            Fornecedor createdFornecedor = fornecedorService.save(fornecedor);
            return new FornecedorDTO(createdFornecedor);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar fornecedor: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public FornecedorDTO update(@PathVariable Long id, @RequestBody Fornecedor fornecedor) {
        try {
            Fornecedor updatedFornecedor = fornecedorService.update(id, fornecedor);
            return new FornecedorDTO(updatedFornecedor);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar fornecedor", e);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        try {
            fornecedorService.delete(id);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao excluir fornecedor com ID " + id + ": " + e.getMessage());
        }
    }
}
