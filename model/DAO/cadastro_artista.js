const { PrismaClient } = require('@prisma/client')

  //Instanciando (criar um novo objeto) para realizar a manipulação do script SQL
  const prisma = new PrismaClient()

//Função para inserir uma nova música no banco de dados
const insertCadastro_artista = async function(cadastro_artista){

  
    try {

    let sql = `insert into tbl_cadastro_artista( nome,
                                                 nome_artistico,   
                                                 idade,    
                                                 data_nascimento,
                                                 email,
                                                 senha
                                    )
                             values (
                                        '${cadastro_artista.nome}',
                                        '${cadastro_artista.nome_artistico}',
                                        '${cadastro_artista.idade}',
                                        '${cadastro_artista.data_nascimento}',
                                        '${cadastro_artista.email}',
                                        '${cadastro_artista.senha}',
        
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



const selectAllcadastro_artista = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_cadastro_artista order by id_cadastro_artista desc'

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

const selectByidcadastro_artista = async function(id){
    try {
        //Script SQL
        let sql = 'select * from tbl_cadastro_artista where id='+id

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

const deleteCadastro_artista = async function(id){
    try {
        //Script SQL
        let sql = 'delete from tbl_cadastro_artista where id_cadastro_artista='+id

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

const updateCadastro_artista = async function(cadastro_artista){
    try {
        let sql = `update tbl_tbl_cadastro_artista set    nome = '${cadastro_artista.nome}'      
            where id=${cadastro_artista.id} `

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
