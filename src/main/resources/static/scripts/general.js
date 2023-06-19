$(document).ready(function(){

  actualizarNombreUsuario();
  obtenerDatos();


  });

 async function obtenerDatos(){

     token = localStorage.token;

      const request = await fetch('api/usuarios/' + token, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

        const cliente =  await request.json();
        let nombre = cliente.nombre_cliente;
        actualizarNombreUsuario(nombre);


   }


function actualizarNombreUsuario(nombre){
  var nombreCuenta = document.getElementById('nombreCuenta');
    if (nombre === '') {
      nombreCuenta.innerHTML = '&nbsp;';
    } else {
      nombreCuenta.innerHTML = nombre;
    }
}