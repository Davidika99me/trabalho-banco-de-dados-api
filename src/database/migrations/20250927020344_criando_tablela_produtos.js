/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('produtos', (table) => {
    table.increments('id').primary();
    table.string('nome', 100).notNullable();
    table.decimal('preco', 10, 2).notNullable();
    table.integer('estoque').unsigned().notNullable();
    table.integer('id_marca').unsigned().references('id').inTable('marcas').onDelete('CASCADE');
  });
}

export function down(knex) {
  return knex.schema.dropTable('produtos');
}
