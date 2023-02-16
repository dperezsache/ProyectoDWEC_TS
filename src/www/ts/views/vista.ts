/**
	@file Contiene el modelo de la aplicación
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.es>
	@license GPL-3.0-or-later
**/
import {Controlador} from '../controller/app.js';

/**
	Implementa una vista.
**/
export class Vista 
{
	public controlador: Controlador;
	public div: HTMLDivElement;

	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	**/
    constructor(controlador:Controlador, div:HTMLDivElement) 
	{
		this.controlador = controlador;
        this.div = div;
    }

    /**
		Muestra u oculta el div principal de la vista.
		@param {boolean} ver True muestra la vista y false la oculta.
	**/
	mostrar(ver:boolean)
	{
		if(ver) 
		{
            this.div.style.display = 'block';
        }
		else 
		{
            this.div.style.display = 'none';
        }
	}
}