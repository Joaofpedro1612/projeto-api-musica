/********************************************************************************************************************************
 * Objetivo: Model responsável pelo CRDU de dados de música pelo banco de dados 
 * Data: 13/02/2025
 * Autor: João pedro
 * Versão: 1.0
 ********************************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

//Função para inserir uma nova música no banco de dados
const insertMusica = async function(musica){
    //Instanciando (criar um novo objeto) para realizar a manipulação do script SQL
    const prisma = new PrismaClient()

    let sql = `insert into tbl_musica( nome,
                                       link,    
                                       duracao,
                                       data_lancamento,
                                       foto_capa,
                                       letra
                                    )
                             values (
                                        '${musica.nome}',
                                        '${musica.link}',
                                        '${musica.duracao}',
                                        '${musica.data_lancamento}',
                                        '${musica.foto_capa}',
                                        '${musica.letra}'
                                    
                                    )`

let result = await prisma.$executeRawUnsafe(sql)

if(result)
    return true
else
    return false

}

//Função para atualizar uma música existente no banco de dados
const updateMusica = async function(){
}

//Funçãp para excluir uma música existente no banco de dados
const deleteMusica = async function(){
}

//Função para retornar todas as músiacas do banco de dados
const selectAllMusica = async function(){
}

//Função para buscar uma música pelo ID no banco de dados
const selectByidMusica = async function(){
}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByidMusica
}