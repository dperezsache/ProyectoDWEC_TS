import { Vista } from './vista.js';
export class VistaAlta extends Vista {
    constructor(controlador, div) {
        super(controlador, div);
        this.campoNombre = this.div.getElementsByTagName('input')[0];
        this.campoFecha = this.div.getElementsByTagName('input')[1];
        this.campoPrecio = this.div.getElementsByTagName('input')[2];
        this.campoDescripcion = this.div.getElementsByTagName('textarea')[0];
        this.campoTipo = this.div.getElementsByTagName('select')[0];
        this.campoImagen = this.div.getElementsByTagName('input')[3];
        this.seguro1 = this.div.getElementsByTagName('input')[4];
        this.seguro2 = this.div.getElementsByTagName('input')[5];
        this.seguro3 = this.div.getElementsByTagName('input')[6];
        this.botonCancelar = this.div.getElementsByTagName('button')[0];
        this.botonAceptar = this.div.getElementsByTagName('button')[1];
        this.parrafoAviso = this.div.getElementsByTagName('p')[0];
        this.botonAceptar.onclick = this.aceptar.bind(this);
        this.botonCancelar.onclick = this.cancelar.bind(this);
    }
    aceptar() {
        const colorOk = '1px solid #ADACAC';
        const colorMal = '1px solid crimson';
        let cont = 0;
        if (this.campoNombre.value && this.campoNombre.value.length <= 50) {
            cont++;
            this.campoNombre.style.border = colorOk;
        }
        else {
            this.campoNombre.style.border = colorMal;
        }
        if (this.campoFecha.value) {
            cont++;
            this.campoFecha.style.border = colorOk;
        }
        else {
            this.campoFecha.style.border = colorMal;
        }
        if (this.campoPrecio.value && !isNaN(parseInt(this.campoPrecio.value)) && parseInt(this.campoPrecio.value) > 0) {
            cont++;
            this.campoPrecio.style.border = colorOk;
        }
        else {
            this.campoPrecio.style.border = colorMal;
        }
        if (parseInt(this.campoTipo.value) != -1) {
            cont++;
            this.campoTipo.style.border = colorOk;
        }
        else {
            this.campoTipo.style.border = colorMal;
        }
        if (this.campoDescripcion.value && this.campoDescripcion.value.length <= 500) {
            cont++;
            this.campoDescripcion.style.border = colorOk;
        }
        else {
            this.campoDescripcion.style.border = colorMal;
        }
        if (this.campoImagen.files[0] != null) {
            cont++;
            this.campoImagen.style.border = colorOk;
        }
        else {
            this.campoImagen.style.border = colorMal;
        }
        window.scrollTo(0, 0);
        this.parrafoAviso.style.display = 'block';
        if (cont == 6) {
            this.parrafoAviso.innerText = '?????? Componente a??adido correctamente ??????';
            this.controlador.aceptarCRUD(this.campoNombre.value, this.campoFecha.value, this.campoPrecio.value, this.campoDescripcion.value, this.campoTipo.value, this.campoImagen.files[0], this.seguro1.checked, this.seguro2.checked, this.seguro3.checked);
            this.cancelar();
        }
        else {
            this.parrafoAviso.innerText = '?????? Rellena correctamente los campos indicados ??????';
        }
    }
    cancelar() {
        this.campoNombre.value = '';
        this.campoFecha.value = '';
        this.campoPrecio.value = '';
        this.campoDescripcion.value = '';
        this.campoTipo.value = '-1';
        this.campoImagen.value = '';
        this.seguro1.checked = false;
        this.seguro2.checked = false;
        this.seguro3.checked = false;
    }
    mostrar(ver) {
        super.mostrar(ver);
        this.parrafoAviso.style.display = 'none';
    }
}
//# sourceMappingURL=vistaalta.js.map