//Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

//Eventos
eventListeners();
 function eventListeners(){
   document.addEventListener('DOMContentLoaded',iniciarPresupuesto);
   formulario.addEventListener('submit',agregarGasto);
}

//Instanciar clases
   const UI = new UserInterface();
   let presupuesto;

//Funciones

function iniciarPresupuesto(){
    const presupuestoUsuario = prompt('Ingresa tu Presupuesto');

    if(presupuestoUsuario === '' || presupuestoUsuario <= 0 || presupuestoUsuario === null  || isNaN(presupuestoUsuario)){ 
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
            UI.imprimirAlerta('Ambos campos son obligatorios','error');
            return;
        }else if(cantidad <= 0 || isNaN(cantidad)){
            UI.imprimirAlerta('Cantidad ingresada no Válida','error');
            return;
        }

        const gasto = {nombre,cantidad, id: Date.now()};

        //Añade un nuevo 
        presupuesto.nuevoGasto(gasto);
        UI.imprimirAlerta('Gasto agregado correctamente');

         //Imrpimir los gastos
        const {gastos, restante} = presupuesto;
        UI.mostrarGastos(gastos);

        UI.actualizarRestante(restante);

        UI.comprobarPresupuesto(presupuesto);

        formulario.reset();
 }

    function eliminarGasto(id){
    //Elimina los gastos del objeto
     presupuesto.eliminarGasto(id);

     //Elimina los gastos del HTML
     const {gastos,restante} = presupuesto;
     UI.mostrarGastos(gastos);

     UI.actualizarRestante(restante);

     UI.comprobarPresupuesto(presupuesto);
    }



