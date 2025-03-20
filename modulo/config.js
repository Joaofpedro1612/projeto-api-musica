/******************************************************************************
 * Objetivo: Arquivo de configuração de projeto, onde teremos mensagens padronizadas
 *      variavel e constantes para o projeto
 * Data: 13/02/2025
 * Autor: Joao Pedro
 * versão: 1.0
 */
/************************* MENSAGENS DE STATUS DA API **************************/

/************************* MENSAGENS DE ERRO ****************************/
const ERROR_REQUIRED_FIELDS =            {status: false, status_code: 400, message: 'Existem campos com o preenchimento obrigatorios que não foram encotrados!!!'}
const ERROR_INTERNAL_SERVER_MODEL =      {status: false, status_code: 500, message: 'Devido a erro interno no servidor de modelagem de dados, não foi possivel realizar a requisição!!!'}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Devido a erro interno no servidor de controle de dados, não foi possivel realizar a requisição!!!'}
const ERROR_CONTENT_TYPE=                {status: false, status_code: 415, message: 'Não foi possível processar a requisição, pois os tipo de dados enviados não foram aceitos na API. Você deve encaminhar apenas JSON'}
const ERROR_NOT_fOUND =                  {status: false, status_code: 415, message: 'Não foram encontrados itens para retorno'}
/************************* MENSAENS DE SUCESSO **************************/

const SUCCESS_CREATED_ITEM = {status:true, status_code: 201, message: 'Item criado com sucesso!!!'}
const SUCCESS_DELETED_ITEM = {status:true, status_code: 200, message: 'Item excluído com sucesso!!!'}
const SUCCESS_UPDATED_ITEM = {status:true, status_code: 200, message: 'Item atualizado com sucesso!!!'}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_fOUND,
    SUCCESS_CREATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATED_ITEM
}