package com.queiroz.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@Service
public class CepService {

    @Value("${api.cep.url}")
    private String apiUrl;

    public boolean validarCep(String cep) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    apiUrl + cep + "/json", HttpMethod.GET, entity, String.class

            );

            return response.getStatusCode().is2xxSuccessful() && response.hasBody() && !response.getBody().isEmpty();
        } catch (Exception e) {
            return false;
        }
    }
}
