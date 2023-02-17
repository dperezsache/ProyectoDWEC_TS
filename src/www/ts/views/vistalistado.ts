/**
	@file Contiene la vista del listado.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

import { Controlador } from '../controller/app.js';
import { Modelo } from '../model/modelo.js';
import { Vista } from './vista.js';

/**
	Vista del listado.
	Contiene todos los componentes que hayan.
**/
export class VistaListado extends Vista 
{
	private modelo: Modelo;
	private pAviso: HTMLParagraphElement;

	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	**/
    constructor(controlador: Controlador, div: HTMLDivElement) 
	{
        super(controlador, div);
		
		// Hacemos que VistaListado "observe" al Modelo.
		this.modelo = this.controlador.getModelo();
		this.modelo.registrar(this.actualizar.bind(this));

		this.pAviso = this.div.getElementsByTagName('p')[0]!;
	}

	/**
		Recibe el aviso del modelo cuando ha sido actualizado.
		Actualiza los datos de la vista.
	**/
	actualizar():void
	{
		this.borrarElementos();
		
		const componentes = this.modelo.getLista();

		if (componentes != null && componentes.length > 0) 
		{
			this.pAviso.style.display = 'none';

			for(let componente of componentes) 
			{
				// DIV
				let contenedor = document.createElement('div');
				contenedor.className = 'divItem';
				this.div.appendChild(contenedor);

				// Imagen
				let img = document.createElement('img');
				img.width = 256;
				img.height = 256;
				img.style.display = 'block';
				img.src = componente.imagen;
				img.alt = componente.nombre;
				contenedor.appendChild(img);

				// Nombre
				let pNombre = document.createElement('p');
				pNombre.className = 'pNombreItem';
				pNombre.innerText = componente.nombre;
				contenedor.appendChild(pNombre);

				// Precio
				let pPrecio = document.createElement('p');
				pPrecio.className = 'pPrecioItem';
				let precio = parseFloat(componente.precio).toFixed(2);
				pPrecio.innerText = precio;
				pPrecio.innerText = precio + '€';
				pPrecio.innerText = pPrecio.innerText.replace('.', ',');
				contenedor.appendChild(pPrecio);

				// Descripción
				let divDesc = document.createElement('div');
				divDesc.className = 'divDescItem';

				let pDesc = document.createElement('p');
				pDesc.innerText = componente.descripcion;
				divDesc.appendChild(pDesc);
				contenedor.appendChild(divDesc);

				// Tipo
				let ulInfo = document.createElement('ul');
				let liTipo = document.createElement('li');
				let tipo:string;
				
				switch(parseInt(componente.tipo))
				{
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

				// Fecha
				let liFecha = document.createElement('li');
				let trozos = componente.fecha.toString().split('-');
				liFecha.innerHTML = 'Fecha de lanzamiento: <span class="spanFecha">' + trozos[2] + '/' + trozos[1] + '/' + trozos[0] + '</span>';
				ulInfo.appendChild(liFecha);
				contenedor.appendChild(ulInfo);

				// Separador
				let hr = document.createElement('hr');
				hr.className = 'hrItems';
				hr.style.width = '350px'; 
				contenedor.appendChild(hr);
				
				// Checkboxes
				let ul = document.createElement('ul');
				ul.style.listStyleType = "'- '"; 
				let li1 = document.createElement('li');
				if (componente.seguro1) li1.innerText = 'Se ofrece seguro contra robos.';
				else li1.innerText = 'No se ofrece seguro contra robos.';
				ul.appendChild(li1);

				let li2 = document.createElement('li');
				if (componente.seguro2) li2.innerText = 'Se ofrece seguro contra roturas.';
				else li2.innerText = 'No se ofrece seguro contra roturas.';
				ul.appendChild(li2);

				let li3 = document.createElement('li');
				if (componente.seguro3) li3.innerText = 'Se ofrece seguro contra caídas.';
				else li3.innerText = 'No se ofrece seguro contra caídas.';
				ul.appendChild(li3);
				contenedor.appendChild(ul);

				// Botones
				let divBotones = document.createElement('div');

				// Botón eliminar
				let botonEliminar = document.createElement('button');
				botonEliminar.className = 'boton';
				botonEliminar.style.marginRight = '10px';
				let spanEliminar = document.createElement('span');
				spanEliminar.className = 'material-icons';
				spanEliminar.innerText = 'delete';
				spanEliminar.onclick = this.eliminar.bind(this, componente.id)
				botonEliminar.appendChild(spanEliminar);
				divBotones.appendChild(botonEliminar);

				// Botón editar
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
		else
		{
			this.pAviso.style.display = 'block';
		}
	}

	/**
	 * Borra los elementos del listado.
	 */
	borrarElementos():void
	{
		while(this.div.childNodes.length > 1)
		{
			if (this.div.lastChild === this.pAviso) break;
			else this.div.removeChild(this.div.lastChild!);
		} 
	}

	/**
		Atención al evento eliminar de una fila.
		@param {number} id ID del dato a eliminar.
	**/
	eliminar(id:number):void
	{
		this.controlador.eliminarCRUD(id);
	}
	
	/**
		Atención al evento editar de una fila.
		@param {number} id ID del dato a editar.
	**/
	editar(id:number):void
	{
		this.controlador.editarCRUD(id);
	}
}