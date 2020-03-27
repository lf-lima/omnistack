//npm instala pacote
//npx executa pacote

//figma para layouts
//notion para anotacoes
const express = require("express");
const cors = require("cors");


const routes = require("./routes")
const app = express();

//serve para q filtrar quem vai receber dados do meu backend
app.use(cors());

//Dizendo para o express que receberei requisições em obejtos json
app.use(express.json());

//ROTAS ABAIXO DISSO ^
app.use(routes)

//SPA - SINGLE PAGE APLICATION
//só leva dados como resposta
//a pagina nao recarrega
//retornando apenas json podemos ter quantos front-ends quisermos

//METODOLOGIA MVC
//Apenas 5 metodos por controller
/*
    1- index(listagem)
    2- create
    3- delete
    4- listagem apenas de um item
    5- edit

*/

/*
    Métodos HTTP:

    GET: Buscar uma informação do back-end
    POST: Criar uma informação no back-end
    PUT: Alterar uma informação no back-end
    DELETE: Deletar uma informação no back-end
*/

/*
    Tipos de parametros:

    Query: Parametros nomeados na rota apos o "?" => (filtros, paginaçao)
    Route Params: Parametros utilizados para identificar recursos apos o ":"
    Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/*
    BANCOS DE DADOS

    SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
    NoSQL: MongoDB, CouchDB, etc

    Driver: SELECT * FROM users
    //linguagem js => KNEXJs
    //npm install knex
    //npm install sqlite3 // ou outros
    //npx knex init => cria arquivo para as cfg de acesso ao DB, dev, prod e staging
    Query Builder: table('users').select('*').where()

*/

//Query
    //funciona como filtro pq retorna um obejto json e o banco trabalha com json, é só colocar esse objeto no filtro
    //const params = req.query;

    //Route params
    //const params = req.params;

    //Request Body
    //const params = req.body;




app.listen(3333, ()=>{
    console.log(">> SERVER ON <<");
    console.log("http://localhost:3333/");
});