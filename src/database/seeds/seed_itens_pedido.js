/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {

  await knex('itens_pedido').del();


  const pedidos = await knex('pedidos').select('id').orderBy('id');
  const produtos = await knex('produtos').select('id').orderBy('id');


  if (pedidos.length < 4 || produtos.length < 14) {
    throw new Error('Não há pedidos ou produtos suficientes para popular itens_pedido');
  }


  await knex('itens_pedido').insert([
    { id_pedido: pedidos[0].id, id_produto: produtos[2].id, quantidade: 1, preco_unitario: 7299 },
    { id_pedido: pedidos[0].id, id_produto: produtos[3].id, quantidade: 1, preco_unitario: 4599 },

    { id_pedido: pedidos[1].id, id_produto: produtos[4].id, quantidade: 1, preco_unitario: 7599 },
    { id_pedido: pedidos[1].id, id_produto: produtos[9].id, quantidade: 1, preco_unitario: 5999 },

    { id_pedido: pedidos[2].id, id_produto: produtos[10].id, quantidade: 1, preco_unitario: 6599 },
    { id_pedido: pedidos[2].id, id_produto: produtos[12].id, quantidade: 1, preco_unitario: 5899 },

    { id_pedido: pedidos[3].id, id_produto: produtos[13].id, quantidade: 1, preco_unitario: 1299 }
  ]);
}
