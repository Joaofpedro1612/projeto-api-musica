/********************************************************************************************************************************
 * Objetivo: Model responsável pelo CRDU de dados de genero pelo banco de dados 
 * Data: 13/02/2025
 * Autor: João pedro
 * Versão: 1.0
 ********************************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

  //Instanciando (criar um novo objeto) para realizar a manipulação do script SQL
  const prisma = new PrismaClient()

//Função para inserir um novo gênero no banco de dados
const insertPlaylist = async function(playlist){

  
    try {
    let sql = `insert into tbl_playlist (
                                        nome,
                                        data_criacao   
                                         ) 
                                        values 
                                        (   
                                        '${playlist.nome}', 
                                        '${playlist.data_criacao}');`

let result = await prisma.$executeRawUnsafe(sql)

if(result)
    return true
else
    return false
   

     }catch (error) {
            return false

     }



}

const selectAllGenero = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_genero order by id desc'

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

const selectByidGenero = async function(id){
    try {
        //Script SQL
        let sql = 'select * from tbl_genero where id='+id

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

const deleteGenero = async function(id){
    try {
        //Script SQL
        let sql = 'delete from tbl_genero where id='+id

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

const updateGenero = async function(genero){
    try {
        let sql = `update tbl_genero set nome = '${genero.nome}'      
            where id=${genero.id} `

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

module.exports = {
    insertPlaylist,
    selectAllGenero,
    selectByidGenero,
    deleteGenero,
    updateGenero
}