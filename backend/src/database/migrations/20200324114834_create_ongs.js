//cria migration
//npx knex migrate:make create_incidents

//cria tabela
//npx knex migrate:latest

//desfaz a ultima migration
// npx knex migrate:rollBack

//lista todas as migrations
// npx knex migrate:status

//responsavel pela criacao da tabelaa
exports.up = function(knex) {
  //criando tabela
  return knex.schema.createTable('ongs', function (table) {
      //campos
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf').notNullable();
  })
};

//se precisar voltar atras na criacao serve pra deletar a table
exports.down = function(knex) {
  return knex.schema.dropTable('ongs')
};
