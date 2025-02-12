const http = require('http');
const url = require('url');
const axios = require('axios');
const images = require('./brandlogos');


function renderReparationPage(res, id) {
    axios.get(`http://localhost:3000/reparacoes/${id}`)
        .then(resp => {
            const reparation = resp.data;
            axios.get(`http://localhost:3000/viaturas/${reparation.viatura}`)
                .then(resp => {
                    const veiculo = `<a href="/veiculos/${resp.data.id}">Veículo: (${resp.data.id})</a> ${resp.data.marca} - ${resp.data.modelo}`;
                     const sortedInterventionIDs = Object.keys(reparation.intervencoes).sort((a, b) => a.localeCompare(b));
                    
                     const interventionPromises = sortedInterventionIDs.map(interventionID => 
                         axios.get(`http://localhost:3000/intervencoes/${interventionID}`)
                             .then(resp => `<li><a href="/intervencoes/${resp.data.id}" style="text-decoration: underline;">${resp.data.id}</a> - ${resp.data.descricao} (${reparation.intervencoes[interventionID]}x)</li>`)
                             .catch(_err => '<li>Erro ao obter intervencao</li>')
                     );
                    
                    Promise.all(interventionPromises)
                        .then(interventions => {
                            res.writeHead(200, {"Content-Type": "text/html"});
                            res.end(`
                                <!DOCTYPE html>
                                <html lang="pt">
                                <head>
                                    <meta charset="UTF-8">
                                    <title>Reparação</title>
                                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                                </head>
                                <body>
                                <div class="w3-container w3-teal">
                                    <h2><a href="/" style="text-decoration: none">Auto Bisca</a></h2>
                                </div>
                                <div class="w3-container">
                                    <h3>Reparação: ${reparation.id}</h3>
                                    <p><strong>Nome:</strong> ${reparation.nome}</p>
                                    <p><strong>NIF:</strong> ${reparation.nif}</p>
                                    <p><strong>Data:</strong> ${reparation.data}</p>
                                    <p>${veiculo}</p>
                                    <h4>Intervenções</h4>
                                    <ul>
                                        ${interventions.join('')}
                                    </ul>
                                </div>
                                </body>
                                </html>
                            `);
                        })
                        .catch(err => {
                            console.log(err);
                            if (!res.headersSent) {
                                res.writeHead(500, {"Content-Type": "text/html"});
                                res.end('Server error');
                            }
                        });
                })
                .catch(err => {
                    console.log(err);
                    if (!res.headersSent) {
                        res.writeHead(500, {"Content-Type": "text/html"});
                        res.end('Server error');
                    }
                });
        })
        .catch(err => {
            console.log(err);
            if (!res.headersSent) {
                res.writeHead(500, {"Content-Type": "text/html"});
                res.end('Server error');
            }
        });
}



function renderReparationsPage(res) {

axios.get('http://localhost:3000/reparacoes')
    .then(resp => {
        const reparationsJson = resp.data;
        const reparationsContent = reparationsJson.map(reparation =>
            `
                <li>
                 <a href="/reparacoes/${reparation.id}">Reparação: ${reparation.id}</a>
                </li>
            `);
            res.writeHead(200, {"Content-Type": "text/html"});
        res.end(` 
            <!DOCTYPE html>
            <html lang="pt">
            <head>
                <meta charset="UTF-8">
                <title>Reparações</title>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            </head>
            <body>
            <div class="w3-container w3-teal">
                <h2><a href="/" style="text-decoration: none">Auto Bisca</a></h2>
            </div>
            <div class="w3-container">
                <h3>Reparações</h3>
                <ul>
                    ${reparationsContent.join('')}
                </ul>
            </div>
            </body>
            </html>
        `);
    })
    .catch (err => {
        console.log(err);
        res.writeHead(500, {"Content-Type": "text/html"});
        res.end('Server error');
    });



}


function renderInterventionsPage(res) {
    axios.get('http://localhost:3000/intervencoes')
        .then(resp => {
            const interventionsJson = resp.data;
            interventionsJson.sort((a, b) => a.id.localeCompare(b.id));
            const interventionsContent = interventionsJson.map(intervention =>

                `
                    <li>
                        <a href="/intervencoes/${intervention.id}"> ${intervention.id} </a> ${intervention.descricao}
                    </li>
                `);
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(`
                <!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <title>Intervenções</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                </head>
                <body>
                <div class="w3-container w3-teal">
                    <h2><a href="/" style="text-decoration: none">Auto Bisca</a></h2>
                </div>
                <div class="w3-container">
                    <h3>Intervenções</h3>
                    <ul>
                        ${interventionsContent.join('')}
                    </ul>
                </div>
                </body>
                </html>
            `);
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500, {"Content-Type": "text/html"});
            res.end('Server error');
        }
    );






}

function renderInterventionPage(res, id) {
    axios.get(`http://localhost:3000/intervencoes/${id}`)
        .then(resp => {
            const intervencao = resp.data;
            const reparacoesContent = intervencao.reparacoes.map(reparacaoID => 
                `<li><a href="/reparacoes/${reparacaoID}">Reparação: ${reparacaoID}</a></li>`
            ).join('');

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(`
                <!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <title>Intervenção ${intervencao.id}</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                </head>
                <body>
                <div class="w3-container w3-teal">
                    <h2><a href="/" style="text-decoration: none">Auto Bisca</a></h2>
                </div>
                <div class="w3-container">
                    <h3>Intervenção: ${intervencao.id}</h3>
                    <p><strong>Nome:</strong> ${intervencao.nome}</p>
                    <p><strong>Descrição:</strong> ${intervencao.descricao}</p>
                    <h4>Reparações</h4>
                    <ul>
                        ${reparacoesContent}
                    </ul>
                </div>
                </body>
                </html>
            `);
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500, {"Content-Type": "text/html"});
            res.end('Server error');
        });
}


