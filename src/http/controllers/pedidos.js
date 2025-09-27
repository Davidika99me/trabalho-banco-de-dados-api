import { database } from '../../database/index.js';


export async function listPedidos(req, res) {
  try {
    const pedidos = await database('pedidos').select();


    const pedidosComItens = await Promise.all(
      pedidos.map(async (pedido) => {
        const itens = await database('itens_pedido')
          .where('id_pedido', pedido.id);
        return { ...pedido, itens };
      })
    );

    res.status(200).send({
      message: 'Dados consultados com sucesso.',
      data: pedidosComItens,
      error: false
    });
  } catch (error) {
    res.status(500).send({
      message: 'Erro no servidor.',
      data: error.message,
      error: true
    });
  }
}


export async function listPedidoById(req, res) {
  try {
    const { id } = req.params;
    const pedido = await database('pedidos').where('id', id).first();

    if (!pedido) {
      return res.status(404).send({
        message: 'Pedido não encontrado.',
        data: {},
        error: true
      });
    }

    const itens = await database('itens_pedido').where('id_pedido', id);
    res.status(200).send({
      message: 'Dados consultados com sucesso.',
      data: { ...pedido, itens },
      error: false
    });
  } catch (error) {
    res.status(500).send({
      message: 'Erro no servidor.',
      data: error.message,
      error: true
    });
  }
}


export async function listPedidosByCidade(req, res) {
  try {
    const { cidade } = req.params;

    const pedidos = await database('pedidos')
      .join('clientes', 'pedidos.id_cliente', 'clientes.id')
      .where('clientes.cidade', cidade)
      .select('pedidos.*');

    const pedidosComItens = await Promise.all(
      pedidos.map(async (pedido) => {
        const itens = await database('itens_pedido').where('id_pedido', pedido.id);
        return { ...pedido, itens };
      })
    );

    res.status(200).send({
      message: 'Dados consultados com sucesso.',
      data: pedidosComItens,
      error: false
    });
  } catch (error) {
    res.status(500).send({
      message: 'Erro no servidor.',
      data: error.message,
      error: true
    });
  }
}


export async function createPedido(req, res) {
  const { data_pedido, id_cliente, valor_total, itens } = req.body;

  if (!data_pedido || !id_cliente || valor_total == null || !itens?.length) {
    return res.status(400).send({
      message: 'Todos os campos do pedido e os itens são obrigatórios.',
      data: {},
      error: true
    });
  }

  try {
    await database.transaction(async (trx) => {
    
      const [id_pedido] = await trx('pedidos').insert({
        data_pedido,
        id_cliente,
        valor_total
      });

   
      const itensInserir = itens.map(item => ({
        id_pedido,
        id_produto: item.id_produto,
        quantidade: item.quantidade,
        preco_unitario: item.preco_unitario
      }));

      await trx('itens_pedido').insert(itensInserir);

      res.status(201).send({
        message: 'Pedido criado com sucesso.',
        data: { id: id_pedido, data_pedido, id_cliente, valor_total, itens: itensInserir },
        error: false
      });
    });
  } catch (error) {
    res.status(500).send({
      message: 'Erro ao criar o pedido.',
      data: error.message,
      error: true
    });
  }
}
