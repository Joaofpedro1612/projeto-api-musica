/******************************************************************************
 * Objetivo: Arquivo de configuração de projeto, onde teremos mensagens padronizadas
 *      variavel e constantes para o projeto
 * Data: 13/02/2025
 * Autor: Joao Pedro
 * versão: 1.0
 */
/************************* MENSAGENS DE STATUS DA API **************************/

/************************* MENSAGENS DE ERRO ****************************/
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem campos com o preenchimento obrigatorios que não foram encotrados!!!'}
const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Devido a erro interno no servidor, não foi possivel realizar a requisição!!!'}

/************************* MENSAENS DE SUCESSO **************************/

const SUCCESS_CREATED_ITEM = {status:true, status_code: 201, message: 'Item criado com sucesso!!!'}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER,
    SUCCESS_CREATED_ITEM
}