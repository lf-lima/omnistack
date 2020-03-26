//Controller de login da ONG

//connection DB
const connection = require("../database/connection");

//exporta metodos
module.exports = {
    //metodo de criar uma session 
    async create(req,res) {
        const { id } = req.body;//recebe o id da ong do corpo da pagina

        //espera procurar pela ong no DB
        const ong = await connection('ongs')//procura na tabela das ongs
                    .where('id', id)//por uma com o id igual ao requerido
                    .select('name')//e pega seu nome
                    .first();//pega o primeiro resultado
        
        //se a ong nao existir
        if(!ong) {
            //http status code 400 => bad request
            return res.status(400).json({
                //msg de erro
                error: 'No ONG found with this ID'
            })
        }

        return res.json( ong )
        

    }
}