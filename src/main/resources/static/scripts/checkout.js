$(document).ready(function () {

    cargarCarritoDesdeLocalStorage();
    actualizarSubtotalYTotal();



    // Agregar evento de escucha a los botones de aumentar cantidad
    $(document).on('click', '.btn-aumentar-cantidad', function () {
        const productoId = $(this).data('producto-id');
        aumentarCantidad(productoId);
    });

    // Agregar evento de escucha a los botones de disminuir cantidad
    $(document).on('click', '.btn-disminuir-cantidad', function () {
        const productoId = $(this).data('producto-id');
        disminuirCantidad(productoId);
    });

    // Agregar evento de escucha al botón de eliminar producto
    $(document).on('click', '.btn-eliminar-producto', function () {
        const productoId = $(this).data('producto-id');
        eliminarProducto(productoId);

    });

});


let carritoProductos = [];

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    // Actualizar subtotal y total
    actualizarSubtotalYTotal();
}



function aumentarCantidad(productoId) {
    const productoExistente = carritoProductos.find(item => item.producto.idProd === productoId);

    if (productoExistente) {
        productoExistente.contador++;
        actualizarCantidad(productoId, productoExistente.contador);
        guardarCarritoEnLocalStorage();
    }
}

function disminuirCantidad(productoId) {
    const productoExistente = carritoProductos.find(item => item.producto.idProd === productoId);

    if (productoExistente) {
        if (productoExistente.contador > 1) {
            productoExistente.contador--;
            actualizarCantidad(productoId, productoExistente.contador);
            guardarCarritoEnLocalStorage();
        }
    }
}

function actualizarCantidad(productoId, cantidad) {
    const contadorElement = $(`.contador-producto button[data-producto-id="${productoId}"] + span`);
    contadorElement.text(cantidad);
}




function actualizarSubtotalYTotal() {
    const subtotal = calcularSubtotal();
    const total = subtotal;
    $('.modal__list-price li:first-child strong').text(`S/${subtotal.toFixed(2)}`);
    $('.modal__total-cart').text(`Total: S/${total.toFixed(2)}`);
}



function eliminarProducto(productoId){

    // Eliminar el producto del carrito
    const productoIndex = carritoProductos.findIndex(item => item.producto.idProd === productoId);
    if (productoIndex !== -1) {
        carritoProductos.splice(productoIndex, 1);
        guardarCarritoEnLocalStorage();


        // Eliminar la fila correspondiente
        const filaProducto = $(`.btn-eliminar-producto[data-producto-id="${productoId}"]`).closest('tr');
        filaProducto.remove();
    }

}

// Función para calcular el subtotal
function calcularSubtotal() {
    let subtotal = 0;
    for (const producto of carritoProductos) {
        subtotal += producto.producto.venta * producto.contador;
    }
    return subtotal;
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    // Actualizar subtotal y total
    actualizarSubtotalYTotal();
}

async function cargarCarritoDesdeLocalStorage() {
    const carritoString = localStorage.getItem('carrito');
    carritoProductos = carritoString ? JSON.parse(carritoString) : [];

    const tbody = $('#tabla-checkout tbody');
    tbody.empty();

    for (const producto of carritoProductos) {
        const response = await fetch(`api/productos/${producto.producto.idProd}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const productoDetalle = await response.json();

        const nuevoProductoHtml = `
      <tr>
        <td>
          <div class="media">
            <div class="d-flex">
              <img src="/productos/${productoDetalle.img_prod}" alt="${productoDetalle.nom_prod}">
            </div>
            <div class="media-body">
              <p>${productoDetalle.nom_prod}</p>
            </div>
          </div>
        </td>
        <td>
          <p><strong>S/${productoDetalle.venta}</strong></p>
        </td>
        <td>
          <div class="contador-producto">
            <button class="btn-disminuir-cantidad" data-producto-id="${producto.producto.idProd}">
              <i class="ti-minus"></i>
            </button>
            <span>${producto.contador}</span>
            <button class="btn-aumentar-cantidad" data-producto-id="${producto.producto.idProd}">
              <i class="ti-plus"></i>
            </button>
          </div>
        </td>
        <td>
          <h5>S/12.40</h5>
        </td>
        <td>
          <button class="btn-eliminar-producto" data-producto-id="${producto.producto.idProd}">Eliminar</button>
        </td>
      </tr>
    `;

        tbody.append(nuevoProductoHtml);
    }
}