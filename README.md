# ERP - Gestão Empresarial
Bem-vindo ao ERP - Gestão Empresarial, um sistema desenvolvido para gerenciar empresas e fornecedores de forma eficiente.

## Tecnologias Utilizadas

### Backend:
- Java Spring Boot (Framework backend)
- Spring Data JPA (Persistência de dados)
- Lombok (Redução de boilerplate)
- MySQL (Banco de dados relacional)
- Flyway (Migrations)

### Frontend:
- Angular (Framework frontend)
- Bootstrap (Estilização e responsividade)
- RxJS (Gerenciamento reativo)

## Versões Utilizadas
- Java: 17
- Angular: 19
- Node.js: 22

## Como Rodar o Projeto


### Clonar o Repositório
```bash
git clone https://github.com/Lucasqds/erp-gestao-empresarial.git
cd erp-gestao-empresarial
```

### Configurar o Backend
Se preferir, abra o projeto com o IntelliJ:

- Rode os comandos para limpar e instalar as dependências:
```bash
mvn clean
mvn install
```

- Configure o arquivo `application.properties` com as suas credenciais do banco de dados MySQL:
```properties
spring.datasource.username=seuUsername
spring.datasource.password=suaSenha
```

- Após isso, abra o arquivo `BackendApplication.java` no IntelliJ e execute-o para rodar o projeto.


Caso prefira rodar via terminal, execute:
```bash
mvn spring-boot:run
```

### Configurar o Frontend
Se preferir, abra o projeto com o Visual Studio Code:

```bash
cd ../erp-frontend
```

Abra o terminal integrado do Visual Studio Code e execute os seguintes comandos:

```bash
npm i
ng serve
```

O frontend estará disponível em: [http://localhost:4200](http://localhost:4200)


### Funcionalidades Implementadas
- Cadastro e listagem de empresas
- Cadastro e listagem de fornecedores
- Filtro por nome e CNPJ
- Validação de formulários
- Comunicação com API REST

### Contato
Desenvolvedor: Lucas Queiroz  
Email: lucasqueirozds@gmail.com  
LinkedIn: [https://www.linkedin.com/in/lucasqueirozds/](https://www.linkedin.com/in/lucasqueirozds/)
