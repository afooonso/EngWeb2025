# 🧾 TPC6: Resolucao Teste

## 📅 Data

- **28/03/2025**

## 👤 Autor

- **Nome:** Afonso Gonçalves Pedreira  
- **Número:** A104537  

---

## 🧠 Resumo

### 🎯 Objetivos

O objetivo principal desta tarefa foi consolidar conhecimentos sobre a criação e manipulação de APIs RESTful com persistência em MongoDB. A resolução baseou-se num teste anterior, focado no tratamento de um dataset real (contratos públicos) e no desenvolvimento de dois serviços:

1. **API de dados** – baseada em Express + Mongoose
2. **Interface web** – front-end com Express + Pug

Ambos os serviços comunicam entre si e permitem uma experiência funcional de exploração e gestão dos contratos públicos.

---

### 📦 Dataset

Utilizámos um ficheiro `.csv` com dados reais do Portal dos Contratos Públicos (extraído de [dados.gov.pt](https://dados.gov.pt/)), com contratos até 9 de Maio de 2024. A estrutura incluía campos como:

- `idcontrato`
- `tipoprocedimento`
- `objectoContrato`
- `precoContratual`
- `entidade_comunicante`
- ...

---

### ⚙️ Exercício 1: API de Dados


Criámos um script `dataset.py` que converte o `.csv` original para `.json`, ajustando:

- Nomes de campos (ex. `idcontrato` → `_id`)
- Números com vírgulas → pontos decimais
- Conversão de strings numéricas para `float` ou `int`

Depois:

```bash
# Gerar JSON
python3 dataset.py

# Iniciar container Docker
docker start mongoEW

# Copiar para o container
docker cp contratos2024.json mongoEW:/tmp

# Importar na base de dados
docker exec -it mongoEW sh
mongoimport -d contratos -c contratos /tmp/contratos2024.json --jsonArray

#### 🔍 1.2 Queries (warm-up)

Exemplos de queries feitas em MongoDB:

```js
// 1. Número total de contratos
db.contratos.countDocuments()

// 2. Contratos com tipo "Ajuste Direto Regime Geral"
db.contratos.find({tipoprocedimento: "Ajuste Direto Regime Geral"}).count()

// 3. Entidades comunicantes distintas
db.contratos.distinct("entidade_comunicante")

// 4. Distribuição por tipo de procedimento
db.contratos.aggregate([
  { $group: { _id: "$tipoprocedimento", count: { $sum: 1 }}},
  { $sort: { count: -1 }}
])

// 5. Montante total por entidade comunicante
db.contratos.aggregate([
  { $group: { _id: "$entidade_comunicante", count: { $sum: "$precoContratual" }}},
  { $sort: { count: -1 }}
])
```

---

#### 🌐 1.3 API REST

A API foi implementada em Node.js + Express + Mongoose e responde na **porta 16000** com as seguintes rotas:

- `GET /contratos`  
- `GET /contratos/:id`  
- `GET /contratos?entidade=...`  
- `GET /contratos?tipo=...`  
- `GET /contratos/entidades`  
- `GET /contratos/tipos`  
- `POST /contratos`  
- `PUT /contratos/:id`  
- `DELETE /contratos/:id`

---

### 💻 Exercício 2: Interface Web

Implementado um front-end funcional que consome a API e serve páginas HTML renderizadas com Pug, na **porta 16001**:

#### 🧾 Funcionalidades:

- `/`: Tabela com contratos + links para detalhes
- `/:id`: Página com todos os campos de um contrato
- `/entidades/:nipc`: Página da entidade com total e contratos associados

---

## ✅ Testes

Para executar o sistema completo:

```bash
# Gerar JSON
python3 dataset.py

# Iniciar MongoDB e importar JSON
docker start mongoEW
docker cp contratos2024.json mongoEW:/tmp
docker exec -it mongoEW sh
mongoimport -d contratos -c contratos /tmp/contratos2024.json --jsonArray
exit

# API de Dados
cd API_de_dados
npm install
npm start

# Front-end
cd ../Front-end
npm install
npm start
```

Depois visitar: [http://localhost:16001](http://localhost:16001)
