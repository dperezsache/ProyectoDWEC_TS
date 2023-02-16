export class Modelo {
    constructor() {
        this.callbacks = [];
        this.conectarDB();
    }
    conectarDB() {
        const peticion = indexedDB.open('ComponentesDB');
        peticion.onsuccess = () => {
            this.db = peticion.result;
            this.obtenerRegistros();
        };
        peticion.onupgradeneeded = () => {
            this.db = peticion.result;
            this.db.createObjectStore('tablaComponentes', { keyPath: 'id', autoIncrement: true });
        };
        peticion.onerror = (err) => console.error(`Error de IndexedDB: ${peticion.error} ` + err);
    }
    registrar(callback) {
        this.callbacks.push(callback);
    }
    avisar() {
        for (let callback of this.callbacks)
            callback();
    }
    insertar(nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) {
        let reader = new FileReader();
        reader.readAsDataURL(imagen);
        reader.onload = () => {
            const componente = {
                'nombre': nombre,
                'fecha': fecha,
                'precio': precio,
                'descripcion': descripcion,
                'tipo': tipo,
                'imagen': reader.result,
                'seguro1': seguro1,
                'seguro2': seguro2,
                'seguro3': seguro3
            };
            const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').add(componente);
            peticion.onsuccess = () => this.obtenerRegistros();
        };
    }
    procesarComponente(id, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) {
        const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').get(id);
        peticion.onsuccess = () => {
            const datos = peticion.result;
            this.actualizarComponente(datos, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
        };
    }
    actualizarComponente(datos, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) {
        datos.nombre = nombre;
        datos.fecha = fecha;
        datos.precio = precio;
        datos.descripcion = descripcion;
        datos.tipo = tipo;
        datos.seguro1 = seguro1;
        datos.seguro2 = seguro2;
        datos.seguro3 = seguro3;
        let reader = new FileReader();
        reader.readAsDataURL(imagen);
        reader.onload = () => {
            datos.imagen = reader.result;
            const serializado = JSON.parse(JSON.stringify(datos));
            const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').put(serializado);
            peticion.onsuccess = () => this.obtenerRegistros();
        };
    }
    borrar(id) {
        const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').delete(id);
        peticion.onsuccess = () => this.obtenerRegistros();
    }
    obtenerRegistros() {
        const peticion = this.db.transaction('tablaComponentes', 'readonly').objectStore('tablaComponentes').getAll();
        peticion.onsuccess = () => {
            this.listaComponentes = peticion.result;
            this.avisar();
        };
    }
    buscar(nombre) {
        if (!nombre) {
            this.obtenerRegistros();
        }
        else {
            const peticion = this.db.transaction('tablaComponentes', 'readonly').objectStore('tablaComponentes').getAll();
            peticion.onsuccess = () => {
                const componentes = peticion.result;
                this.listaComponentes = [];
                for (let componente of componentes) {
                    if (componente.nombre.includes(nombre))
                        this.listaComponentes.push(componente);
                }
                this.avisar();
            };
        }
    }
    getLista() {
        return this.listaComponentes;
    }
}
//# sourceMappingURL=modelo.js.map