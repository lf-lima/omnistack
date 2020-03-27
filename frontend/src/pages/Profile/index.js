import React, { useState, useEffect } from 'react';

//importando url base da api 
import api from '../../services/api';

import { Link , useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
    //array que vai receber os incidents da ong, podendo mudar com cada incident cadastrado
    const [incidents, setIncidents] = useState([]);

    //instanciando
    const history = useHistory();

    //pegando informacoes da ong logada pelo localStorage
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    //useEffect chama uma funcao sempre que a variavel q esta no array muda
    useEffect(() => {
        //setando o ongId no header da pagina, para a rota conseguir retornas os incidents da ong
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data.incidents)//atualizando o array de incidents
        })

    }, [ongId]);//sempre que o ongId mudar ele chama a funcao, se estiver vazio ou se nao mudar, ele chama 1 vez

    //funcao para deletar incidenst e att o array de incidents q é mostrado na tela
    async function handleDeleteIncidents(id) {//pegando id do incident a ser deletado
        try {
            
            //espera chamar a rota de delete
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });//deletado

            //limpando ele da tela
            setIncidents(incidents.filter(incident => incident.id !== id));
            
            // alert('Caso deletado!');
        } catch { 
            alert('Erro ao deletar, tente novamente!')
        }
    }

    //funcao para deslogar
    async function handleLogout() {
        //limpando localStorage com os dados da ong logada
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}!</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>

                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>

                {incidents.map(incident => {

                    return (
                        <li key={incident.id}>
                            <strong>CASO: </strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO: </strong>
                            <p>{incident.description}</p>

                            <strong>VALOR: </strong>
                            <p>
                                {/* funcao nativa do javascript para formatar valores, datas, etc */}
                                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                            </p>

                            <button type="button" onClick={()=> handleDeleteIncidents(incident.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};