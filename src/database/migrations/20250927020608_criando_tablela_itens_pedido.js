/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('itens_pedido', (table) => {
    table.increments('id').primary();
    table.integer('id_pedido').unsigned()
      .references('id').inTable('pedidos')
      .onDelete('RESTRICT'); 
    table.integer('id_produto').unsigned()
      .references('id').inTable('produtos')
      .onDelete('CASCADE'); 
    table.integer('quantidade').unsigned().notNullable();
    table.decimal('preco_unitario', 10, 2).notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('itens_pedido');
}
