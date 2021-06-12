import CicloVida from './components/cicloVida';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      montar: false,
      valor: 3,
    };
  }

  cambio = () =>{
    this.temporizador = setInterval(()=>{
      this.setState({valor: Math.random() > .5 ? 1 : 2})
    },2000);
  };

  iniciarValor=()=>{
      this.cambio();
  }
  detenerValor = () =>{
      clearInterval(this.temporizador);
  }

  
  render(){
    const {montar, valor} = this.state;
    return (
      <div className="App">
        <div className="App-header">
        <div>
          {montar && <CicloVida 
            valor={valor}
            iniciarValor={this.iniciarValor}
            detenerValor={this.detenerValor}
            posicionCiclo={this.posicionCiclo}
          />}
        </div>
        <button 
          onClick={()=>this.setState({montar: !montar})}
          >toggle Montar</button>
        </div>
      </div>
    );
  }
}

export default App;
