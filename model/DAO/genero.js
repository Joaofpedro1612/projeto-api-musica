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
const insertGenero = async function(genero){

  
    try {
    let sql = `insert into tbl_genero(
                                       nome
                                    )
                             values (
                                        '${genero.nome}'
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

const selectAllGenero = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_genero order by id_genero desc'

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
        let sql = 'delete from tbl_genero where id_genero='+id

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
    insertGenero,
    selectAllGenero,
    deleteGenero
}