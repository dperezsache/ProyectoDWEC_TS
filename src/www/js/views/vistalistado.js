import { Vista } from './vista.js';
export class VistaListado extends Vista {
    constructor(controlador, div) {
        super(controlador, div);
        this.modelo = this.controlador.getModelo();
        this.modelo.registrar(this.actualizar.bind(this));
        this.pAviso = this.div.getElementsByTagName('p')[0];
    }
    actualizar() {
        this.borrarElementos();
        const componentes = this.modelo.getLista();
        if (componentes != null && componentes.length > 0) {
            this.pAviso.style.display = 'none';
            for (let componente of componentes) {
                let contenedor = document.createElement('div');
                contenedor.className = 'divItem';
                this.div.appendChild(contenedor);
                let img = document.createElement('img');
                img.width = 256;
                img.height = 256;
                img.style.display = 'block';
                img.src = componente.imagen;
                img.alt = componente.nombre;
                contenedor.appendChild(img);
                let pNombre = document.createElement('p');
                pNombre.className = 'pNombreItem';
                pNombre.innerText = componente.nombre;
                contenedor.appendChild(pNombre);
                let pPrecio = document.createElement('p');
                pPrecio.className = 'pPrecioItem';
                let precio = parseFloat(componente.precio).toFixed(2);
                pPrecio.innerText = precio;
                pPrecio.innerText = precio + '€';
                pPrecio.innerText = pPrecio.innerText.replace('.', ',');
                contenedor.appendChild(pPrecio);
                let divDesc = document.createElement('div');
                divDesc.className = 'divDescItem';
                let pDesc = document.createElement('p');
                pDesc.innerText = componente.descripcion;
                divDesc.appendChild(pDesc);
                contenedor.appendChild(divDesc);
                let ulInfo = document.createElement('ul');
                let liTipo = document.createElement('li');
                let tipo;
                switch (parseInt(componente.tipo)) {
                    case 1:
                        tipo = 'Procesador';
                        break;
                    case 2:
                        tipo = 'Tarjeta gráfica';
                        break;
                    case 3:
                        tipo = 'Memoria RAM';
                        break;
                    case 4:
                        tipo = 'Fuente de alimentación';
                        break;
                    case 5:
                        tipo = 'Placa base';
                        break;
                    case 6:
                        tipo = 'Disco duro';
                        break;
                    case 7:
                        tipo = 'Torre';
                        break;
                    case 8:
                        tipo = 'Otro';
                        break;
                    default:
                        tipo = '';
                        break;
                }
                liTipo.innerHTML = 'Tipo de producto: <span class="spanFecha">' + tipo + '</span>';
                ulInfo.appendChild(liTipo);
                let liFecha = document.createElement('li');
                let trozos = componente.fecha.toString().split('-');
                liFecha.innerHTML = 'Fecha de lanzamiento: <span class="spanFecha">' + trozos[2] + '/' + trozos[1] + '/' + trozos[0] + '</span>';
                ulInfo.appendChild(liFecha);
                contenedor.appendChild(ulInfo);
                let hr = document.createElement('hr');
                hr.className = 'hrItems';
                hr.style.width = '350px';
                contenedor.appendChild(hr);
                let ul = document.createElement('ul');
                ul.style.listStyleType = "'- '";
                let li1 = document.createElement('li');
                if (componente.seguro1)
                    li1.innerText = 'Se ofrece seguro contra robos.';
                else
                    li1.innerText = 'No se ofrece seguro contra robos.';
                ul.appendChild(li1);
                let li2 = document.createElement('li');
                if (componente.seguro2)
                    li2.innerText = 'Se ofrece seguro contra roturas.';
                else
                    li2.innerText = 'No se ofrece seguro contra roturas.';
                ul.appendChild(li2);
                let li3 = document.createElement('li');
                if (componente.seguro3)
                    li3.innerText = 'Se ofrece seguro contra caídas.';
                else
                    li3.innerText = 'No se ofrece seguro contra caídas.';
                ul.appendChild(li3);
                contenedor.appendChild(ul);
                let divBotones = document.createElement('div');
                let botonEliminar = document.createElement('button');
                botonEliminar.className = 'boton';
                botonEliminar.style.marginRight = '10px';
                let spanEliminar = document.createElement('span');
                spanEliminar.className = 'material-icons';
                spanEliminar.innerText = 'delete';
                spanEliminar.onclick = this.eliminar.bind(this, componente.id);
                botonEliminar.appendChild(spanEliminar);
                divBotones.appendChild(botonEliminar);
                let botonEditar = document.createElement('button');
                botonEditar.className = 'boton';
                let spanEditar = document.createElement('span');
                spanEditar.className = 'material-icons';
                spanEditar.innerText = 'edit';
                spanEditar.onclick = this.editar.bind(this, componente.id);
                botonEditar.appendChild(spanEditar);
                divBotones.appendChild(botonEditar);
                contenedor.appendChild(divBotones);
            }
        }
        else {
            this.pAviso.style.display = 'block';
        }
    }
    borrarElementos() {
        while (this.div.childNodes.length > 1) {
            if (this.div.lastChild === this.pAviso)
                break;
            else
                this.div.removeChild(this.div.lastChild);
        }
    }
    eliminar(id) {
        this.controlador.eliminarCRUD(id);
    }
    editar(id) {
        this.controlador.editarCRUD(id);
    }
}
//# sourceMappingURL=vistalistado.js.map