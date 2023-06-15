var nameInput = document.getElementById('name');
var nameValidation = document.getElementById('name-validation');
var nameError = document.getElementById('nameError');

nameInput.addEventListener('input', function() {
    var value = nameInput.value;
    var words = value.trim().split(' ');

    var isValid = words.every(function(word) {
        return /^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+$/.test(word);
    });

    if (isValid) {
        nameValidation.textContent = '✔';
        nameValidation.classList.add('valid');
        nameValidation.classList.remove('invalid');
        nameInput.classList.remove('invalid-line');
        nameError.innerText = '';
    } else {
        nameValidation.textContent = '✘';
        nameValidation.classList.add('invalid');
        nameValidation.classList.remove('valid');
        nameInput.classList.add('invalid-line');
        nameError.innerText = 'Ingresar solo letras.';
    }
});

nameInput.addEventListener('blur', function() {
    var value = nameInput.value;
    if (value.length === 0) {
        nameInput.classList.remove('valid-line');
        nameInput.classList.add('invalid-line');
    }
});

var emailInput = document.getElementById('email');
var emailValidation = document.getElementById('email-validation');
var emailError = document.getElementById('emailError');

emailInput.addEventListener('input', function() {
    var value = emailInput.value;
    if (/^\S+@\S+\.\S+$/.test(value)) {
        emailValidation.textContent = '✔';
        emailValidation.classList.add('valid');
        emailValidation.classList.remove('invalid');
        emailInput.classList.remove('invalid-line');
        emailError.innerText = '';
    } else {
        emailValidation.textContent = '✘';
        emailValidation.classList.add('invalid');
        emailValidation.classList.remove('valid');
        emailInput.classList.add('invalid-line');
        emailError.innerText = 'Ingresa un correo válido';
    }
});

emailInput.addEventListener('focus', function() {
    emailInput.classList.remove('valid-line');
});

emailInput.addEventListener('blur', function() {
    var value = emailInput.value;
    if (value.length === 0) {
        emailInput.classList.remove('valid-line');
        emailInput.classList.add('invalid-line');
    }
});

var subjectInput = document.getElementById('subject');
var subjectValidation = document.getElementById('subject-validation');
var subjectError = document.getElementById('subjectError');

subjectInput.addEventListener('input', function() {
    var value = subjectInput.value;
    if (value.length >= 5) {
        subjectValidation.textContent = '✔';
        subjectValidation.classList.add('valid');
        subjectValidation.classList.remove('invalid');
        subjectInput.classList.remove('invalid-line');
        subjectError.innerText = '';
    } else {
        subjectValidation.textContent = '✘';
        subjectValidation.classList.add('invalid');
        subjectValidation.classList.remove('valid');
        subjectInput.classList.add('invalid-line');
        subjectError.innerText = 'El asunto debe tener al menos 5 caracteres.';
        }
});

subjectInput.addEventListener('focus', function() {
    subjectInput.classList.remove('valid-line');
});

subjectInput.addEventListener('blur', function() {
    var value = subjectInput.value;
    if (value.length === 0) {
        subjectInput.classList.remove('valid-line');
        subjectInput.classList.add('invalid-line');
    }
});

var messageInput = document.getElementById('message');
var messageValidation = document.getElementById('message-validation');

messageInput.addEventListener('input', function() {
    var value = messageInput.value;
    if (value.length > 0) {
        messageValidation.textContent = '✔';
        messageValidation.classList.add('valid');
        messageValidation.classList.remove('invalid');
        messageInput.classList.remove('invalid-line');
    } else {
        messageValidation.textContent = '✘';
        messageValidation.classList.add('invalid');
        messageValidation.classList.remove('valid');
        messageInput.classList.add('invalid-line');
    }
});

messageInput.addEventListener('focus', function() {
    messageInput.classList.remove('valid-line');
});

messageInput.addEventListener('blur', function() {
    var value = messageInput.value;
    if (value.length === 0) {
        messageInput.classList.remove('valid-line');
        messageInput.classList.add('invalid-line');
    }
});