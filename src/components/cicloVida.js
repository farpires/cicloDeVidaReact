/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
class Reloj extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        console.log(" ---------------------componentWillUnmount: DESMONTAJE-----------------");
        console.log(" SE EJECUTA: componentWillUnmount");
        console.log(3, "El componente ha sido eliminado del DOM");
        window.removeEventListener('resize', this.onResize);
        this.props.IniciarCambioColor('compWillUnmounColort');
        console.log(" ----------------------------------------------------------------------");
    }


    render() {
        return <h3>{this.props.hora}</h3>
    }
}

export default class CicloVida extends Component {
    //para ver como se ejecuto estos momente se ejecuta unos consol log
    constructor(props) {
        super(props)
        console.log(" ///////////////// constructor: MONTAJE //////////////////");
        console.log(" SE EJECUTA: constructor de la clase CicloVida");
        console.log(0, "el componente se inicializa, aun NO esta en el DOM ");
        this.state = {
            hora: new Date().toLocaleTimeString(),
            color: 'red',
            visible: false,
            compDidMountColor: 'gray',
            compDidUpdateColor: 'gray',
            compWillUnmounColort: 'gray',

        }
        this.temporizador = null;
        this.tempTime = null;
        this.tempTimeNormal = null;
        this.onResize = this.onResize.bind(this);

    }

    IniciarCambioColor = (param) => {
        let parametros = {
            [param]: 'green',
            soyColor: true
        }
        let parametros2 = {
            [param]: 'gray',
            soyColor: true
        }

        if (param === 'compDidUpdateColor') {
            this.setState(parametros);
            this.tempTimeNormal = setTimeout(() => {
                this.setState(parametros2);
            }, 3000);
        }

        if (param === 'compDidMountColor' || param === 'compWillUnmounColort') {
            this.setState(parametros);
            this.tempTimeNormal = setTimeout(() => {
                this.setState(parametros2);
            }, 3000);
        }

    }



    onResize(e) {
        const width = e.target.innerWidth;
        const { color } = this.state;
        console.log('onResize', width);

        if (width > 500 && color !== 'red') {
            this.setState({ color: 'red' });
            this.IniciarCambioColor('compDidUpdateColor')
        } else if (width <= 500 && color !== 'blue') {
            this.setState({ color: 'blue' });
            this.IniciarCambioColor('compDidUpdateColor')
        }
    }



    /**
     * MONTAJE
     * se configurar la primera ves que se monta el componente:
     * _ se puede registrar ciertos eventos
     * _ actualizar ciertas variables que van a inicializar el stado o estilo etc...
     */
    componentDidMount() {
        console.log(" ---------------------componentDidMount--------------------------------");
        console.log(" SE EJECUTA: componentDidMount");
        console.log(1, "El componente ya se encuentra el DOM");
        window.addEventListener('resize', this.onResize);
        this.IniciarCambioColor('compDidMountColor');
        console.log(" ----------------------------------------------------------------------");

    }
    //DESMONTAJE
    componentWillUnmount() {
        console.log(" ---------------------componentWillUnmount: DESMONTAJE-----------------");
        console.log(" SE EJECUTA: componentWillUnmount");
        console.log(3, "El componente ha sido eliminado del DOM");
        window.removeEventListener('resize', this.onResize);
        this.IniciarCambioColor('compWillUnmounColort');
        console.log(" ----------------------------------------------------------------------");
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.color !== this.state.color) {
            console.log(" ---------------------componentDidUpdate: STATE------------------------");
            console.log(" SE EJECUTA: componentDidUpdate");
            console.log(2, "CAMBIO EN STATE: El estado del COLOR se ha cambiao");
            console.log('prev state', prevState.color);
            console.log('new state', this.state.color);
            console.log(" ----------------------------------------------------------------------");
        }

