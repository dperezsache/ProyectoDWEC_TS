export class Vista {
    constructor(controlador, div) {
        this.controlador = controlador;
        this.div = div;
    }
    mostrar(ver) {
        if (ver) {
            this.div.style.display = 'block';
        }
        else {
            this.div.style.display = 'none';
        }
    }
}
//# sourceMappingURL=vista.js.map