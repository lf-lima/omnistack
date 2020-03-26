const express = require("express");

//recebe a coneccao com o DB
const connection = require("./database/connection")

//importacao dos controllers
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

//ROTAS
const router = express.Router();

//Rota => Login
//post pq cria uma nova session 
router.post('/sessions', SessionController.create);

//Rotas => ONG
//rota para listar ongs
router.get('/ongs', OngController.index);
//rota para criar ongs
router.post('/ongs', OngController.create); //rota recebe apenas o controller com metodo de create

//Rota => Lista incidents de uma ONG
router.get('/profile', ProfileController.index);

//Rotas => Incidents
//rota para listar os incidents
router.get('/incidents', IncidentController.index);
//rota para criar os incidents
router.post('/incidents', IncidentController.create);
//rota para deletar o incident
router.delete('/incidents/:id', IncidentController.delete);



//EXPORTAS AS ROTAS PRO APP RECEBER ELAS
module.exports = router;