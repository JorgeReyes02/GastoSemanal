//Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');




 //Eventos
 eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',iniciarPresupuesto);
}


 //Clases



 
 //Funciones
 function iniciarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cúal es tu Presupuesto');
   if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario < 0){
       window.location.reload();
   }
   
    console.log(presupuestoUsuario);
 }