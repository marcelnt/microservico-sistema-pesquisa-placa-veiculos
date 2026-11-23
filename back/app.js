/***********************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API do projeto do Auto Center
 * Data: 23/11/2026
 * Autor: Marcel
 * Versão: 1.0
 ***********************************************************************************************/

//Import das bibliotecas para criar a API
require("dotenv").config();
const express       = require('express')
const cors          = require('cors')

const token = process.env.API_PLACAS_TOKEN;


//Cria o objeto app para criar a API
const app = express()

//Porta
const PORT = process.PORT || 8080

//Configurações do cors
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')
    
    app.use(cors())
    next()
})


//Retorna a lista de cargos
app.get('/v1/sistema/veiculo/placa/:placa',  async function(request, response){
    //Chama a função da controller para retornar todos os cargos
    let placa = request.params.placa
 
    const resposta = await fetch(
        `https://wdapi2.com.br/v3/basico/${placa}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    )

    const dados = await resposta.json()

    response.status(resposta.status)
    response.json(dados)


})

app.listen(PORT, function(){
    console.log('API aguardando requisições!!!')
})