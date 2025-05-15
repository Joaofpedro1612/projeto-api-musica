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
const insertPlaylist = async function(playlist){

  
    try {

    let sql = `insert into tbl_playlist(nome, 
                                        data_criacao
                                    )
                             values (
                                        '${playlist.nome}',
                                        '${playlist.data_criacao}';
        
                                    )`

let result = await prisma.$executeRawUnsafe(sql)

if(result)
    return true
else
    return false
   


     }catch (error) {
            return false
     }

}



const selectAllcadastro_usuario = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_cadastro_usuario order by id_cadastro_usuario desc'

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

const selectByidcadastro_usuario = async function(id){
    try {
        //Script SQL
        let sql = 'select * from tbl_cadastro_usuario where id='+id

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

const deleteCadastro_usuario = async function(id){
    try {
        //Script SQL
        let sql = 'delete from tbl_cadastro_usuario where id_cadastro_usuario='+id

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

const updateCadastro_usuario = async function(cadastro_usuario){
    try {
        let sql = `update tbl_tbl_cadastro_usuario set    nome = '${cadastro_usuario.nome}'      
            where id=${cadastro_usuario.id} `

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
    insertCadastro_usuario,
    selectAllcadastro_usuario,
    insertCadastro_usuario,
    deleteCadastro_usuario,
    updateCadastro_usuario
}