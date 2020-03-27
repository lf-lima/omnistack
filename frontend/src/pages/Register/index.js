//importando react
import React, { useState } from 'react';//importando useState para ser possivel fazer alteracoes de variaveis

//importando url base para a api
import api from '../../services/api';

//importando link e history para fazer a navegacao por uma funcao javascript
import { Link , useHistory } from 'react-router-dom';

//importando icons
import { FiArrowLeft } from 'react-icons/fi';

//importando css
import './styles.css'

//importando images
import logoImg from '../../assets/logo.svg'

//exportando componente
export default function Register() {
    //salvando cada valor dos inputs 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    //instanciando
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,



            
            whatsapp,
            city,
            uf,
        };

        //se ele conseguir enviar os dados OK
        try {
            //espera chamar a rota e enviar os dados para ela realizar o cadastro
            const response = await api.post('ongs', data)
            //response para pegar o id da ong
            
            alert(`Seu ID de acesso: ${response.data.id}`)

            //redireciona para
            history.push('/');
        } 
        //se nao
        catch (err) { 
            alert('Erro no cadastro, tente novamente.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar a página Logon
                    </Link>
                </section>

                {/* quando o form da um submit ele chama a funcao para cadastro */}
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit"> Cadastrar </button>
                </form>

            </div>
        </div>
    );
}