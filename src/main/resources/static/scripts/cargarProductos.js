$(document).ready(function () {

    cargarProductos();
    cargarCarritoDesdeLocalStorage();
    actualizarSubtotalYTotal();

    // Agregar evento de escucha a los botones de agregar al carrito
    $(document).on('click', '.btn-agregar-carrito', function () {
        const productoId = $(this).data('producto-id');
        agregarAlCarrito(productoId);
    });

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
});

async function cargarProductos() {
    const request = await fetch('api/productos', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const productos = await request.json();

    let listadoProductosHtml = '';
    for (let producto of productos) {
        let productoHtml = `
            <div class="col-md-6 col-lg-4">
                <div class="card text-center card-product">
                    <div class="card-product__img">
                        <img class="card-img" src="/productos/${producto.img_prod}" alt="">
                        <ul class="card-product__imgOverlay">
                            <li>
                                <a href="producto.html?id_producto=${producto.idProd}">
                                    <button><i class="ti-search"></i></button>
                                </a>
                            </li>
                            <li>
                                <button class="btn-agregar-carrito" data-producto-id="${producto.idProd}">
                                    <i class="ti-shopping-cart"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <p>${producto.categ_prod}</p>
                        <h4 class="card-product__title"><a href="#">${producto.nom_prod}</a></h4>
                        <p class="card-product__price">S/. ${producto.venta}</p>
                    </div>
                </div>
            </div>
        `;

        listadoProductosHtml += productoHtml;
    }

    document.querySelector('#catalogo-productos').innerHTML = listadoProductosHtml;
}

let carritoProductos = [];

async function agregarAlCarrito(idProd) {
    try {
        // Realizar una solicitud al servidor para obtener el producto por su ID
        const response = await fetch(`api/productos/${idProd}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const producto = await response.json();

        if (producto) {
            // Buscar el producto en el carrito
            const productoExistente = carritoProductos.find(item => item.producto.idProd === producto.idProd);

            if (productoExistente) {
                // Aumentar el contador del producto duplicado
                productoExistente.contador++;

                // Actualizar el contador en el modal
                actualizarCantidadEnModal(producto.idProd, productoExistente.contador);
            } else {
                // Agregar el producto al carrito y establecer el contador en 1
                carritoProductos.push({
                    producto: producto,
                    contador: 1
                });

            }

            guardarCarritoEnLocalStorage();
            cargarCarritoDesdeLocalStorage();
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
    }
}

function aumentarCantidad(productoId) {
    const productoExistente = carritoProductos.find(item => item.producto.idProd === productoId);

    if (productoExistente) {
        productoExistente.contador++;
        actualizarCantidadEnModal(productoId, productoExistente.contador);
        guardarCarritoEnLocalStorage();
    }
}

function disminuirCantidad(productoId) {
    const productoExistente = carritoProductos.find(item => item.producto.idProd === productoId);

    if (productoExistente) {
        if (productoExistente.contador > 1) {
            productoExistente.contador--;
            actualizarCantidadEnModal(productoId, productoExistente.contador);
            guardarCarritoEnLocalStorage();
        }
    }
}

function actualizarCantidadEnModal(productoId, cantidad) {
    const contadorElement = $(`.modal__item[data-producto-id="${productoId}"]`).find('.contador-producto span');
    contadorElement.text(cantidad);
}

function actualizarSubtotalYTotal() {
    const subtotal = calcularSubtotal();
    const total = subtotal;
    $('.modal__list-price li:first-child strong').text(`S/${subtotal.toFixed(2)}`);
    $('.modal__total-cart').text(`Total: S/${total.toFixed(2)}`);
}

// Agregar evento de escucha al botón de eliminar producto
$(document).on('click', '.btn-eliminar-producto', function () {
    const productoId = $(this).data('producto-id');

    // Eliminar el producto del carrito
    const productoIndex = carritoProductos.findIndex(item => item.producto.idProd === productoId);
    if (productoIndex !== -1) {
        carritoProductos.splice(productoIndex, 1);
        guardarCarritoEnLocalStorage();
    }

    // Eliminar el elemento correspondiente en el modal
    $(this).closest('.modal__item').remove();

});

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

    $('.modal__list').empty();

    for (const producto of carritoProductos) {
        // Realizar una solicitud al servidor para obtener los detalles del producto por su ID
        const response = await fetch(`api/productos/${producto.producto.idProd}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const productoDetalle = await response.json();

        const nuevoProductoHtml = `
      <div class="modal__item" data-producto-id="${producto.producto.idProd}">
        <div class="modal__thumb">
          <img src="/productos/${productoDetalle.img_prod}" alt="${productoDetalle.nom_prod}">
        </div>
        <div class="modal__text-product">
          <p>${productoDetalle.nom_prod}</p>
          <p><strong>S/${productoDetalle.venta}</strong></p>
          <div class="contador-producto">
            <button class="btn-disminuir-cantidad" data-producto-id="${producto.producto.idProd}">
              <i class="ti-minus"></i>
            </button>
            <span>${producto.contador}</span>
            <button class="btn-aumentar-cantidad" data-producto-id="${producto.producto.idProd}">
              <i class="ti-plus"></i>
            </button>
          </div>
          <button class="btn-eliminar-producto" data-producto-id="${producto.producto.idProd}">Eliminar</button>
        </div>
      </div>
    `;

        $('.modal__list').append(nuevoProductoHtml);
    }
}
