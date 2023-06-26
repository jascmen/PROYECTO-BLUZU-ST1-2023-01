    const nombreInput = document.getElementById('nombre');
    const nombreValidation = document.getElementById('nombre-validation');
    const nombreError = document.getElementById('nombreError');
    const nombreLabel = document.getElementById('nombre-label');

    nombreInput.addEventListener('input', validarPrimerNombre);

    function validarPrimerNombre() {
        const nombre = nombreInput.value.trim();
        const nombreRegExp = /^[A-Za-zÁÉÍÓÚáéíóúÜü\s']+$/;

        if (nombreRegExp.test(nombre)) {
            nombreValidation.innerText = '✔';
            nombreValidation.classList.remove('invalid');
            nombreValidation.classList.add('valid');
            nombreInput.classList.remove('invalid-border');
            nombreError.innerText = '';
        } else {
            nombreValidation.innerText = '✘';
            nombreValidation.classList.remove('valid');
            nombreValidation.classList.add('invalid');
            nombreInput.classList.add('invalid-border');
            nombreError.innerText = 'El primer nombre solo puede contener letras.';
        }

        if (nombreLabel.innerText !== '') {
            nombreLabel.innerText = '';
        }
    }

    const apellidoInput = document.getElementById('apellido');
    const apellidoValidation = document.getElementById('apellido-validation');
    const apellidoError = document.getElementById('apellidoError');
    const apellidoLabel = document.getElementById('apellido-label');

    apellidoInput.addEventListener('input', validarApellido);

    function validarApellido() {
        const apellido = apellidoInput.value.trim();
        const apellidoRegExp = /^[A-Za-zÁÉÍÓÚáéíóúÜü\s']+$/;

        if (apellidoRegExp.test(apellido)) {
            apellidoValidation.innerText = '✔';
            apellidoValidation.classList.remove('invalid');
            apellidoValidation.classList.add('valid');
            apellidoInput.classList.remove('invalid-border');
            apellidoError.innerText = '';
        } else {
            apellidoValidation.innerText = '✘';
            apellidoValidation.classList.remove('valid');
            apellidoValidation.classList.add('invalid');
            apellidoInput.classList.add('invalid-border');
            apellidoError.innerText = 'El apellido solo puede contener letras.';
        }

        if (apellidoLabel.innerText !== '') {
            apellidoLabel.innerText = '';
        }
    }

    function validarDni() {
    const dni = dniInput.value.trim();
    const dniRegExp = /^\d{8}$/ ;

    if (dniRegExp.test(dni)) {
        dniValidation.innerText = '✔';
        dniValidation.classList.remove('invalid');
        dniValidation.classList.add('valid');
        dniInput.classList.remove('invalid-border');
        dniError.innerText = '';
    } else {
        dniValidation.innerText = '✘';
        dniValidation.classList.remove('valid');
        dniValidation.classList.add('invalid');
        dniInput.classList.add('invalid-border');
        dniError.innerText = 'El dni solo puede contener 8 números.';
    }

    if (dniLabel.innerText !== '') {
        dniLabel.innerText = '';
    }
    }

    const emailInput = document.getElementById('email');
    const emailValidation = document.getElementById('email-validation');
    const emailError = document.getElementById('emailError');
    const emailLabel = document.getElementById('email-label');

    emailInput.addEventListener('input', validarEmail);

    function validarEmail() {
    const email = emailInput.value.trim();
    const emailRegExp = /^\S+@\S+\.\S+$/ ;

    if (emailRegExp.test(email)) {
        emailValidation.innerText = '✔';
        emailValidation.classList.remove('invalid');
        emailValidation.classList.add('valid');
        emailInput.classList.remove('invalid-border');
        emailError.innerText = '';
    } else {
        emailValidation.innerText = '✘';
        emailValidation.classList.remove('valid');
        emailValidation.classList.add('invalid');
        emailInput.classList.add('invalid-border');
        emailError.innerText = 'Debe tener este formato "you@example.com".';
    }

    if (emailLabel.innerText !== '') {
        emailLabel.innerText = '';
    }
    }

    const passwordInput = document.getElementById('password');
    const passwordValidation = document.getElementById('password-validation');
    const passwordError = document.getElementById('passwordError');
    const passwordLabel = document.getElementById('password-label');

    passwordInput.addEventListener('input', validarPassword);

    function validarPassword() {
        const password = passwordInput.value.trim();
        const passwordRegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/;

        if (passwordRegExp.test(password)) {
            passwordValidation.innerText = '✔';
            passwordValidation.classList.remove('invalid');
            passwordValidation.classList.add('valid');
            passwordInput.classList.remove('invalid-border');
            passwordError.innerText = '';
        } else {
            passwordValidation.innerText = '✘';
            passwordValidation.classList.remove('valid');
            passwordValidation.classList.add('invalid');
            passwordInput.classList.add('invalid-border');

            if (password === '') {
                passwordError.innerText = 'La contraseña es obligatoria.';
            } else if (!/(?=.*[A-Z])/.test(password)) {
                passwordError.innerText = 'La contraseña debe contener al menos una letra mayúscula (A-Z).';
            } else if (!/(?=.*\d)/.test(password)) {
                passwordError.innerText = 'La contraseña debe contener al menos un dígito (0-9).';
            } else if (password.length < 6) {
                passwordError.innerText = 'La contraseña debe tener al menos 6 caracteres.';
            } else if (password.length > 10) {
                passwordError.innerText = 'La contraseña no puede tener más de 10 caracteres.';
            }
        }

        if (passwordLabel.innerText !== '') {
            passwordLabel.innerText = '';
        }
    }


    const password2Input = document.getElementById('password2');
    const password2Validation = document.getElementById('password2-validation');
    const password2Error = document.getElementById('password2Error');
    const password2Label = document.getElementById('password2-label');

    password2Input.addEventListener('input', validarPassword2);

    function validarPassword2() {
    const password2 = password2Input.value.trim();
    const password1 = document.getElementById('password').value.trim();

    if (password2 === password1) {
        password2Validation.innerText = '✔';
        password2Validation.classList.remove('invalid');
        password2Validation.classList.add('valid');
        password2Input.classList.remove('invalid-border');
        password2Error.innerText = '';
    } else {
        password2Validation.innerText = '✘';
        password2Validation.classList.remove('valid');
        password2Validation.classList.add('invalid');
        password2Input.classList.add('invalid-border');
        password2Error.innerText = 'Las contraseñas no coinciden.';
    }

    if (password2Label.innerText !== '') {
        password2Label.innerText = '';
    }
    }


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




