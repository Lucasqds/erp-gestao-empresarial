package com.queiroz.backend.service;

import com.queiroz.backend.entity.Empresa;
import com.queiroz.backend.entity.EmpresaFornecedor;
import com.queiroz.backend.entity.Fornecedor;
import com.queiroz.backend.repository.EmpresaFornecedorRepository;
import com.queiroz.backend.repository.EmpresaRepository;
import com.queiroz.backend.repository.FornecedorRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EmpresaService {
    private final EmpresaRepository empresaRepository;
    private final FornecedorRepository fornecedorRepository;
    private final EmpresaFornecedorRepository empresaFornecedorRepository;
    private final CepService cepService;

    public EmpresaService(EmpresaRepository empresaRepository,
                          FornecedorRepository fornecedorRepository,
                          EmpresaFornecedorRepository empresaFornecedorRepository,
                          CepService cepService) {
        this.empresaRepository = empresaRepository;
        this.fornecedorRepository = fornecedorRepository;
        this.empresaFornecedorRepository = empresaFornecedorRepository;
        this.cepService = cepService;
    }

    public List<Empresa> findAll() {
        return empresaRepository.findAll();
    }

    public Optional<Empresa> findById(Long id) {
        return empresaRepository.findById(id);
    }

    public Empresa save(Empresa empresa, Set<Long> fornecedoresIds) {
        if (!cepService.validarCep(empresa.getCep())) {
            throw new RuntimeException("CEP inválido!");
        }

        Empresa empresaSalva = empresaRepository.save(empresa);

        Set<EmpresaFornecedor> empresaFornecedores = new HashSet<>();
        for (Long fornecedorId : fornecedoresIds) {
            Optional<Fornecedor> fornecedorOptional = fornecedorRepository.findById(fornecedorId);
            fornecedorOptional.ifPresent(fornecedor -> {
                EmpresaFornecedor empresaFornecedor = new EmpresaFornecedor();
                empresaFornecedor.setEmpresa(empresaSalva);
                empresaFornecedor.setFornecedor(fornecedor);
                empresaFornecedores.add(empresaFornecedor);
            });
        }

        empresaFornecedorRepository.saveAll(empresaFornecedores);
        return empresaSalva;
    }

    public Empresa update(Long id, Empresa empresa, Set<Long> fornecedoresIds) {
        Optional<Empresa> empresaOptional = empresaRepository.findById(id);

        if (empresaOptional.isPresent()) {
            Empresa empresaExistente = empresaOptional.get();

            if (!cepService.validarCep(empresa.getCep())) {
                throw new RuntimeException("CEP inválido!");
            }


            empresaExistente.setCnpj(empresa.getCnpj());
            empresaExistente.setNomeFantasia(empresa.getNomeFantasia());
            empresaExistente.setCep(empresa.getCep());


            Set<EmpresaFornecedor> empresaFornecedores = new HashSet<>();
            for (Long fornecedorId : fornecedoresIds) {
                Optional<Fornecedor> fornecedorOptional = fornecedorRepository.findById(fornecedorId);
                fornecedorOptional.ifPresent(fornecedor -> {
                    EmpresaFornecedor empresaFornecedor = new EmpresaFornecedor();
                    empresaFornecedor.setEmpresa(empresaExistente);
                    empresaFornecedor.setFornecedor(fornecedor);
                    empresaFornecedores.add(empresaFornecedor);
                });
            }

            empresaFornecedorRepository.saveAll(empresaFornecedores);
            return empresaRepository.save(empresaExistente);
        } else {
            throw new RuntimeException("Empresa não encontrada");
        }
    }

    public List<Fornecedor> findFornecedoresByEmpresaId(Long empresaId) {
        return empresaRepository.findFornecedoresByEmpresaId(empresaId);
    }

    public Empresa adicionarFornecedores(Long empresaId, Set<Long> fornecedoresIds) {
        Optional<Empresa> empresaOptional = empresaRepository.findById(empresaId);
        if (empresaOptional.isEmpty()) {
            throw new RuntimeException("Empresa não encontrada");
        }
        Empresa empresa = empresaOptional.get();

        Set<EmpresaFornecedor> empresaFornecedores = new HashSet<>();
        for (Long fornecedorId : fornecedoresIds) {
            Optional<Fornecedor> fornecedorOptional = fornecedorRepository.findById(fornecedorId);
            fornecedorOptional.ifPresent(fornecedor -> {
                EmpresaFornecedor empresaFornecedor = new EmpresaFornecedor();
                empresaFornecedor.setEmpresa(empresa);
                empresaFornecedor.setFornecedor(fornecedor);
                empresaFornecedores.add(empresaFornecedor);
            });
        }

        empresaFornecedorRepository.saveAll(empresaFornecedores);
        return empresa;
    }

    @Transactional
    public Empresa removerFornecedor(Long empresaId, Long fornecedorId) {
        Optional<Empresa> empresaOpt = empresaRepository.findById(empresaId);

        if (empresaOpt.isPresent()) {
            Empresa empresa = empresaOpt.get();

            empresa.getEmpresaFornecedores().removeIf(empresaFornecedor ->
                    empresaFornecedor.getFornecedor().getId().equals(fornecedorId)
            );

            return empresaRepository.save(empresa);
        } else {
            throw new RuntimeException("Empresa não encontrada com ID: " + empresaId);
        }
    }

    public void delete(Long id) {
        empresaRepository.deleteById(id);
    }
}
