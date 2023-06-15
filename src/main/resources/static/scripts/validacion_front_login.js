    const nombreInput = document.getElementById('nombre');
    const nombreValidation = document.getElementById('nombre-validation');
    const nombreError = document.getElementById('nombreError');
    const nombreLabel = document.getElementById('nombre-label');

    nombreInput.addEventListener('input', validarPrimerNombre);

    function validarPrimerNombre() {
    const nombre = nombreInput.value.trim();
    const nombreRegExp = /^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+$/;

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
    const apellidoRegExp = /^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+$/;

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

    const dniInput = document.getElementById('dni');
    const dniValidation = document.getElementById('dni-validation');
    const dniError = document.getElementById('dniError');
    const dniLabel = document.getElementById('dni-label');

    dniInput.addEventListener('input', validarDni);

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
    const passwordRegExp = /.+/;

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
        passwordError.innerText = '';
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




