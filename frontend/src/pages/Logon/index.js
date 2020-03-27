//componente de logon

//importando react
import React, {useState} from 'react';

//importando url base para api
import api from '../../services/api';

//importando nova tag de link do react que funciona como um "a", mas aplica o efeito SPA, e nao recarrega a pagina inteira
import { Link , useHistory } from "react-router-dom";

//icones para react
//npm install react-icons
import { FiLogIn } from 'react-icons/fi';

//importando images
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

//importando styles css
import './styles.css';

//exportando componente
export default function Logon(){

    //dados do input
    const [ id , setId ] = useState('');
    
    //instanciando
    const history = useHistory();
    
    //funcao para login
    async function handleLogin(e) {
        //cancelando regarregamento de pagina do evento submit
        e.preventDefault();
        const data = {
            id,
        }

        try {
            //esperando enviar para rota
            const response = await api.post('sessions', data);
            
            //armazena o id e nome da ong para sempre saber qual esta logada
            localStorage.setItem('ongId', data.id);
            localStorage.setItem('ongName', response.data.name);

            //redireciona para o profile da ong
            history.push('/profile');


        } catch (error) {
            alert('Erro fazer Logon, tente novamente!');
        }    
    }


    return (//retorna objetos html
    //No react sempre deve haver um elemento envolvendo os outros se nao da erro
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                {/* quando receber submit chama a funcao de login */}
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    {/* para conseguir mudar o valor do id chama a fucao de att no onChange */}
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Entrar</button>

                    {/* tag link funciona como uma tag "a" */}
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>  

            <img src={heroesImg}  alt="Heroes"/>
        </div>
    )
};