//connection DB
const connection = require("../database/connection");
//controller que vai listar os incidents só de uma ong

//exporta os metodos do controller 
module.exports = {
    //metodo de listagem
    async index(req,res) {
        //pega o id da ong logada no header da requisicao
        const ong_id = req.headers.authorization;

        //espera o banco encontrar os incidents
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)//procura todos com id da ong logada
            .select('*');//busca todos os campos

        return res.json({ incidents })
    }
}