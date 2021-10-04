//Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');




 //Eventos
 eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',iniciarPresupuesto);
    formulario.addEventListener('submit',agregarGasto);
}


 //Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce( (total,gasto) => total + gasto.cantidad,0);
        this.restante = this.presupuesto - gastado;
    }
}

class UserInterface{
    insertarPresupuesto(cantidad){
        //Extraer los valores
        const {presupuesto,restante,gasto} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
        

    }

    imprimirAlerta(mensaje,tipo){
        //Crear el Div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Insertar en eL HTML
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    agregarGastoListado(gastos){

        //Elimina el codigo previo
        this.limpiarHTML();

        //Iterar sobre los gastos
        gastos.forEach(gasto =>{
            const {cantidad, nombre, id} = gasto;
            
            //Crear li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            //Agregar HTML del 
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
            
            `;

            //Boton para borrar gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';
            nuevoGasto.appendChild(btnBorrar);

            //Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        });
    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj){
        const {presupuesto,restante} = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');

        //Comprobar 25%
        if((presupuesto / 4) > restante){
            restanteDiv.classList.remove('alert-sucess', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if((presupuesto / 2 ) > restante){
            restanteDiv.classList.remove('alert-sucess');
            restanteDiv.classList.add('alert-warning');
        }

        //Si el total es 0 o menor
        if(restante <= 0){
            UI.imprimirAlerta('El Presupuesto se ha agotado','error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }


    }
}

//Instanciar 
const UI = new UserInterface();
let presupuesto;
 
 //Funciones
 function iniciarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cúal es tu Presupuesto');
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }

    //Presupuesto Válido
    presupuesto = new Presupuesto(presupuestoUsuario);
    UI.insertarPresupuesto(presupuesto);
    
    
 }

 function agregarGasto(e){
    e.preventDefault();

    //Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //Validar

    if(nombre === '' || cantidad === ''){
        UI.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;

    }else if(cantidad <= 0 || isNaN(cantidad)){
        UI.imprimirAlerta('Cantidad no Válida','error');
        return;
    }


    const gasto = {nombre,cantidad, id: Date.now()};
    
    //Añade un nuevo gasto
    presupuesto.nuevoGasto(gasto);

    UI.imprimirAlerta('Gasto agregado Correctamente');

    //Imrpimir los gastos
    const {gastos, restante} = presupuesto;
    UI.agregarGastoListado(gastos);

    UI.actualizarRestante(restante);

    UI.comprobarPresupuesto(presupuesto);

    formulario.reset();
}

