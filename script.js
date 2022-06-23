//Obtine las publicaciones al cargar la pantalla.
window.onload= imprimirPublicaciones();
//Escucha el boton guardar y llama a la funcion correspondiente.
document.getElementById('formulario').addEventListener('submit', guardarPublicacion);


// FUNCIONES.
function guardarPublicacion(event){
  //Toma el valor de los elementos del formulario.
  titulo = document.getElementById('titulo').value;
  descripcion = document.getElementById('descripcion').value;
  //Valida el formulario.
  if (validarFormulario(titulo, descripcion)){
    //Se instancia una clase Date().
    date = new Date();
    fecha = date.toLocaleDateString();
    hora = date.toLocaleTimeString();
    //Se inicia un objeto publicacion.
    publicacion = {
      titulo,
      descripcion, 
      fecha,
      hora
    };
    //Verifica si existen publicaciones anteriormente guardadas.
    if(localStorage.getItem('publicaciones') === null){
      //Si no existen, crea un arreglo y guarda la primer publicacion.
      var publicaciones=[];
      publicaciones.push(publicacion);
      //Se guarda el arreglo publicaciones en memoria.
      localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
    }else{
      //Recuperar las publicaciones en memoria y guardar la nueva publicacion.
      var publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
      publicaciones.splice(0,0,publicacion);
      localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
    }
    //Limpiar formulario.
    document.getElementById('formulario').reset();
    imprimirPublicaciones();
  }
  event.preventDefault();
}

function imprimirPublicaciones(){
  //Controla que exista algo guardado en localStorage. 
  if (localStorage.getItem('publicaciones')!== null){
    //Recuperar las publicaciones en memoria
    publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
    salidaHTML = document.getElementById('contenedorPublicaciones');
    salidaHTML.innerHTML = " ";
    //Itera por cada publicacion guardada y le da formato html.
    publicaciones.forEach((e,i)=>{
      titulo = e.titulo
      desc = e.descripcion;
      fecha=e.fecha;
      hora=e.hora;
      salidaHTML.innerHTML += `<div class="card">
                                  <div class="card-body">
                                    <div class="float-right">${hora} ${fecha}</div>
                                    <h5 class="card-title">${titulo}</h5>
                                    <p class="card-text">${desc}</p>
                                    <button id="${i}" onclick="eliminarPublicacion(this.id)" class="btn btn-outline-primary btn-sm">Eliminar</a>
                                  </div> 
                                </div><br>`;
    }); 
  }
}

function eliminarPublicacion(id){
  // Se pide una confirmacion previa antes de eliminar.
  if (confirm("Desea eliminar la publicacion?")){
    publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
    publicaciones.splice(id,1);
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
    imprimirPublicaciones();
  }
}

function validarFormulario(titulo, descripcion){
  txtError="";
  checkTitulo=true;
  checkDesc=true;
  //Verifica que los parametros titulo y descripcion no esten vacios. 
  if (titulo === ""){
    txtError += "La publicacion debe tener un titulo. \n"
    checkTitulo=false;
  }
  if (descripcion === ""){
    txtError += "La publicacion debe tener una descripcion. \n"
    checkDesc=false;
  }
  if (checkTitulo && checkDesc){
    return true;
  }else{
    //Muestra en forma de alerta el mensaje de error.
    alert(txtError);
    return false;
  }
  
}

