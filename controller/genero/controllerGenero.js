/********************************************************************
 * objetivo: Controller responsável pela manipulação do CRUD de banco de dados de gênero
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ********************************************************************/

const MESSAGE = require('../../modulo/config.js')

//Import do arquivo DAO de gênero para manipular o BD
const generoDAO = require('../../model/DAO/genero.js')

//Função para inserir um gênero
const inserirGenero = async function(genero, contentType){

try {
    
    if(String(contentType).toLowerCase()== 'application/json'){

    if( genero.nome             == undefined || genero.nome             == "" || genero.nome             == null || genero.nome.length > 30 
      
    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    }else{
       let resultGenero = await generoDAO.insertGenero(genero)

       if(resultGenero)
        return MESSAGE.SUCCESS_CREATED_ITEM//201
    else
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
    
    }

}else{
    return MESSAGE.ERROR_CONTENT_TYPE//415
}
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todas uma música
const listarGenero = async function(){
    
    try {
        let dadosGenero = {}
        //Chamar a função que retorna todas as musicas
        
        let resultGenero = await generoDAO.selectAllGenero()

    if(resultGenero != false || typeof(resultGenero) == 'object')
    {
        if(resultGenero.length > 0){
            dadosGenero.status = true
            dadosGenero.status_code = 200
            dadosGenero.itens = resultGenero.length
            dadosGenero.genero = resultGenero

            return  dadosGenero //200

        }else{
            return MESSAGE.ERROR_NOT_fOUND //404
        }
    }else{
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
    }
        
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }

}

//Função para retornar uma gênero pelo ID
const buscarGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else {
            let dadosGenero = {}
            let resultGenero = await generoDAO.selectByidGenero(id)

            if (resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.genero = resultGenero
                    return dadosGenero //200
                }else{
                    return MESSAGE.ERROR_NOT_fOUND//404
                }
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

const excluirGenero = async function(id){
try {
    if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
        return MESSAGE.ERROR_REQUIRED_FIELDS
    }else {
          //validar se o ID existe
            let resultGenero = await buscarGenero(id)
        if(resultGenero.status_code == 200){
            //Delete
            let result = await generoDAO.deleteGenero(id)
            if(result){
                return MESSAGE.SUCCESS_DELETED_ITEM //200
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }

        }else if(resultGenero.status_code == 404){
            return MESSAGE.ERROR_NOT_fOUND//400
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
    }

    
} catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
}
}

const atualizarGenero = async function(genero, id, contentType){
    try {
        if(String(contentType).toLowerCase()== 'application/json'){

            if( genero.nome             == undefined || genero.nome             == "" || genero.nome             == null || genero.nome.length > 80 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                //Validar se o ID existe no BD
                let resultGenero = await buscarGenero(id)

                if(resultGenero.status_code == 200){

                    genero.id = id
                    let result = await generoDAO.updateGenero(genero)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM//200
                    }else{
                        return error
                    }

                }else if(resultGenero.status_code == 404){
                    return MESSAGE.ERROR_NOT_fOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //400
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    inserirGenero,
    listarGenero,
    buscarGenero,
    excluirGenero,
    atualizarGenero
}