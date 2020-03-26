const knex = require("knex")
const configuration = require("../../knexfile")

//configura a coneccao com o base para dev
const connection = knex(configuration.development)

//exporta a config de connection
module.exports = connection;