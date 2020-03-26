const connection = require('../database/connection'); //connection DB

//exportando metodos do controller
module.exports = {
    //metodo de listagem
    async index(req,res) {
        //ESQUEMA DE PAGINAÇÃO
        //busca por um parametro de pagina
        const { page = 1 } = req.query; //Se o parametro nao existir fica com padrão o 1

        //contador de incidents
        const [count] = await connection('incidents').count();//procura todos os incidents e conta
        
        //await para esperar a busca de incidents
        const incidents = await connection('incidents')
                            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//coloca os dados da ong relacionada ao incident no obj de resposta
                            .limit(5)//limite de 5 registros por vez
                            .offset((page - 1 ) * 5)//pula sempre 5 registros de acordo com o numero da pagina
                            .select([//selecao de campos desejados da ong e do incident para q o id da ong nao sobreponha o do incident
                                'incidents.*',
                                'ongs.name',
                                'ongs.email',
                                'ongs.whatsapp',
                                'ongs.city',
                                'ongs.uf'
                            ]);

        //retorna o valor total de incidents pelo cabecalho de resposta da pagina
        res.header('X-Total-Count', count['count(*)'])

        return res.json({ incidents });
    },
    //metodo de criacao
    async create(req,res) {
        //recebe os values do corpo da pagina
        const { title, description, value } = req.body;

        //dados da autenticacao de usuarios
        //caracteriza o contexto da requisicao
        const ong_id = req.headers.authorization;//cabecalho da requisicao

        //insere na tabela
        //await para esperar a insercao
        //por ser uma insercao unica retorna um array de uma posica
        //portanto faço a desestruturacao com [id], e digo que o primeiro valor do array é armazenado no id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id })
    },

    async delete(req,res) {
        //pq o id do incident a ser deletado
        const { id } = req.params;
        //pega o id da ong logada para fazer a comparacao se realmente esse incidente é dessa ong
        //para q uma ong nao delete um incident de outra ong
        const ong_id = req.headers.authorization;//id ong logada

        const incident = await connection('incidents')
        .where('id', id)//procura o incident com o id igual ao requerido
        .select('ong_id')//seleciona apenas a coluna ong_id do incident
        .first();//retorna apenas um resultado (como existe só 1 incident com esse id ja iria retornar 1)
        
        //se o incident nao existir
        if(!incident) {
            //retorna msg de erro
            //http status code 400 => bad request
            return res.status(400).json({ error: "Incident dont exist"});
        }

        //se o id da ong registrado no incident a ser deletado
        //for diferente do id da ong logada
        //retorna um erro de nao autorizado
        if(incident.ong_id !== ong_id) {
            //http status code 401 = unathorized
            return res.status(401).json({ error: 'Operation not permitted'});
        }
        
        // se for tudo igual, deleta o incident
        await connection('incidents').where('id', id).delete();

        //http status code 204 = retorno de resposta sem conteudo
        return res.status(204).send()//envia resposta
    }
}