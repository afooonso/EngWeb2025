# TPC3 - Gestão de Alunos

**Data:** 2025/02/28

## Autor  
- **Número de Aluno:** A104537  
- **Nome:** Afonso Gonçalves Pedreira  

## Resumo  
Neste trabalho, utilizou-se o ficheiro JSON `alunos.json` que contém informação sobre alunos, incluindo dados pessoais e tarefas realizadas. O objetivo foi criar um serviço web que disponibiliza essas informações, permitindo a visualização e edição de alunos. O servidor foi desenvolvido em Node.js e utiliza o `json-server` para servir os dados do arquivo JSON, proporcionando a interação com a base de dados através de endpoints específicos.

## Resultados  

### Instruções  

### Preparar o dataset:  
O primeiro passo é garantir que o ficheiro `alunos.json` está na pasta correta. Depois, o servidor JSON pode ser inicializado com o comando:

```bash  
$ json-server --watch alunos.json  
```

### Iniciar o servidor:
Em seguida, iniciamos o servidor Node.js com o seguinte comando:
```bash

node alunos_server_skeleton.js
```

### Endpoints  

#### `/` - Página principal  
Apresenta uma lista de todos os alunos registados, com links para a página individual de cada um.  
![Menu Inicial](./assets/image.png)

#### `/alunos` - Lista de todos os alunos  
Apresenta uma lista de todos os alunos registados, com links para a página individual de cada um.  
![Pagina Aluno](./assets/image-1.png)

#### `/alunos/{id-do-aluno}` - Página individual de um aluno  
Apresenta informação detalhada sobre um aluno específico, incluindo nome, ID, Git e tarefas que o aluno realizou.  
![Pagina Aluno](./assets/image-1.png)

#### `/alunos/{id-do-aluno}/editar` - Página de edição do aluno  
Permite editar a informação de um aluno, como nome, Git e tarefas.  
![Editar Aluno](./assets/image-2.png)

#### `/alunos/adicionar` - Página de adição de um novo aluno  
Permite adicionar um novo aluno com os seus dados pessoais e tarefas realizadas.  
![Adicionar Aluno](./assets/image-3.png)
