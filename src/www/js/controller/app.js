import { Modelo } from "../model/modelo.js";
import { VistaAlta } from "../views/vistaalta.js";
import { VistaListado } from "../views/vistalistado.js";
import { VistaModificar } from "../views/vistamodificar.js";
import { VistaDivBotones } from "../views/vistadivbotones.js";
import { VistaBarraBusqueda } from "../views/vistabarrabusqueda.js";
export class Controlador {
    constructor() {
        window.onload = this.iniciar.bind(this);
    }
    iniciar() {
        this.modelo = new Modelo();
        this.divBarraBusqueda = document.getElementById('divBusqueda');
        this.divBotones = document.getElementById('divBotones');
        this.divAlta = document.getElementById('divAlta');
        this.divListado = document.getElementById('divListado');
        this.divModificar = document.getElementById('divModificar');
        this.vistaBarraBusqueda = new VistaBarraBusqueda(this, this.divBarraBusqueda);
        this.vistaBotones = new VistaDivBotones(this, this.divBotones);
        this.vistaAlta = new VistaAlta(this, this.divAlta);
        this.vistaListado = new VistaListado(this, this.divListado);
        this.vistaModificar = new VistaModificar(this, this.divModificar);
        this.pulsarBotonListado();
    }
    pulsarBotonListado() {
        this.vistaListado.mostrar(true);
        this.vistaBarraBusqueda.mostrar(true);
        this.vistaAlta.mostrar(false);
        this.vistaModificar.mostrar(false);
    }
    pulsarBotonAlta() {
        this.vistaListado.mostrar(false);
        this.vistaBarraBusqueda.mostrar(false);
        this.vistaAlta.mostrar(true);
        this.vistaModificar.mostrar(false);
    }
    pulsarBotonModificar() {
        this.vistaListado.mostrar(false);
        this.vistaBarraBusqueda.mostrar(false);
        this.vistaAlta.mostrar(false);
        this.vistaModificar.mostrar(true);
    }
    buscarComponentes(nombre) {
        this.modelo.buscar(nombre);
    }
    aceptarCRUD(nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) {
        this.modelo.insertar(nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
    }
    actualizarCRUD(id, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) {
        this.modelo.procesarComponente(id, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
    }
    eliminarCRUD(id) {
        this.modelo.borrar(id);
    }
    editarCRUD(id) {
        this.pulsarBotonModificar();
        this.vistaModificar.listado.value = id.toString();
        this.vistaModificar.actualizarForm();
    }
    getModelo() {
        return this.modelo;
    }
}
new Controlador();
//# sourceMappingURL=app.js.map