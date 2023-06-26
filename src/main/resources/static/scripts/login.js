$(document).ready(function(){

  bindEventHandlers();


  });


  function bindEventHandlers() {

      $("#btnRegistarCliente")
        .off()
        .click(function () {
          if (validateForm()) {
            registraCliente();
            resetForm();

          }
        });


  }

  async function registraCliente(){

    let datos ={};

    datos.nombre_cliente = document.getElementById('nombre').value;
    datos.apellido_cliente = document.getElementById('apellido').value;
    datos.dni = document.getElementById('dni').value;
    datos.email = document.getElementById('email').value;
    datos.password = document.getElementById('password').value;

    const request = await fetch('api/clientes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

      const responseText = await request.text();

       if(responseText == 'OK'){
                window.location.href = 'login.html';

            } else{
            $(correoRegistradoError).modal("show");

            }

  }

  async function iniciarSesion(){

    let datos ={};


    datos.email = document.getElementById('emailIniciar').value;
    datos.password = document.getElementById('passwordIniciar').value;

    const request = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

      const respuesta = await request.text();

      if(respuesta != 'FAIL'){
      localStorage.token = respuesta;
      localStorage.email = datos.email;
      let token = localStorage.token;

      await obtenerAcceso(token);
      console.log(token);
      } else{
      alert ("Las credenciales son incorrectas");
      }


  }

   async function obtenerAcceso(token){

      const request = await fetch('api/dashboard/' + token, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

        const respuesta = await request.text();
        if(respuesta === "dashboard"){
           window.location.href = 'dashboard.html';
        } else {
           window.location.href = 'index.html';
        }



   }


  const nombreApePattern = /^[A-Za-zÁÉÍÓÚáéíóúÜü\s]+$/;
  const correoPattern = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;
  const dniPattern = /^[0-9]{8}$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/;

    function validateForm() {
      let isValid = true;

      // Validar el formulario del paso 1
      if (!nombreApePattern.test($("#nombre").val())) {
        isValid = false;
        $("#nombreError").text("Por favor, ingresa un nombre válido.");
      } else {
        $("#nombreError").text("");
      }

      if (!nombreApePattern.test($("#apellido").val())) {
        isValid = false;
        $("#apellidoError").text("Por favor, ingresa un apellido válido.");
      } else {
        $("#apellidoError").text("");
      }

      if (!dniPattern.test($("#dni").val())) {
        isValid = false;
        $("#dniError").text("Por favor, ingresa un DNI válido.");
      } else {
        $("#dniError").text("");
      }

      if (!correoPattern.test($("#email").val())) {
        isValid = false;
        $("#emailError").text("Por favor, ingresa un correo válido.");
      } else {
        $("#emailError").text("");
      }

      if (!passwordPattern.test($("#password").val())) {
        isValid = false;
        $("#passwordError").text("Por favor, ingresa una contraseña válida.");
      } else {
        $("#passwordError").text("");
      }

      let repetirPassword = document.getElementById('password2').value;
      let password = document.getElementById('password').value;

      if (repetirPassword != password) {
        isValid = false;
        $("#password2Error").text("Las contraseñas no coinciden.");
      } else {
        $("#password2Error").text("");
      }

      return isValid;
    }

      function resetForm() {

        $(".error-message").text("");
      }