function renderVeichlesPage(res) {
    axios.get('http://localhost:3000/viaturas')
        .then(resp => {
            const veiculosJson = resp.data;
            const veiculosContent = veiculosJson.map(veiculo =>
                `
                    <li>
                        <a href="/veiculos/${veiculo.id}">Viatura: ${veiculo.id}</a>${veiculo.marca}-${veiculo.modelo}
                    </li>
                `).join('');
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(`
                <!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <title>Veículos</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                </head>
                <body>
                <div class="w3-container w3-teal">
                    <h2><a href="/" style="text-decoration: none">Auto Bisca</a></h2>
                </div>
                <div class="w3-container">
                    <h3>Veículos</h3>
                    <ul>
                        ${veiculosContent}
                    </ul>
                </div>
                </body>
                </html>
            `);
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500, {"Content-Type": "text/html"});
            res.end('Server error');
        });
}


function renderVeichlePage(res, id) {
    axios.get(`http://localhost:3000/viaturas/${id}`)
        .then(resp => {
            const veiculo = resp.data;
            const reparacoesContent = veiculo.reparacoes.map(reparacaoID => 
                `<li><a href="/reparacoes/${reparacaoID}">Reparação: ${reparacaoID}</a></li>`
            ).join('');
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(`
                <!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <title>Veículo ${veiculo.id}</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                </head>
                <body>
                <div class="w3-container w3-teal">
                    <h2><a href="/" style="text-decoration: none">Auto Bisca</a></h2>
                </div>
                <div class="w3-container">
                    <h3>Veículo: ${veiculo.id}</h3>
                    <p><strong>Marca:</strong> ${veiculo.marca}</p>
                    <p><strong>Modelo:</strong> ${veiculo.modelo}</p>
                    <h4>Reparações</h4>
                    <ul>
                        ${reparacoesContent}
                    </ul>
                </div>
                </body>
                </html>
            `);
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500, {"Content-Type": "text/html"});
            res.end('Server error');
        });
}



function renderBrandsPage(res) {
    axios.get('http://localhost:3000/marcas')
        .then(resp => {
            const marcasJson = resp.data;
            marcasJson.sort((a, b) => a.id.localeCompare(b.id));
            const marcasContent = marcasJson.map(marca =>
                `
                    <li>
                        <a href="/marcas/${marca.id}">${marca.id}</a>
                    </li>
                `).join('');
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(`
                <!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <title>Marcas</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                </head>
                <body>
                <div class="w3-container w3-teal">
                    <h2><a href="/" style="text-decoration: none">Auto Bisca</a></h2>
                </div>
                <div class="w3-container">
                    <h3>Marcas</h3>
                    <ul>
                        ${marcasContent}
                    </ul>
                </div>
                </body>
                </html>
            `);
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500, {"Content-Type": "text/html"});
            res.end('Server error');
        });
}

function renderBrandPage(res, id) {
    axios.get(`http://localhost:3000/marcas/${id}`)
        .then(resp => {
            const marca = resp.data;
            const url = images.logos[marca.id];
            const reparacoesContent = marca.reparacoes.map(reparacaoID => 
                `<li><a href="/reparacoes/${reparacaoID}">Reparação: ${reparacaoID}</a></li>`
            ).join('');
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(`
                <!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <title>${marca.id}</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                </head>
                <body>
                <div class="w3-container w3-teal">
                    <h2><a href="/" style="text-decoration: none">Auto Bisca</a></h2>
                </div>
                <div class="w3-container">
                    <img src="${url}" alt="${marca.id}" style="width:200px;height:auto;">
                    <h4>Reparações</h4>
                    <ul>
                        ${reparacoesContent}
                    </ul>
                </div>
                </body>
                </html>
            `);
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500, {"Content-Type": "text/html"});
            res.end('Server error');
        });
}


function renderMainPage(res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(`
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>🚗 Auto Bisca</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Auto Bisca</a></h2>
</div>
<div class="w3-container">
    <p>
        <a href="/reparacoes">Reparações</a>
    </p>
    <p>
        <a href="/intervencoes">Intervenções</a>
    </p>
    <p>
        <a href="/veiculos">Veículos</a>
    </p>
    <p>
        <a href="/marcas">Marcas</a>
    </p>
</div>

</body>
</html>`
)
}



http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    if (q.pathname == '/') {
        renderMainPage(res);
    }
    
    else if (q.pathname == '/reparacoes') {

        renderReparationsPage(res);
    }


    else if (q.pathname.startsWith('/reparacoes/')) {
        const id = q.pathname.split('/')[2];
        renderReparationPage(res,id);

      
    }

    else if (q.pathname == '/intervencoes') {
        renderInterventionsPage(res);
    }

    else if (q.pathname.startsWith('/intervencoes/')) {
        const id = q.pathname.split('/')[2];
        renderInterventionPage(res, id);
    }

    else if (q.pathname == '/veiculos') {
       renderVeichlesPage(res);
    }

    else if (q.pathname.startsWith('/veiculos/')) {
        const id = q.pathname.split('/')[2];
        renderVeichlePage(res, id);
    }

    else if (q.pathname == '/marcas') {
        renderBrandsPage(res);
    
    }
    
    else if (q.pathname.startsWith('/marcas/')) {
        const id = q.pathname.split('/')[2];
        renderBrandPage(res, id);
    }
    
    
    
    
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/html', charset: 'utf-8' });
        res.end('Page not found');
    }
}).listen(8080);

