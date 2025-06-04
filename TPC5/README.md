# 📝 TPC5 - Gestão de Alunos

## 📚 Descrição

Este trabalho prático consiste no desenvolvimento de uma aplicação completa para a gestão de alunos, dividida em dois serviços principais:

- **API de Dados**: Implementada com Node.js e Express, utilizando Mongoose para ligação à base de dados MongoDB. Esta API permite criar, ler, atualizar e eliminar (CRUD) registos de alunos.
- **Interface Front-end**: Construída de forma a consumir a API desenvolvida, com o objetivo de apresentar os dados de forma clara, responsiva e intuitiva para o utilizador final.

A aplicação permite gerir uma lista de alunos com atributos como nome, número, curso e data de nascimento, oferecendo também funcionalidades de pesquisa e filtragem.

---

## 👨‍💻 Autor

- **Nome**:Afonso Pedreira
- **Número de aluno**: A104537

---

## ✅ Funcionalidades

- Listagem de todos os alunos armazenados na base de dados
- Adição de novos alunos através de um formulário no front-end
- Edição de dados dos alunos existentes
- Eliminação de registos
- Pesquisa de alunos por nome ou número
- Separação clara entre cliente (front-end) e servidor (API REST)
- Comunicação assíncrona entre cliente e servidor através de `fetch` e `JSON`
- Validação básica de dados

---



## 📈 Resultados e Melhorias

Este TPC representa uma evolução direta do trabalho anterior (TPC4), onde a gestão de alunos era feita exclusivamente no front-end com dados simulados. Nesta nova versão:

- A **API REST** substitui os dados estáticos, garantindo persistência dos dados em MongoDB
- O **front-end** foi reestruturado para ser mais limpo, modular e responsivo
- Foram introduzidas boas práticas como a separação de responsabilidades entre cliente e servidor
- A aplicação está agora preparada para escalabilidade e integração com outros serviços

---
