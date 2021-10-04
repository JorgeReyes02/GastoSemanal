//Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');




 //Eventos
 eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',iniciarPresupuesto);
}


 //Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UserInterface{
    insertarPresupuesto(cantidad){
        //Extraer los valores
        const {presupuesto,restante,gasto} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
        

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
    
    console.log(presupuesto);
 }