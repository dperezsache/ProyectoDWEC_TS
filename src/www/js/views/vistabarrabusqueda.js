import { Vista } from './vista.js';
export class VistaBarraBusqueda extends Vista {
    constructor(controlador, div) {
        super(controlador, div);
        this.campoBuscar = this.div.getElementsByTagName('input')[0];
        this.botonBuscar = this.div.getElementsByTagName('button')[0];
        this.botonBuscar.onclick = this.busqueda.bind(this);
    }
    busqueda() {
        this.controlador.buscarComponentes(this.campoBuscar.value);
    }
}
//# sourceMappingURL=vistabarrabusqueda.js.map