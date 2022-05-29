fs = require('fs')  // biblioteca usada para ler arquivos

const express = require('express');  // biblioteca que cria as rotas

const app = express();  // inicia o servidor express

app.get('/:id', (req, res)=>{  // rota principal - chamada {url}/12345-678

    // pega o cep da url: remove caraceteres especiais como "-"
    const cep = parseInt(req.params.id.replace(/[^0-9]/g,'')); 

    // função que retorna true ou false para uma busca por cep
    const buscar = cada_cep => {

        // detalhes_cep => [0] cep [1] cidade [2] estado [3] bairro [4] rua
        detalhes_cep = cada_cep.split("\t");  
        codigo_cep = parseInt(detalhes_cep[0]);

        if(codigo_cep == cep){  // "cep" corresponde ao cep digitado na url
            return true; 
        }

    }

    // le arquivo com os ceps
    fs.readFile('./src/data/cep.tsv', 'utf8', function (err,data) {
        if (err) { return console.log(err); }

        const linhas = data.split("\n"); // separa dados em linhas
        const consulta = linhas.filter(buscar)[0]; // chama a função de busca

        // caso não encontre o cep, o tipo será 'undefined'
        if(typeof consulta != 'undefined'){  // se encontrar algo:

            const coluna = consulta.split("\t");

            const resposta = {  // formata a resposta
                cep: coluna[0],
                cidade: coluna[1],
                estado: coluna[2],
                bairro: coluna[3],
                rua: coluna[4]
            }
            res.send(resposta); // exibe o json na tela
        }
        else{  // se não encontrar
            res.send("CEP não encontrado."); // exibe cep não encontrado
        }
      });
 });

 app.listen(3001); // carrega server na porta 3001