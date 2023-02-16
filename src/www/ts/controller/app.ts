import { Modelo } from "../model/modelo.js";
import { VistaAlta } from "../views/vistaalta.js";
import { VistaListado } from "../views/vistalistado.js";
import { VistaModificar } from "../views/vistamodificar.js";
import { VistaDivBotones } from "../views/vistadivbotones.js";
import { VistaBarraBusqueda } from "../views/vistabarrabusqueda.js";

export class Controlador 
{
	private modelo!: Modelo;
	private divBarraBusqueda!: HTMLDivElement;
	private divBotones!: HTMLDivElement;
	private divAlta!: HTMLDivElement;
	private divListado!: HTMLDivElement;
	private divModificar!: HTMLDivElement;
	private vistaBarraBusqueda!: VistaBarraBusqueda;
	private vistaBotones!: VistaDivBotones;
	private vistaAlta!: VistaAlta;
	private vistaListado!: VistaListado;
	private vistaModificar!: VistaModificar;

    /**
	 *	Constructor de la clase.
	 *	Llama al método iniciar al cargarse la página.
	 */
    constructor() 
    {
        window.onload = this.iniciar.bind(this);
    }

    /**
     * Inicia la aplicación.
     * Crea el modelo y las vistas.
     */
    iniciar() 
    {
        this.modelo = new Modelo();

        this.divBarraBusqueda = <HTMLDivElement>document.getElementById('divBusqueda');
		this.divBotones = <HTMLDivElement>document.getElementById('divBotones');
        this.divAlta = <HTMLDivElement>document.getElementById('divAlta');
        this.divListado = <HTMLDivElement>document.getElementById('divListado');
        this.divModificar = <HTMLDivElement>document.getElementById('divModificar');

        this.vistaBarraBusqueda = new VistaBarraBusqueda(this, this.divBarraBusqueda);
		this.vistaBotones = new VistaDivBotones(this, this.divBotones);
        this.vistaAlta = new VistaAlta(this, this.divAlta);
        this.vistaListado = new VistaListado(this, this.divListado);
        this.vistaModificar = new VistaModificar(this, this.divModificar);

        this.pulsarBotonListado();    // Iniciar desde la vista de listado.
    }

    /**
		Atención a la pulsación sobre el botón de listado
	**/
    pulsarBotonListado() 
    {
        this.vistaListado.mostrar(true);
        this.vistaBarraBusqueda.mostrar(true);
        this.vistaAlta.mostrar(false);
        this.vistaModificar.mostrar(false);
    }

    /**
		Atención a la pulsación sobre el botón de alta
	**/
    pulsarBotonAlta() 
    {
        this.vistaListado.mostrar(false);
        this.vistaBarraBusqueda.mostrar(false);
        this.vistaAlta.mostrar(true);
        this.vistaModificar.mostrar(false);
    }

    /**
		Atención a la pulsación sobre el botón de modificar
	**/
    pulsarBotonModificar() 
    {
        this.vistaListado.mostrar(false);
        this.vistaBarraBusqueda.mostrar(false);
        this.vistaAlta.mostrar(false);
        this.vistaModificar.mostrar(true);
    }

    /**
		Realizar búsqueda de componentes.
		@param {string} nombre Nombre del componente.
	**/
	buscarComponentes(nombre:string)
	{
		this.modelo.buscar(nombre);
	}

    /**
		Inserta el elemento en el modelo.
    **/
    aceptarCRUD(nombre:string, fecha:string, precio:string, descripcion:string, tipo:string, imagen:File, seguro1:boolean, seguro2:boolean, seguro3:boolean) 
    {
        this.modelo.insertar(nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
    }

    /**
		Atención al click en el icono editar del CRUD.
	**/
	actualizarCRUD(id:number, nombre:string, fecha:string, precio:string, descripcion:string, tipo:string, imagen:File, seguro1:boolean, seguro2:boolean, seguro3:boolean)
	{
		this.modelo.procesarComponente(id, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
	}

    /**
		Atención al click en el icono eliminar del CRUD.
		Elimina el elemento en el modelo.
		@param {number} id ID del elemento a eliminar.
	**/
	eliminarCRUD(id:number) 
    {
		this.modelo.borrar(id);
	}

	/**
		Atención al click en el icono editar del CRUD.
		Manda al formulario de edición.
		@param {number} id ID del elemento a editar.
	**/
	editarCRUD(id:number) 
    {
		this.pulsarBotonModificar();
		this.vistaModificar.listado.value = id.toString();
		this.vistaModificar.actualizarForm();
	}

    /**
		Devuelve el modelo de la aplicación.
		@return {Modelo} El modelo de la aplicación.
	**/
	getModelo() 
    {
		return this.modelo;
	}
}

new Controlador();