import { database } from '../../database/index.js'

export async function listprod(req, res){
    try {
        const query = await database('produtos').select();
    
        res.status(200).send({
            message: 'Dados consultados com sucesso.',
            data: query,
            error: false
        })
    } catch (error) {
        res.status(500).send({
            message: 'Erro no servidor.',
            data: "",
            error: true
        })
    }
}

export async function listprodById(req, res){
    try {
        const { id } = req.params
        const query = await database('produtos').where('id', id);

        if(!query.length) {
            return res.status(200).send({
                message: 'Dados consultados com sucesso.',
                data: {},
                error: false
            })
        }

        return res.status(200).send({ 
            message: 'Dados consultados com sucesso.',
            data: query[0],
            error: false
        }) 
    } catch (error) {
        res.status(500).send({
            message: 'Erro no servidor.',
            data: "",
            error: true
        })
    }
}

export async function createProduct(req, rep) {
    try {
        const { nome, preco, estoque, id_marca } = req.body;

        
        if (!nome || preco == null || estoque == null || !id_marca) {
            return rep.status(400).send({
                message: 'Os campos (nome, preco, estoque, id_marca) são obrigatórios.',
                data: {},
                error: true
            });
        }

       
        const [id] = await database('produtos').insert({ nome, preco, estoque, id_marca });

       
        rep.status(201).send({
            message: 'Produto criado com sucesso.',
            data: { id, nome, preco, estoque, id_marca },
            error: false
        });

    } catch (error) {
        rep.status(500).send({
            message: 'Erro no servidor.',
            data: error.message,
            error: true
        });
    }
}