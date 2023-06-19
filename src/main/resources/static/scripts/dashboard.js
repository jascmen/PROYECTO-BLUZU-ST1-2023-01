
$(document).ready(function () {
 obtenerAcceso();
});

 async function obtenerAcceso(){

     token = localStorage.token;

      const request = await fetch('api/dashboard/' + token, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

        const respuesta = await request.text();


        if (respuesta !== "dashboard") {
          window.location.href = 'index.html';
        } else {
          // La respuesta es "dashboard"
          // No es necesario redirigir a la misma página nuevamente
        }


   }

   function cerrarSesion() {
       localStorage.removeItem('token');
       localStorage.removeItem('email');
       window.location.href = 'login.html';
   }