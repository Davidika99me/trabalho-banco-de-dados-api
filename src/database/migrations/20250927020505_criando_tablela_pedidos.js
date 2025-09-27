/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('pedidos', (table) => {
    table.increments('id').primary();
    table.date('data_pedido').notNullable();
    table.integer('id_cliente').unsigned()
      .references('id').inTable('clientes')
      .onDelete('RESTRICT');
    table.decimal('valor_total', 10, 2).notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('pedidos');
}
