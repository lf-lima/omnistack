//cria migration
//npx knex migrate:make create_incidents

//cria tabela
//npx knex migrate:latest

//desfaz a ultima migration
// npx knex migrate:rollBack

//lista todas as migrations
// npx knex migrate:status

exports.up = function (knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments();//auto incremento
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();//float

    //relacionamento
    table.string('ong_id').notNullable();
    //chave estrangeira
    table.foreign('ong_id')/*campo*/.references('id')/*campo da outra table*/.inTable('ongs')//qual tabela esta se referenciando

  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('incidents');
};
