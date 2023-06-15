// Obtener todos los botones de eliminar
const deleteButtons = document.querySelectorAll('.btn-delete');

// Agregar un evento de clic a cada botón de eliminar
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtener la fila actual
        const row = button.closest('tr');
        
        // Eliminar la fila
        row.remove();
    });
});