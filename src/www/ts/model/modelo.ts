/**
	@file Contiene el modelo de la aplicación.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

import { Controlador } from "../controller/app";

interface Componente {
	id: number;
	nombre: string;
	fecha: Date;
	precio: string; 
	descripcion: string; 
	tipo: string; 
	seguro1: boolean; 
	seguro2: boolean; 
	seguro3: boolean;
	imagen: string;
}

/**
	Clase Modelo.
	Gestiona los datos de la aplicación.
**/
export class Modelo 
{
	private controlador: Controlador;
	private callbacks: Function[];
	private listaComponentes!: Componente[];
	private db!: IDBDatabase;

    constructor(controlador: Controlador) 
	{
		this.controlador = controlador;
		this.callbacks = [];
		this.conectarDB();
    }

	/**
		Iniciar conexión con la base de datos.
	**/
	conectarDB() 
	{
		const peticion: IDBOpenDBRequest = window.indexedDB.open('ComponentesDB', 1);

		peticion.onsuccess = (event) => {
			if(event.target != null) {
				this.db = <IDBDatabase>event.target;
				this.obtenerRegistros();
			}
		}

		peticion.onupgradeneeded = (event) => {
			if(event.target != null) {
				this.db = <IDBDatabase>event.target;
				this.db.createObjectStore('tablaComponentes', { keyPath: 'id', autoIncrement: true });
			}
		}

		peticion.onerror = () => console.error('Error al conectar con la BBDD');
	}

	/**
		Registra un objeto para informarle de los cambios en el Modelo.
		@param {Function} callback Función de callback que será llamada cuando cambien los datos.
	**/
	registrar(callback: Function) 
	{
		this.callbacks.push(callback);
	}

	/**
		Ejecuta todos los callback registrados.
	**/
	avisar() 
	{
		for(let callback of this.callbacks) 
			callback();
	}

	/**
	 	Insertar registro en la BD.
		@param {string} nombre Nombre del componente.
		@param {string} fecha Fecha de lanzamiento.
		@param {string} precio Precio del componente.
		@param {string} descripcion Descripción del componente.
		@param {string} tipo Tipo del componente.
		@param {File} imagen Imagen del componente.
		@param {boolean} seguro1 Seguro nº 1.
		@param {boolean} seguro2 Seguro nº 2.
		@param {boolean} seguro3 Seguro nº 3.
	**/
	insertar(nombre:string, fecha:string, precio:string, descripcion:string, tipo:string, imagen:File, seguro1:boolean, seguro2:boolean, seguro3:boolean) 
	{
		// Transformar imagen a base64
		let reader = new FileReader();
		reader.readAsDataURL(imagen);

		// Generar objeto del componente
		reader.onload = () => {
			const componente: Object = {
				'nombre': nombre,
				'fecha': fecha,
				'precio': precio,
				'descripcion': descripcion,
				'tipo': tipo,
				'imagen': <string>reader.result,
				'seguro1': seguro1,
				'seguro2': seguro2,
				'seguro3': seguro3
			};

			const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').add(componente);
			peticion.onsuccess = () => this.obtenerRegistros();
		};
	}

	/**
	 	Obtener componente usando el ID, para después poder actualizarlo.
		@param {number} id ID del componente.
		@param {string} nombre Nombre del componente.
		@param {string} fecha Fecha de lanzamiento.
		@param {string} precio Precio del componente.
		@param {string} descripcion Descripción del componente.
		@param {string} tipo Tipo del componente.
		@param {File} imagen Imagen del componente.
		@param {boolean} seguro1 Seguro nº 1.
		@param {boolean} seguro2 Seguro nº 2.
		@param {boolean} seguro3 Seguro nº 3.
	**/
	procesarComponente(id:number, nombre:string, fecha:string, precio:string, descripcion:string, tipo:string, imagen:File, seguro1:boolean, seguro2:boolean, seguro3:boolean)
	{
		const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').get(<IDBValidKey>id);
		peticion.onsuccess = (event) => {
			if(event.target != null) {
				const datos = <Componente>(event.target as Object);
				this.actualizarComponente(datos, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
			}
		}
	}

	/**
	 	Actualizar los datos de un componente de la base de datos.
		@param {Componente} datos Objeto con los datos.
		@param {string} nombre Nombre del componente.
		@param {string} fecha Fecha de lanzamiento.
		@param {string} precio Precio del componente.
		@param {string} descripcion Descripción del componente.
		@param {string} tipo Tipo del componente.
		@param {File} imagen Imagen del componente.
		@param {boolean} seguro1 Seguro nº 1.
		@param {boolean} seguro2 Seguro nº 2.
		@param {boolean} seguro3 Seguro nº 3.
	**/
	actualizarComponente(datos:Componente, nombre:string, fecha:string, precio:string, descripcion:string, tipo:string, imagen:File, seguro1:boolean, seguro2:boolean, seguro3:boolean) 
	{
		datos.nombre = nombre;
		datos.fecha = new Date(fecha);
		datos.precio = precio;
		datos.descripcion = descripcion;
		datos.tipo = tipo;
		datos.seguro1 = seguro1;
		datos.seguro2 = seguro2;
		datos.seguro3 = seguro3;

		let reader = new FileReader();
		reader.readAsDataURL(imagen);
		reader.onload = () => {
			datos.imagen = (reader.result as string);
			const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').put(datos);
			peticion.onsuccess = () => this.obtenerRegistros();
		}
	}

	/**
		Elimina un registro de la BBDD.
		@param {number} id Nº identificador del registro a eliminar.
	**/
	borrar(id:number)
	{
		const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').delete(<IDBValidKey>id);
		peticion.onsuccess = () => this.obtenerRegistros();
	}

	/**
		Devuelve los registros de la base de datos a un array en el modelo, después llama a los callbacks.
	**/
	obtenerRegistros() 
	{
		const peticion = this.db.transaction('tablaComponentes', 'readonly').objectStore('tablaComponentes').getAll();
		
		peticion.onsuccess = () => {
			this.listaComponentes = peticion.result;
			this.avisar();
		};
	}

	/**
		Busca componentes que contengan el nombre o parte del nombre.
		@param {string} nombre Nombre del componente.
	**/
	buscar(nombre:string)
	{
		if(!nombre)	// Si el nombre está en blanco, recuperar los registros.
		{
			this.obtenerRegistros();
		}
		else
		{
			const peticion = this.db.transaction('tablaComponentes', 'readonly').objectStore('tablaComponentes').getAll();

			peticion.onsuccess = () => {
				const componentes = peticion.result;
				this.listaComponentes = [];	// Limpiar la lista de componentes
	
				for(let componente of componentes)
				{
					if(componente.nombre.includes(nombre)) 
						this.listaComponentes.push(componente);
				}

				this.avisar();	// Llamada callback.
			}
		}
	}

	/**
		Devuelve la lista local de componentes.
		@returns {Componente[]} Lista.
	**/
	getLista():Componente[]
	{
		return this.listaComponentes;
	}
}