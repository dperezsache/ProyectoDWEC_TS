/**
	@file Contiene la vista de alta.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

import { Controlador } from '../controller/app';
import { Vista } from './vista';

/**
	Vista del alta.
	Contiene el formulario de inserción.
**/
export class VistaAlta extends Vista 
{
	private campoNombre: HTMLInputElement;
	private campoFecha: HTMLInputElement;
	private campoPrecio: HTMLInputElement;
	private campoDescripcion: HTMLTextAreaElement;
	private campoTipo: HTMLSelectElement;
	private campoImagen: HTMLInputElement;
	private seguro1: HTMLInputElement;
	private seguro2: HTMLInputElement;
	private seguro3: HTMLInputElement;
	private botonCancelar: HTMLButtonElement;
	private botonAceptar: HTMLButtonElement;
	private parrafoAviso: HTMLParagraphElement;

	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	**/
	constructor(controlador: Controlador, div: HTMLDivElement) 
	{
        super(controlador, div);

		// Coger referencias de los elementos
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

	/**
		Atención al click sobre el botón Aceptar de la vista.
	**/
	aceptar() 
	{
		const colorOk = '1px solid #ADACAC'; 
		const colorMal = '1px solid crimson';
		let cont = 0;

		// Validación nombre
		if (this.campoNombre.value && this.campoNombre.value.length <= 50) 
		{
			cont++;
			this.campoNombre.style.border = colorOk;
		}
		else 
		{
			this.campoNombre.style.border = colorMal;
		}

		// Validación fecha
		if (this.campoFecha.value) 
		{
			cont++;
			this.campoFecha.style.border = colorOk;
		}
		else 
		{
			this.campoFecha.style.border = colorMal;
		}

		// Validación precio
		if (this.campoPrecio.value && !isNaN(parseInt(this.campoPrecio.value)) && parseInt(this.campoPrecio.value) > 0) 
		{
			cont++;
			this.campoPrecio.style.border = colorOk;
		}
		else 
		{
			this.campoPrecio.style.border = colorMal;
		}

		// Validación tipo
		if (parseInt(this.campoTipo.value) != -1)
		{
			cont++;
			this.campoTipo.style.border = colorOk;
		}
		else
		{
			this.campoTipo.style.border = colorMal;
		}

		// Validación descripción
		if (this.campoDescripcion.value && this.campoDescripcion.value.length <= 500)
		{
			cont++;
			this.campoDescripcion.style.border = colorOk;
		}
		else
		{
			this.campoDescripcion.style.border = colorMal;
		}

		// Validación imagen
		if (this.campoImagen.files != null)
		{
			cont++;
			this.campoImagen.style.border = colorOk;
		}
		else
		{
			this.campoImagen.style.border = colorMal;
		}

		window.scrollTo(0, 0);	// Mover al top de la página.
		this.parrafoAviso.style.display = 'block';

		if(cont == 6) 
		{
			this.parrafoAviso.innerText = '✔️ Componente añadido correctamente ✔️';
			
			this.controlador.aceptarCRUD(
				this.campoNombre.value, 
				this.campoFecha.value, 
				this.campoPrecio.value,
				this.campoDescripcion.value, 
				this.campoTipo.value,
				this.campoImagen.files![0], 
				this.seguro1.checked,
				this.seguro2.checked,
				this.seguro3.checked
			);

			this.cancelar();	// Borrar los campos una vez añadido el elemento.
		}
		else
		{
			this.parrafoAviso.innerText = '⚠️ Rellena correctamente los campos indicados ⚠️';
		}
	}

	/**
		Limpiar los campos del formulario.
	**/
	cancelar() 
	{
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

	mostrar(ver:boolean)
	{
		super.mostrar(ver);
		this.parrafoAviso.style.display = 'none';
	}
}