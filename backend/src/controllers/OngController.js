//controller das ongs para abstrair a logica dos rotas

//pacote de criptografia do node
const crypto = require("crypto")

//recebe a coneccao com o DB
const connection = require("../database/connection")

//EXPORTA METODOS DAS ONGS
module.exports = {
    //METEDO QUE LISTA AS ONGS
    async index(req,res) {
        //pega todas as ongs da tabela
        const ongs = await connection('ongs').select("*");
    
        return res.json({ ongs })
    },

    //METODO DE CRIACAO DAS ONGS
    async create(req,res) { //funcao async para o node esperar a insercao de de dados no banco
        const { name, email, whatsapp, city, uf} = req.body;
        const id = crypto.randomBytes(4).toString('HEX')//gera 4 bytes de caracteres aleatorios e converte para hexadecimal
    
        //inseri dados em uma table
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        //retorna o id para a ong fazer o login
        return res.json({ id })
    }
}