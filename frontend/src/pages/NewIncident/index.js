import React, { useState } from 'react';

//importando link
import { Link , useHistory } from 'react-router-dom';

//importando icons
import { FiArrowLeft } from 'react-icons/fi';

//importando base url da api
import api from '../../services/api';

//importando images
import logoImg from '../../assets/logo.svg'

import './styles.css';

export default function NewIncident() {
    //campos para criar o incident
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    //instanciando
    const history = useHistory();

    //pegando dados da ong logada
    const ongId = localStorage.getItem('ongId');

    //dados a serem enviados
    const data = {
        title,
        description,
        value,
    }

    //funcao for newIncident
    async function handleNewIncident(e) {
        //interrompendo efeito de reload da pagina
        e.preventDefault();

        //instanciando a resposta e chamando a rota
        await api.post('incidents', data, { 
            headers: {
                Authorization: ongId,
            }
        })

        //redireciando para o profile da ong
        history.push('/profile');
    };

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home
                    </Link>
                </section>
                
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}    
                    ></textarea>
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit"> Cadastrar </button>
                </form>

            </div>
        </div>
    );
};