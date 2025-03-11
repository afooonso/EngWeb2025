# EWEB - T5

```shell
npm install
```

### Nota: O ficheiro `www` é o ficheiro de mais baixo nível em express, é o que inicia o servidor.

Para iniciar um template em express utilizando `pug`, basta correr o seguinte comando: `npx express-generator --view=pug`

ou então: `npm init -y` e depois alterar o ficheiro `package.json` para o seguinte:
```
{
  "name": "eweb---t5",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "express-init": "npx express-generator --view=pug",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": ""
}
```

## [Express](https://www.npmjs.com/package/express)
##### [Documentação](https://expressjs.com/)
Express é um framework para Node.js que permite criar aplicações web de forma mais simples e rápida. Express é minimalista e flexível, permitindo criar aplicações web robustas e escaláveis, com um mínimo de código. Isto é, com Express faz com que o código seja mais limpo e organizado.

## [Pug](https://www.npmjs.com/package/pug)
##### [Documentação](https://pugjs.org/api/getting-started.html)
Pug é um template engine para Node.js que permite escrever HTML de forma mais simples e limpa. Pug é uma ferramenta que permite escrever HTML de forma mais simples e limpa, com menos código e mais legível. Pug é uma ferramenta que permite escrever HTML de forma mais simples e limpa, com menos código e mais legível.

#### Nota: Em express o ficheiro `public/stylesheets/style.css` é o ficheiro de estilos. Importado de forma autonoma. Se quisermos colocar por exemplo `w3.css` temos de importar o ficheiro no `layout.pug`.

`Layout.pug` é o ficheiro que contém o layout base da aplicação, ou seja, é o ficheiro que pode ser importado nas `views` da aplicação.