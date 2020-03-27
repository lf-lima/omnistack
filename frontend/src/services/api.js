//services é todo tipo de arquivo que vai prover algum tipo de integracao com algum servico externo

//AXIOS cliente http, é responsavel por conseguir fazer chamadas a nossa api do backend e obter as respostar
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333',//url base para todas as rotas
})

export default api; //para outros arquivos conseguirem importar essa url

//api.tipoDaRota('rota', { headers: {}})