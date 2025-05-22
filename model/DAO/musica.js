/********************************************************************************************************************************
 * Objetivo: Model responsável pelo CRDU de dados de música pelo banco de dados 
 * Data: 13/02/2025
 * Autor: João pedro
 * Versão: 1.0
 ********************************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

  //Instanciando (criar um novo objeto) para realizar a manipulação do script SQL
  const prisma = new PrismaClient()

//Função para inserir uma nova música no banco de dados
const insertMusica = async function(musica){

  
    try {

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
   


     }catch (error) {
        console.log(error)
            return false
     }

}

//Função para atualizar uma música existente no banco de dados
const updateMusica = async function(musica){
    try {
        let sql = `update tbl_musica set    nome            = '${musica.nome}',
                                            link            = '${musica.link}',
                                            duracao         = '${musica.duracao}' ,
                                            data_lancamento = '${musica.data_lancamento}',
                                            foto_capa       = '${musica.foto_capa}',
                                            letra           = '${musica.letra}'
            where id=${musica.id} `

      //Executa o script SQL no BD e aguarda o retorno dos dados
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
    } catch (error) {
        return false
    }
}

//Funçãp para excluir uma música existente no banco de dados
const deleteMusica = async function(id){
    try {
        //Script SQL
        let sql = 'delete from tbl_musica where id='+id

        //Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para retornar todas as músicas do banco de dados
const selectAllMusica = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_musica order by id desc'

        //Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {        
        console.log(error)

        return false
    }

}

//Função para buscar uma música pelo ID no banco de dados
const selectByidMusica = async function(id){
    try {
        //Script SQL
        let sql = 'select * from tbl_musica where id='+id

        //Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByidMusica
}