const buscar = ()=>{   
    /* 
    *  Função usada para realizar consultas de CEP 
    *    Para funcionar, o backend deve estar executando em paralelo 
    *    Para isso acesse "../backend" e, no terminal, execute: npm start
    *    Requer node.js
    *  Entrada: dígitos de um CEP
    *  Saída: Retorna o endereço correspondente em um objeto JSON
    */
    const metodo = "GET";  // método HTTP de entrada
    const url = "http://localhost:3001/";  // endereço da API

    let cep = document.querySelector("#cep").value;  // lê input CEP
    let resultado = document.querySelector("#resultado");  // local de gravar resultado
    let xhr = new XMLHttpRequest();  // novo objeto XHR

    xhr.open(metodo, url+cep);  // consulta a api passando o cep desejado
    xhr.responseType = "json";  // resposta deve ser tratada como um arquivo json

    xhr.onreadystatechange = ()=>{  // escuta as mudanças de estado da conexão assíncrona
        
        // status 200=>ok, readyState 4=>concluído
        if(xhr.status == 200 && xhr.readyState == 4){ 

            console.log(xhr.response);  // imprime resposta no console

            // pega cada informação e grava separadamente em constantes
            const cep = xhr.response.cep;
            const rua = xhr.response.rua;
            const bairro = xhr.response.bairro;
            const cidade = xhr.response.cidade;
            const estado = xhr.response.estado;
            // const latitude = xhr.response.location.coordinates.latitude;
            // const longitude = xhr.response.location.coordinates.longitude;

            // formata resultado a ser exibido
            resultado.innerHTML =  `<h1>${cep}</h1>`;
            resultado.innerHTML += `<p>${rua}. ${bairro}. ${cidade} - ${estado}.</p>`;
            
            // chama a função que insere o mapa (não disponível para a api local)
            // desenhaMapa(resultado, cep); 
        }
    }

    xhr.send();

}

// const desenhaMapa = (resultado, cep)=>{
//     /*
//     *  Função utilizada para gerar um mapa interativo com a biblioteca Leaflet
//     *  Requer que os arquivos CSS/JS sejam chamados no index.html
//     */

//     let request = new XMLHttpRequest();  // novo objeto XHR

//     request.open("GET", 'https://nominatim.openstreetmap.org/search?format=json&q='+cep);  // consulta a api passando o cep desejado
//     request.responseType = "json";  // resposta deve ser tratada como um arquivo json

//     request.onreadystatechange = ()=>{  
//         if(request.status == 200 && request.readyState == 4){ 
//             console.log(request.response);  // imprime resposta no console
//         }
//     }
//     request.send();

//     // insere a div que receberá o mapa
//     resultado.innerHTML += "<div id='map' style='width:100%;height:500px;'></div>";

//     // cria o mapa com dados de latitude e longitude (14 corresponde ao nível de zoom)
//     const mapa = L.map('map').setView([latitude, longitude], 14);

//     // carrega mapas do openstreetmap
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);

//     // adiciona um balão de popup indicando o cep
//     L.marker([latitude, longitude]).addTo(mapa)
//         .bindPopup("CEP: "+cep)
//         .openPopup();

// }