        if (prevProps.valor !== this.props.valor) {
            console.log(" ---------------------componentDidUpdate: PROPS------------------------");
            console.log(" SE EJECUTA: componentDidUpdate");
            console.log(2, "CAMBIO EN PROPS: El props VALOR se ha cambiado");
            console.log('valor a cambiado');
            console.log(" ----------------------------------------------------------------------");
        }
        if (prevState.hora !== this.state.hora) {
            console.log(" ---------------------componentDidUpdate: STATE------------------------");
            console.log(" SE EJECUTA: componentDidUpdate");
            console.log(2, "CAMBIO EN STATE: El estado de la HORA se ha cambiao");
            console.log('prev state', prevState.hora);
            console.log('new state', this.state.hora);
        }
        if (prevState.compDidMountColor !== this.state.compDidMountColor ||
            prevState.compDidUpdateColor !== this.state.compDidUpdateColor ||
            prevState.compWillUnmounColort !== this.state.compWillUnmounColort
        ) {
            console.log(" ---------------------componentDidUpdate: STATE------------------------");
            console.log(" SE EJECUTA: componentDidUpdate");
            console.log(2, "CAMBIO EN STATE: El color de los titulos se ha cambiado");
            console.log('compDidMountColor');
            console.log('prev state', prevState.compDidMountColor);
            console.log('new state', this.state.compDidMountColor);
            console.log('compDidUpdateColor');
            console.log('prev state', prevState.compDidUpdateColor);
            console.log('new state', this.state.compDidUpdateColor);
            console.log('compWillUnmounColort');
            console.log('prev state', prevState.compWillUnmounColort);
            console.log('new state', this.state.compWillUnmounColort);
            console.log(" -----------------------------------------------------------------------");
        }
    }


    tictac = () => {
        this.temporizador = setInterval(() => {
            this.setState({
                hora: new Date().toLocaleTimeString()
            });
        }, 1000);
    };

    iniciar = () => {
        this.tictac();
        this.setState({
            visible: true,
        })
        this.IniciarCambioColor('compDidUpdateColor');
    }
    detener = () => {
        clearInterval(this.temporizador);
        this.setState({
            visible: false,
        })
    }
    render() {
        console.log(" **********************render: RENDER*********************************");
        console.log(" SE EJECUTA: render");
        console.log(4, "El componente se dibuja (o re dibuja por algun cambio)en el DOM");
        const {
            color,
            compDidMountColor,
            compDidUpdateColor,
            compWillUnmounColort,
        } = this.state;
        const { valor, iniciarValor, detenerValor } = this.props;
        return (
            <>
                <div style={{ padding: 40 }}>
                    <a href={"https://es.reactjs.org/docs/react-component.html#componentdidmount"} style={{ padding: 20, backgroundColor: compDidMountColor, margin: 10 }}>componentDidMount</a>
                    <a href={"https://es.reactjs.org/docs/react-component.html#componentdidupdate"} style={{ padding: 20, backgroundColor: compDidUpdateColor, margin: 10 }}>componentDidUpdate</a>
                    <a href={"https://es.reactjs.org/docs/react-component.html#componentwillunmount"} style={{ padding: 20, backgroundColor: compWillUnmounColort, margin: 10 }}>componentWillUnmount</a>
                </div>
                <div style={{ backgroundColor: color, padding: '1rem' }}>
                    Ciclo de Vida de un Componente
                    {valor !== 3 ? <h3>valor {valor}</h3> : null}
                </div>

                <button onClick={() => {
                    iniciarValor();
                    this.IniciarCambioColor('compDidUpdateColor')
                }}>Iniciar Cambio de Valor</button>
                <button onClick={() => {
                    this.IniciarCambioColor('compDidUpdateColor')
                    detenerValor()
                }}>Detener Cambio de Valor</button>

                <h3>RELOJ</h3>

                <div style={{ backgroundColor: 'blueviolet' }}>
                    {this.state.visible && <Reloj
                        hora={this.state.hora}
                        IniciarCambioColor={this.IniciarCambioColor}

                    />}
                </div>
                <button onClick={this.iniciar}>Iniciar</button>
                <button onClick={this.detener}>Detener</button>

            </>
        )
    }
}