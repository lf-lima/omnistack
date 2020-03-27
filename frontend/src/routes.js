import React from 'react';
//importando elementos para fazer as rotas
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//importando as pages
import Logon from './pages/Logon';//nao precisa chamar o index porq ele sempre procura por index.js quando entra em uma pasta
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

//exportando componente de rotas 
export default function Routes() {
    //retornando componente react
    return (
        //browserRouter tem q ficar em volta
        //para que o roteamento funcione
        //switch serve para que uma rota se mostrada por vez
        //Route "/" usa exact para dizer que tem q ser exatamente aquela rota pra nao sobre por as outras
        //porque e ve somente se a rota começa com o valor do path
        <BrowserRouter>
            <Switch>
                {/* rotas */}
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
            
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
}