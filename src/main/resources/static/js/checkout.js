function showPaymentForm() {
    var paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    var paypalForm = document.getElementById('paypalForm');
    var creditCardForm = document.getElementById('creditCardForm');
    var inexactoForm = document.getElementById('inexactoForm');
    var pagoForm = document.getElementById('pagoForm');
    var montoInput = document.getElementById('cantidad');

    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
    creditCardForm.style.display = 'block';
    inexactoForm.style.display = 'none';
    pagoForm.style.display = 'none';
    montoInput.style.display = 'none';
    paypalForm.style.display = 'none';
    resetPagoContraEntrega();
    } else if (paymentMethod === 'pago') {
    creditCardForm.style.display = 'none';
    inexactoForm.style.display = 'none';
    pagoForm.style.display = 'block';
    montoInput.style.display = 'none';
    paypalForm.style.display = 'none';
    } else {
    creditCardForm.style.display = 'none';
    inexactoForm.style.display = 'none';
    pagoForm.style.display = 'none';
    montoInput.style.display = 'none';
    paypalForm.style.display = 'block';
    }
}

function showExactoInput() {
        var inexactoForm = document.getElementById('inexactoForm');
        var exactoForm = document.getElementById('exactoForm');
        var montoInput = document.getElementById('cantidad');
    
        inexactoForm.style.display = 'none';
        montoInput.style.display = 'none';
        exactoForm.style.display = 'block';
    }
    
    function showInexactoInput() {
        var inexactoRadio = document.getElementById('inexacto');
        var inexactoForm = document.getElementById('inexactoForm');
        var exactoRadio = document.getElementById('exacto');
        var exactoForm = document.getElementById('exactoForm');
        var montoInput = document.getElementById('cantidad');
    
        if (inexactoRadio.checked) {
        inexactoForm.style.display = 'block';
        montoInput.style.display = 'block';
        exactoForm.style.display = 'none';
        } else if (exactoRadio.checked) {
        inexactoForm.style.display = 'none';
        montoInput.style.display = 'none';
        exactoForm.style.display = 'block';
        }
} 

function resetPagoContraEntrega() {
    var pagoContraEntregaRadio = document.getElementById('pago');
    pagoContraEntregaRadio.checked = false;
    var exactoRadio = document.getElementById('exacto');
    exactoRadio.checked = false;
    var inexactoRadio = document.getElementById('inexacto');
    inexactoRadio.checked = false;
    showInexactoInput(); // Ocultar el formulario de monto inexacto si estaba visible
}

// Llamar a la función inicialmente para asegurar que los formularios se muestren u oculten según la opción seleccionada
showPaymentForm();

// Llamar a la función showInexactoInput inicialmente para asegurar que el formulario inexacto se muestre u oculte correctamente según la opción seleccionada
showInexactoInput();