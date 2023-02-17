/**
	@file Contiene la vista del div de los botones de la aplicación
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

import { Controlador } from "../controller/app.js";

/**
	Implementa una vista del menú de botones.
**/
export class VistaDivBotones 
{
	private controlador: Controlador;
	private div: HTMLDivElement;
	private botonListado: HTMLButtonElement;
	private botonAlta: HTMLButtonElement;
	private botonModificar: HTMLButtonElement;

    /**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	**/
	constructor(controlador: Controlador, div: HTMLDivElement) 
	{
		this.controlador = controlador;
		this.div = div;
		
		this.botonListado = this.div.getElementsByTagName('button')[0]!;
		this.botonAlta = this.div.getElementsByTagName('button')[1]!;
        this.botonModificar = this.div.getElementsByTagName('button')[2]!;
		
		this.botonListado.onclick = this.pulsarListado.bind(this);
		this.botonAlta.onclick = this.pulsarAlta.bind(this);
		this.botonModificar.onclick = this.pulsarModificar.bind(this);
	}

    /**
		Atención a la pulsación sobre el enlace de listado
	**/
	pulsarListado():void
	{
		this.controlador.pulsarBotonListado();
	}

	/**
		Atención a la pulsación sobre el enlace de CRUD
	**/
	pulsarAlta():void
	{
		this.controlador.pulsarBotonAlta();
	}
	
	/**
		Atención a la pulsación sobre el enlace de actualizar
	**/
	pulsarModificar():void
	{
		this.controlador.pulsarBotonModificar();
	}
}