$(document).ready(function () {
 cargarProductos();
});



async function  cargarProductos(){

  const request = await fetch('api/productos', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const productos = await request.json();

let listadoProductosHtml = '';
for( let producto of productos){


let productoHtml = '<div class="col-md-6 col-lg-4"> <div class="card text-center card-product"><div class="card-product__img"><img class="card-img" src="/productos/'
                    + producto.img_prod +'" alt=""><ul class="card-product__imgOverlay"><li><a href="producto.html?id_producto='+ producto.idProd +'"><button><i class="ti-search"></i></button></a><button><i  id_producto="'+ producto.idProd +'" class="ti-shopping-cart"></i></button></li></ul> </div><div class="card-body"><p>'
                    + producto.categ_prod  +'</p><h4 class="card-product__title"><a href="#">'
                    + producto.nom_prod + '</a></h4><p class="card-product__price">S/. '+ producto.venta + '</p></div></div></div>';

   listadoProductosHtml += productoHtml;
}
document.querySelector('#catalogo-productos').innerHTML = listadoProductosHtml;


}














