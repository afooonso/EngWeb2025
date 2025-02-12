import json

class Database:
    def __init__(self, reparacoes, viaturas, intervencoes,marcas):
        self.reparacoes = reparacoes
        self.viaturas = viaturas
        self.intervencoes = intervencoes
        self.marcas = marcas

class Reparacao:
    def __init__(self, identificator, nome, nif, data, viatura, intervencoes):
        self.id = identificator
        self.nome = nome
        self.nif = nif
        self.data = data
        self.viatura = viatura
        self.data = data
        self.intervencoes = intervencoes

    def __str__(self):
        return f'{self.nome} - {self.nif} - {self.data} - {self.viatura} - {self.intervencoes}'

class Viatura:
    def __init__(self, marca, modelo, matricula, reparacoes):
        self.id = matricula 
        self.marca = marca
        self.modelo = modelo
        self.reparacoes = reparacoes

    def __str__(self):
        return f'{self.marca} - {self.modelo} - {self.id} - {self.reparacoes}'

class Intervencao:
    def __init__(self, codigo, nome, descricao, reparacoes):
        self.id = codigo
        self.nome = nome
        self.descricao = descricao
        self.reparacoes = reparacoes

    def __str__(self):
        return f'{self.id} - {self.nome} - {self.descricao} - {self.reparacoes}'

class Marca:
    def __init__(self, id, reparacoes):
        self.id = id
        self.reparacoes = reparacoes

    def __str__(self):
        return f'{self.id} - {self.reparacoes}'

def main():
    reparacoes = []
    viaturas = {}
    intervencoes = {}
    marcas = {}
    with open('dataset_reparacoes.json', 'r', encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            print(f"Erro ao decodificar JSON: {e}")
            return
        
        for num, reparacao in enumerate(data['reparacoes']):
            intervencoes_reparacao = {}
            for intervencao in reparacao['intervencoes']:
                if intervencao['codigo'] not in intervencoes:
                    intervencoes[intervencao['codigo']] = Intervencao(intervencao['codigo'], intervencao['nome'], intervencao['descricao'], [num])
                else:
                    intervencoes[intervencao['codigo']].reparacoes.append(num)
                
                if intervencao['codigo'] not in intervencoes_reparacao:
                    intervencoes_reparacao[intervencao['codigo']] = 1
                else:
                    intervencoes_reparacao[intervencao['codigo']] += 1
                
            if reparacao['viatura']['matricula'] not in viaturas:
                viaturas[reparacao['viatura']['matricula']] = Viatura(reparacao['viatura']['marca'], reparacao['viatura']['modelo'], reparacao['viatura']['matricula'], [num])
            else:
                viaturas[reparacao['viatura']['matricula']].reparacoes.append(num)
            
            if reparacao['viatura']['marca'] not in marcas:
                marcas[reparacao['viatura']['marca']] = Marca(reparacao['viatura']['marca'], [num])
            else:
                marcas[reparacao['viatura']['marca']].reparacoes.append(num)
            
            reparacoes.append(Reparacao(num, reparacao['nome'], reparacao['nif'], reparacao['data'], reparacao['viatura']['matricula'], intervencoes_reparacao))
    
    db = Database(reparacoes, list(viaturas.values()), list(intervencoes.values()), list(marcas.values()))
    with open('normalized_data.json', 'w', encoding="utf-8") as f:
        f.write(json.dumps(db, default=lambda o: o.__dict__, indent=4))

if __name__ == '__main__':
    main()