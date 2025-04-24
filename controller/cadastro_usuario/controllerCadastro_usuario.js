/********************************************************************
 * objetivo: Controller responsável pela manipulação do CRUD de banco de dados de música
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ********************************************************************/

const MESSAGE = require('../../modulo/config.js')

//Import do arquivo DAO de música para manipular o BD
const cadastro_usuarioDAO = require('../../model/DAO/cadastro_usuario.js')

//Função para inserir uma música
const inserirCadastro_usuario = async function(cadastro_usuario, contentType){

try {
    
    if(String(contentType).toLowerCase()== 'application/json'){

    if( cadastro_usuario.nome             == undefined || cadastro_usuario.nome             == "" || cadastro_usuario.nome             == null || cadastro_usuario.nome.length > 80 ||
        cadastro_usuario.idade            == undefined || cadastro_usuario.idade            == "" || cadastro_usuario.idade            == null || cadastro_usuario.idade.length > 200 ||
        cadastro_usuario.data_nascimento  == undefined || cadastro_usuario.data_nascimento  == ""  || cadastro_usuario.data_nascimento  == null || cadastro_usuario.data_nascimento.length > 15 ||
        cadastro_usuario.email            == undefined || cadastro_usuario.email            == "" || cadastro_usuario.email            == null || cadastro_usuario.email.length > 30 ||
        cadastro_usuario.senha            == undefined || cadastro_usuario.senha            == "" || cadastro_usuario.senha            == null || cadastro_usuario.senha.length > 20 
    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    }else{
       let resultCadastro_usuario = await cadastro_usuarioDAO.insertCadastro_usuario(cadastro_usuario)

       if(resultCadastro_usuario)
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

const listarCadastros_usuario = async function(){
    
    try {
        let dadosCadastro_usuario = {}
        //Chamar a função que retorna todas as musicas
        
        let resultCadastro_usuario = await cadastro_usuarioDAO.selectAllcadastro_usuario()

    if(resultCadastro_usuario != false || typeof(resultCadastro_usuario) == 'object')
    {
        if(resultCadastro_usuario.length > 0){
            dadosCadastro_usuario.status = true
            dadosCadastro_usuario.status_code = 200
            dadosCadastro_usuario.itens = resultCadastro_usuario.length
            dadosCadastro_usuario.genero = resultCadastro_usuario

            return  dadosCadastro_usuario //200

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

const buscarCadastro_usuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else {
            let dadosCadastro_usuario = {}
            let resultCadastro_usuario = await cadastro_usuarioDAO.selectByidcadastro_usuario(id)

            if (resultCadastro_usuario != false || typeof(resultCadastro_usuario) == 'object'){
                if(resultCadastro_usuario.length > 0){
                    dadosCadastro_usuario.status = true
                    dadosCadastro_usuario.status_code = 200
                    dadosCadastro_usuario.genero = resultCadastro_usuario
                    return dadosCadastro_usuario //200
                }else{
                    return MESSAGE.ERROR_NOT_fOUND//404
                }
            }
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

const excluirCadastro_usuario= async function(id){
try {
    if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
        return MESSAGE.ERROR_REQUIRED_FIELDS
    }else {
          //validar se o ID existe
            let resultCadastro_usuario = await buscarCadastro_usuario(id)
        if(resultCadastro_usuario.status_code == 200){
            //Delete
            let result = await cadastro_usuarioDAO.deleteCadastro_usuario(id)
            if(result){
                return MESSAGE.SUCCESS_DELETED_ITEM //200
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }

        }else if(resultCadastro_usuario.status_code == 404){
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

const atualizarCadastro_usuario = async function(cadastro_usuario, id, contentType){
    try {
        if(String(contentType).toLowerCase()== 'application/json'){

            if( cadastro_usuario.nome             == undefined || cadastro_usuario.nome             == "" || cadastro_usuario.nome             == null || cadastro_usuario.nome.length > 80 ||
                cadastro_usuario.idade            == undefined || cadastro_usuario.idade            == "" || cadastro_usuario.idade            == null || cadastro_usuario.idade.length > 200 ||
                cadastro_usuario.data_nascimento  == undefined || cadastro_usuario.data_nascimento  == ""  || cadastro_usuario.data_nascimento  == null || cadastro_usuario.data_nascimento.length > 15 ||
                cadastro_usuario.email            == undefined || cadastro_usuario.email            == "" || cadastro_usuario.email            == null || cadastro_usuario.email          .length > 30||
                cadastro_usuario.senha            == undefined || cadastro_usuario.senha            == "" || cadastro_usuario.senha            == null || cadastro_usuario.senha          .length > 20         
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                //Validar se o ID existe no BD
                let resultCadastro_usuario = await buscarCadastro_usuario(id)

                if(resultCadastro_usuario.status_code == 200){

                    cadastro_usuario.id = id
                    let result = await cadastro_usuarioDAO.updateCadastro_usuario(cadastro_usuario)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM//200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
                    }

                }else if(resultCadastro_usuario.status_code == 404){
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
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports = {
    inserirCadastro_usuario,
    listarCadastros_usuario,
    buscarCadastro_usuario,
    excluirCadastro_usuario,
    atualizarCadastro_usuario
}