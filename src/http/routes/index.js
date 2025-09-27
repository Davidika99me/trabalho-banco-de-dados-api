import { database } from '../../database/index.js'
import { list, listById, deleteById } from '../controllers/marcas.js'
import { listprod, listprodById, createProduct } from '../controllers/produtos.js'
import { listClients, listClientById, createClient } from '../controllers/clientes.js'
import { listPedidos, listPedidoById, createPedido, listPedidosByCidade } from '../controllers/pedidos.js'

export const routes = async(app) => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "API Ok."})
    })

    //rotas da tabela marcas
    app.get('/marcas', list)
    app.get('/marcas/:id', listById)
    app.delete('/marcas/:id', deleteById)

    //rotas da tabela produtos
    app.get('/produtos',listprod)
    app.get('/produtos/:id',listprodById)
    app.post('/produtos',createProduct)

    //rotas da tabela clentes
    app.get('/clientes',listClients)
    app.get('/clientes/:id',listClientById)
    app.post('/clientes',createClient)

    //rotas da tabela pedidos
    app.get('/pedidos',listPedidos)
    app.get('/pedidos/:id',listPedidoById)
    app.get('/pedidos/cidade/:cidade', listPedidosByCidade)
    app.post('/pedidos', createPedido);
}