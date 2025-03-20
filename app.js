/************************************************************************************
 * Objetivo: API responsável pelas requisições bdo projeto de controle de música
 * Data: 13/02/2025
 * Autor: João Pedro
 * Versão: 1.0
 * Observações: 
 * ******para criar a API precisamos instalar:
 *          express        npm install express --save
 *          cors           npm install cors --save
 *          body-parser    npm install body-parser --save
 * ******Para criar a conexão com o banco de dados MYSQL precisamos instalar:
 *          prisma         npm isntall prisma --save
 *        
 *   prisma/client  npm install @prisma/client -- save
 *  Após a instalação do prisma é nescessário inicializa-lo:
 *  npx prisma init
 * 
 * Para sincronizar o prisma com o banco de dados podemos utilizar:
 *   npx prisma migrate dev
 *****************************************************************************/

const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

const controllerMusica = require('./controller/musica/controllerMusica.js')

//Criando o formato de dados que será recebido no body da requisição(POST/PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a api
const app = express()

//Configurações do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin','*')
    response.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//EndPoint para inserir uma música
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON,async function(request, response) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let result = await controllerMusica.inserirMusica(dadosBody, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

//EndPoint para retornar uma lista de musicas
app.get('/v1/controle-musicas/musica', cors(), async function(request, response) {
    
    //chama a função para retornar uma lista de musicas
    let result = await controllerMusica.listarMusica()

    response.status(result.status_code)
    response.json(result)
})

//EndPoint para buscar uma musica pelo ID
app.get('/v1/controle-musicas/musica/:id', cors(), async function(request, response){
    let idMusica = request.params.id

    let result = await controllerMusica.buscarMusica(idMusica)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/controle-musicas/musica/:id', cors(), async function (request, response){
    let idMusica = request.params.id

    let result = await controllerMusica.excluirMusica(idMusica)

    response.status(result.status_code)
    response.json(result)
})




app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response){
    
    let contentType = request.headers['content-type']

    let idMusica = request.params.id

    let dadosBody = request.body

    let result = await controllerMusica.atualizarMusica(dadosBody, idMusica, contentType)

    response.status(result.status_code)
    response.json(result)







})
app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições...')
})