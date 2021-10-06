class UserInterface{

        insertarPresupuesto(cantidad){
            const {presupuesto,restante,gastos} = cantidad;
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
    
         mostrarGastos(gastos){
    
             //Elimina el codigo previo
            this.limpiarHTML();
    
           //Iterar sobre los gastos
            gastos.forEach(gasto =>{
                const {cantidad, nombre, id} = gasto;
                
              // Crear li
                const nuevoGasto = document.createElement('li');
                nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
                nuevoGasto.dataset.id = id;
    
               //Agregar HTML del 
                nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
                
                `;
    
              // Boton para borrar gasto
                const btnBorrar = document.createElement('button');
                btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
                btnBorrar.innerHTML = 'Borrar &times';
                btnBorrar.onclick = () =>{
                    eliminarGasto(id);
                };
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
        }else{
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }
    
        //Si el total es 0 o menor
        if(restante <= 0){
        UI.imprimirAlerta('El Presupuesto se ha agotado','error');
        formulario.querySelector('button[type="submit"]').disabled = true;
     }
    
    }
 }
