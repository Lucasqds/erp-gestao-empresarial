package com.queiroz.backend.controller;

import com.queiroz.backend.DTO.EmpresaDTO;
import com.queiroz.backend.DTO.FornecedorDTO;
import com.queiroz.backend.entity.Empresa;
import com.queiroz.backend.service.EmpresaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {
    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaDTO> getById(@PathVariable Long id) {
        try {
            Optional<Empresa> empresa = empresaService.findById(id);
            return empresa.map(value -> ResponseEntity.ok(new EmpresaDTO(value)))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar empresa", e);
        }
    }

    @GetMapping
    public ResponseEntity<List<EmpresaDTO>> getAll() {
        try {
            List<EmpresaDTO> empresas = empresaService.findAll().stream()
                    .map(EmpresaDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(empresas);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar empresas", e);
        }
    }

    @GetMapping("/{id}/fornecedores")
    public ResponseEntity<List<FornecedorDTO>> getFornecedoresByEmpresaId(@PathVariable Long id) {
        try {
            List<FornecedorDTO> fornecedores = empresaService.findFornecedoresByEmpresaId(id)
                    .stream()
                    .map(FornecedorDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(fornecedores);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar fornecedores da empresa", e);
        }
    }

    @PostMapping
    public ResponseEntity<EmpresaDTO> create(@RequestBody Map<String, Object> request) {
        try {
            Empresa empresa = new Empresa();
            empresa.setCnpj((String) request.get("cnpj"));
            empresa.setNomeFantasia((String) request.get("nomeFantasia"));
            empresa.setCep((String) request.get("cep"));

            List<?> fornecedoresRaw = (List<?>) request.get("fornecedores");
            Set<Long> fornecedoresIds = fornecedoresRaw.stream()
                    .map(fornecedor -> Long.valueOf(fornecedor.toString()))
                    .collect(Collectors.toSet());

            Empresa novaEmpresa = empresaService.save(empresa, fornecedoresIds);
            return ResponseEntity.status(HttpStatus.CREATED).body(new EmpresaDTO(novaEmpresa));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar empresa", e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaDTO> update(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        try {
            Optional<Empresa> empresaOptional = empresaService.findById(id);

            if (empresaOptional.isPresent()) {
                Empresa empresa = empresaOptional.get();
                empresa.setCnpj((String) request.get("cnpj"));
                empresa.setNomeFantasia((String) request.get("nomeFantasia"));
                empresa.setCep((String) request.get("cep"));

                List<?> fornecedoresRaw = (List<?>) request.get("fornecedores");
                Set<Long> fornecedoresIds = fornecedoresRaw.stream()
                        .map(fornecedor -> Long.valueOf(fornecedor.toString()))
                        .collect(Collectors.toSet());

                Empresa empresaAtualizada = empresaService.save(empresa, fornecedoresIds);
                return ResponseEntity.ok(new EmpresaDTO(empresaAtualizada));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar empresa", e);
        }
    }

    @PutMapping("/{id}/adicionar-fornecedores")
    public ResponseEntity<EmpresaDTO> adicionarFornecedores(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        try {
            Set<Long> fornecedoresIds = ((List<?>) request.get("fornecedores")).stream()
                    .map(fornecedor -> Long.valueOf(fornecedor.toString()))
                    .collect(Collectors.toSet());

            Empresa empresaAtualizada = empresaService.adicionarFornecedores(id, fornecedoresIds);
            return ResponseEntity.ok(new EmpresaDTO(empresaAtualizada));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao adicionar fornecedores à empresa", e);
        }
    }

    @DeleteMapping("/{empresaId}/remover-fornecedor/{fornecedorId}")
    public ResponseEntity<EmpresaDTO> removerFornecedor(@PathVariable Long empresaId, @PathVariable Long fornecedorId) {
        try {
            Empresa empresaAtualizada = empresaService.removerFornecedor(empresaId, fornecedorId);
            return ResponseEntity.ok(new EmpresaDTO(empresaAtualizada));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao remover fornecedor da empresa", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            empresaService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao excluir empresa", e);
        }
    }
}
