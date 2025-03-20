/********************************************************************
 * objetivo: Controller responsável pela manipulação do CRUD de banco de dados de música
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ********************************************************************/

const MESSAGE = require('../../modulo/config.js')

//Import do arquivo DAO de música para manipular o BD
const musicaDAO = require('../../model/DAO/musica.js')

//Função para inserir uma música
const inserirMusica = async function(musica, contentType){

try {
    
    if(String(contentType).toLowerCase()== 'application/json'){

    if( musica.nome             == undefined || musica.nome             == "" || musica.nome             == null || musica.nome.length > 80 ||
        musica.link             == undefined || musica.link             == "" || musica.link             == null || musica.link.length > 200 ||
        musica.duracao          == undefined || musica.duracao          == "" || musica.duracao          == null || musica.duracao.length > 5 ||
        musica.data_lancamento  == undefined || musica.data_lancamento  == "" || musica.data_lancamento  == null || musica.data_lancamento.length > 10 ||
        musica.foto_capa        == undefined || musica.foto_capa.length > 200 ||
        musica.letra            == undefined 
    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    }else{
       let resultMusica = await musicaDAO.insertMusica(musica)

       if(resultMusica)
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


//Função para atualizar uma música
const atualizarMusica = async function(musica, id, contentType){
    try {
        if(String(contentType).toLowerCase()== 'application/json'){

            if( musica.nome             == undefined || musica.nome             == "" || musica.nome             == null || musica.nome.length > 80 ||
                musica.link             == undefined || musica.link             == "" || musica.link             == null || musica.link.length > 200 ||
                musica.duracao          == undefined || musica.duracao          == "" || musica.duracao          == null || musica.duracao.length > 5 ||
                musica.data_lancamento  == undefined || musica.data_lancamento  == "" || musica.data_lancamento  == null || musica.data_lancamento.length > 10 ||
                musica.foto_capa        == undefined || musica.foto_capa.length > 200 ||
                musica.letra            == undefined ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                //Validar se o ID existe no BD
                let resultMusica = await buscarMusica(id)

                if(resultMusica.status_code == 200){

                    musica.id = id
                    let result = await musicaDAO.updateMusica(musica)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM//200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
                    }

                }else if(resultMusica.status_code == 404){
                    return MESSAGE.ERROR_NOT_fOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //400
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para excluir uma música
const excluirMusica = async function(id){
try {
    if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
        return MESSAGE.ERROR_REQUIRED_FIELDS
    }else {
        //validar se o ID existe
        let resultMusica = await buscarMusica(id)

        if(resultMusica.status_code == 200){
            //Delete
            let result = await musicaDAO.deleteMusica(id)
            if(result){
                return MESSAGE.SUCCESS_DELETED_ITEM //200
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }

        }else if(resultMusica.status_code == 404){
            return MESSAGE.ERROR_NOT_fOUND//400
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
    }

    
} catch (error) {
    console.log(error)
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
}
}

//Função para retornar todas uma música
const listarMusica = async function(){
    
    try {
        let dadosMusica = {}
        //Chamar a função que retorna todas as musicas
        let resultMusica = await musicaDAO.selectAllMusica()

    if(resultMusica != false || typeof(resultMusica) == 'object')
    {
        if(resultMusica.length > 0){
            dadosMusica.status = true
            dadosMusica.status_code = 200
            dadosMusica.itens = resultMusica.length
            dadosMusica.musics = resultMusica

            return dadosMusica //200

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

//Função para retornar uma música pelo ID
const buscarMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else {
            let dadosMusica = {}
            let resultMusica = await musicaDAO.selectByidMusica(id)

            if (resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                    dadosMusica.status = true
                    dadosMusica.status_code = 200
                    dadosMusica.musics = resultMusica
                    return dadosMusica //200
                }else{
                    return MESSAGE.ERROR_NOT_fOUND//404
                }
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}