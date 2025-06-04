# 🧾 TPC4: Aplicação de Gestão de Alunos (Versão com JSON Server)

## 📅 Date
- **2025-03-14** (exemplo)

## 👤 Author
- **Name:** Afonso Gonçalves Pedreira  
- **Student Number:** A104537  

---

## 🧠 Summary

Neste trabalho, foi desenvolvida uma aplicação web simples que permite a **gestão de alunos**. Esta versão utiliza uma **base de dados fictícia** providenciada pelo `json-server` e comunica com o front-end através de `axios`, com páginas dinâmicas renderizadas via `pug` num servidor construído com `Express.js`.

A aplicação oferece funcionalidades básicas como:

- Listagem de alunos
- Adição de novos alunos
- Edição de registos existentes
- Remoção de alunos

Todos os dados são manipulados no `json-server`, que simula uma API RESTful local. Isto permitiu praticar o consumo de APIs no lado cliente e o rendering dinâmico de páginas a partir de templates.

---

## ✅ Resultados

- Estruturação correta da interface com páginas em `pug`
- Interação completa com a API `json-server` usando `axios`
- Implementação das operações CRUD (Create, Read, Update, Delete)
- Separação entre lógica do cliente e servidor
- Validação básica de campos e feedback visual nas ações

---

## 📝 Notas Finais

Esta versão foi fundamental para consolidar os conceitos de:

- Templates em `pug`
- Comunicação com APIs RESTful através de `axios`
- Estruturação modular de aplicações em `Express.js`
- Manipulação de dados com `json-server` de forma prática

Na próxima iteração (TPC5), esta estrutura será evoluída com persistência real de dados via MongoDB e uma API construída de raiz com `Express` + `Mongoose`.

---
