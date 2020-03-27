//COMPONENTE REACT
//toda funcao e arquivo de componente deve comecar em letra maiuscula se nao, nao funciona
import React from 'react';


//IMPORTANDO COMPONENTE DE ROTAS
import Routes from './routes';

//importando css
import './global.css'

// JSX (Javascript XML) => QUANDO O HTM ESTA INTEGRADO DENTRO DO JAVASCRIPT
function App() { //LIVE RELOAD => QUANDO O ARQUIVO É ALTERADO ELE MUDA NA HORA NA PAGINA

  // //desestruturando para uma variavel ficar com o valor e outra com o metodod de att
  // let [counter, setCounter] = useState(0);//metodo sempre retorna um array = [ valor, funcao de atualizacao]

  // function increment() { // funcao que vai ser chamada pelo botao de adicionar ao contador
  //   setCounter(counter + 1);//funcao q att o valor
  // }

  return (
    <Routes />
  );
}

export default App;
