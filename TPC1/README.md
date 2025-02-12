# TPC1 - Serviço de Reparações Automóveis

**Data:**  2025/02/12

## Autor  

- **Número de Aluno:** A104537  
- **Nome:** Afonso Gonçalves Pedreira  

## Resumo  

Neste trabalho, utilizou-se o JSON `dataset_reparacoes.json` fornecido pelo docente, que foi processado pelo script `normalizer.py` para criar uma estrutura válida para o `json-server`, resultando no ficheiro `normalized_data.json`. O objetivo foi criar um serviço web que disponibiliza informações sobre reparações automóveis, viaturas, intervenções e marcas. Os dados são servidos por um `json-server` ao servidor `server.js`.

## Resultados  

### Instruções  

### Preparar o dataset:  

```bash
$ python normalizer.py
```
### Iniciar o json-server:
```bash
$ json-server --watch normalized_data.json
```

### Iniciar o servidor:
```bash
$ node server.js
```
### Endpoints  

#### `/` - Página principal  

Apresenta uma lista de possíveis endpoints para aceder à informação sobre reparações, viaturas, intervenções e marcas.
  
![image](https://github.com/user-attachments/assets/1d9370e5-753f-47ac-a9a3-6ff896bd1bb8)

#### `/reparacoes` - Lista de todas as reparações  

Apresenta uma lista de todas as reparações registadas, com links para a página individual de cada uma.  

![image](https://github.com/user-attachments/assets/a027eb63-e17c-4ab3-b4b4-d4e5e2f9f2da)

#### `/reparacoes/{id-da-reparacao}` - Página individual de uma reparação  

Apresenta informação detalhada sobre uma reparação específica, incluindo nome do cliente, NIF, data, viatura e intervenções associadas. 

![image](https://github.com/user-attachments/assets/d962aa54-d9a1-47fa-885a-3445814f13f2)

#### `/intervencoes` - Lista de todas as intervenções  

Apresenta uma lista de todas as intervenções disponíveis, com links para as páginas individuais de cada uma.  

![image](https://github.com/user-attachments/assets/f7cae8ae-981c-4d85-bfee-1357522f9336)

#### `/intervencoes/{id-da-intervencao}` - Página individual de uma intervenção  

Apresenta informação detalhada sobre uma intervenção, incluindo o nome e a descrição.  

![image](https://github.com/user-attachments/assets/cfcbe73c-378c-4e50-a01d-6ac82895ffcd)

#### `/marcas` - Lista de todas as marcas  

Apresenta uma lista de todas as marcas de viaturas disponíveis, com links para as páginas individuais de cada uma.  

![image](https://github.com/user-attachments/assets/7923abba-1dbb-4f9e-936e-ec19db1aa2f6)

#### `/marcas/{id-da-marca}` - Página individual de uma marca  

Apresenta informação detalhada sobre uma marca de viatura, incluindo o nome e as reparações associadas.  

![image](https://github.com/user-attachments/assets/9a588d52-5629-4dd6-8290-02fb27565e68)

#### `/viaturas` - Lista de todas as viaturas  

Apresenta uma lista de todas as viaturas registadas, com links para as páginas individuais de cada uma.  

![image](https://github.com/user-attachments/assets/e509245a-0169-4d77-9c45-8c5709c69a89)

#### `/viaturas/{id-da-viatura}` - Página individual de uma viatura  

Apresenta informação detalhada sobre uma viatura, incluindo a marca, modelo e as reparações feitas nessa viatura.

![image](https://github.com/user-attachments/assets/9d759c3d-65f6-4a8f-a87b-c6ef68c6da9a)