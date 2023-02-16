export class VistaDivBotones {
    constructor(controlador, div) {
        this.controlador = controlador;
        this.div = div;
        this.botonListado = this.div.getElementsByTagName('button')[0];
        this.botonAlta = this.div.getElementsByTagName('button')[1];
        this.botonModificar = this.div.getElementsByTagName('button')[2];
        this.botonListado.onclick = this.pulsarListado.bind(this);
        this.botonAlta.onclick = this.pulsarAlta.bind(this);
        this.botonModificar.onclick = this.pulsarModificar.bind(this);
    }
    pulsarListado() {
        this.controlador.pulsarBotonListado();
    }
    pulsarAlta() {
        this.controlador.pulsarBotonAlta();
    }
    pulsarModificar() {
        this.controlador.pulsarBotonModificar();
    }
}
//# sourceMappingURL=vistadivbotones.js.map