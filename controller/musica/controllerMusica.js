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
const inserirMusica = async function(musica){
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
        return MESSAGE.ERROR_INTERNAL_SERVER//500

    }
}

//Função para atualizar uma música
const atualizarMusica = async function(){

}

//Função para excluir uma música
const excluirMusica = async function(){

}

//Função para retornar todas uma música
const lisitarMusica = async function(){

}

//Função para retornar uma música pelo ID
const buscarMusica = async function(){

}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    lisitarMusica,
    buscarMusica
}