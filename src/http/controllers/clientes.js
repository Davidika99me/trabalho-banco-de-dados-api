import { database } from '../../database/index.js'

export async function listClients(req, res){
    try {
        const query = await database('clientes').select();
    
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

export async function listClientById(req, res){
    try {
        const { id } = req.params
        const query = await database('clientes').where('id', id);

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

export async function createClient(req, res) {
    try {
        const { nome, email, cidade } = req.body;

        
        if (!nome || !email) {
            return res.status(400).send({
                message: 'Nome e email são obrigatórios.',
                data: {},
                error: true
            });
        }

       
        const [id] = await database('clientes').insert({ nome, email, cidade });

      
        res.status(201).send({
            message: 'Cliente criado com sucesso.',
            data: { id, nome, email, cidade },
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