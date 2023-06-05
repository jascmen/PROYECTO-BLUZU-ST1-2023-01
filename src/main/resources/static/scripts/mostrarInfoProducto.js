$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id_product = urlParams.get('id_producto');

  obtenerDatosProducto(id_product);
});

async function obtenerDatosProducto(id_product) {
  const request = await fetch('api/productos/' + id_product, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const producto = await request.json();
  // Asignar los datos del producto a los campos del modal de editar
  asignarDatosProducto(producto);
}

function asignarDatosProducto(producto) {
  document.querySelector('#imagen_producto').innerHTML = '<img class="img-fluid" src="/productos/' + producto.img_prod +'" alt="">';
  document.querySelector('#producto_info').innerHTML = '<h3>' + producto.nom_prod + '</h3><h2>S/ ' + producto.venta + '</h2><ul class="list"><li><a href="#"><span>SKU</span> : '
    + producto.sku_prod + '</a></li><li><a class="active" href="#"><span>Categoría</span> : '
    + producto.categ_prod + '</a></li><li><a href="#"><span>Stock</span> : '
    + producto.cantidad_prod + '</a></li></ul><p>' + producto.resumen_product + '</p>';

  document.querySelector('#home').innerHTML = '<p>' + producto.descrp_prod + '</p>';
}
