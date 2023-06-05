$(document).ready(function () {
 cargarProveedores();
 cargarProductos();
  bindEventHandlers();
  cargarCategproductos();
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

let productoHtml = '<tr><td><div class=""><input class="form-check-input checkbox-producto" type="checkbox" data-id-producto="'
                   + producto.idProd +'" /></div></td><td>'
                   + producto.idProd +'</td><td class="table-text-wrap">'
                   + producto.sku_prod +'</td><td class="table-text-wrap"> '+ producto.nom_prod + '</td><td><div class="descripcion-oculta">'
                   + producto.descrp_prod +'</div><button class="boton-descripcion" >Mostrar más</button></td><td><div class="resumen-oculto">'
                   + producto.resumen_product +'</div><button class="boton-resumen" >Mostrar más</button></td><td class="table-text-wrap">'
                   + producto.cantidad_prod +'</td><td class="table-text-wrap">'
                   + producto.categ_prod  +'</td><td class="table-text-wrap">'
                   + producto.compra + '</td><td class="table-text-wrap">'
                   + producto.venta + '</td><td class="table-text-wrap">'
                   + producto.descuento +'</td><td class="table-text-wrap"> '+ producto.proveedor+'</td><td><img class="imagen-media" src="/productos/'
                   + producto.img_prod +'" alt="" /></td><th><a class="edit" data-bs-toggle="modal" data-bs-target="#modalEditarProducto" data-id-producto="'
                   + producto.idProd +'"><i class="material-icons ri-edit-2-fill" data-toggle="tooltip" title="Editar"></i></a><a class="delete" data-bs-toggle="modal" data-bs-target="#eliminarProductoModal" data-id-producto="'
                   + producto.idProd +'"><i class="material-icons ri-delete-bin-5-line" data-toggle="tooltip"title="Eliminar"></i></a></th></tr>';

   listadoProductosHtml += productoHtml;
}
document.querySelector('#tabla-productos tbody').innerHTML = listadoProductosHtml;


// Evento click para capturar el idProd al eliminar
  const botonesEliminar = document.querySelectorAll('.delete');
  for (let boton of botonesEliminar) {
    boton.addEventListener('click', function() {
      const idProd = this.getAttribute('data-id-producto');
      const botonEliminarProducto = document.querySelector('#btnEliminarProducto');
      botonEliminarProducto.setAttribute('data-id-producto', idProd);
    });
  }
// Evento click para capturar el idProd al editar
  const botonesEditar = document.querySelectorAll('.edit');
    for (let boton of botonesEditar) {
      boton.addEventListener('click', function() {
        const idProd = this.getAttribute('data-id-producto');
        const botonEditarProducto = document.querySelector('#btnGuardarEditarProducto');
        botonEditarProducto.setAttribute('data-id-producto', idProd);
        obtenerDatosProducto(idProd);
      });
    }

const descripciónBoton = document.querySelectorAll('.boton-descripcion');
for (let botoncito of descripciónBoton) {
  botoncito.addEventListener('click', function() {
    var descripcionOculta = this.parentNode.querySelector('.descripcion-oculta');
    var texto = descripcionOculta.innerText;
    $('#descripcionModalBody').html(texto);
    $(descripcionModal).modal("show");
  });
}

const resumenBoton = document.querySelectorAll('.boton-resumen');
for (let botoncito of resumenBoton) {
  botoncito.addEventListener('click', function() {
    var resumenOculto = this.parentNode.querySelector('.resumen-oculto');
    var texto = resumenOculto.innerText;
    $('#resumenModalBody').html(texto);
    $(resumenModal).modal("show");
  });
}




}



// Evento click para validar modal eliminar productos
document.getElementById('btnValidarEliminacionModal').addEventListener('click', function() {
  const checkboxesSeleccionados = Array.from(document.querySelectorAll('.checkbox-producto:checked'));
  const ids_productos = checkboxesSeleccionados.map(function(checkbox) {
    return checkbox.getAttribute('data-id-producto');
  });

  if (ids_productos.length > 0) {
    $('#eliminarProductosModal').modal("show");
  } else {
    $('#productosEliminadosVacio').modal("show");
  }
});


// Evento click para eliminar el producto
document.getElementById('btnEliminarProducto').addEventListener('click', function() {
  const idProd = this.getAttribute('data-id-producto');
  eliminarProducto(idProd);
});

// Evento click para eliminar  productos
document.getElementById('btnEliminarProductos').addEventListener('click', function() {
    // Obtener los checkboxes de productos seleccionados
    const checkboxesSeleccionados = Array.from(document.querySelectorAll('.checkbox-producto:checked'));
    // Obtener los IDs de los categorias seleccionados
    const ids_productos = checkboxesSeleccionados.map(function(checkbox) {
      return checkbox.getAttribute('data-id-producto');
    });

    // Llamar a la función para eliminar los productos seleccionados
    eliminarProductos(ids_productos);
});


async function registrarProducto(){
  const sku = document.getElementById('codigoSKUInput').value;
  const nombre = document.getElementById('nombreProductoInput').value;
  const descripcion = document.getElementById('descripcionProductoInput').value;
  const resumen = document.getElementById('ResumenProducto').value;
  const cantidad = document.getElementById('cantidadInput').value;
  const categoria = document.getElementById('categoriaProductoInput').value;
  const precioCompra = document.getElementById('precioCompraInput').value;
  const descuento = document.getElementById('descuentoInput').value;
  const proveedor = document.getElementById('proveedorProductoInput').value;
  const productoImagen = document.getElementById('imagenProductoAgregarInput').files[0];

  const formData = new FormData();
  formData.append('productoImagen', productoImagen);
  formData.append('sku', sku);
   formData.append('descripcion', descripcion);
   formData.append('resumen_prod', resumen);
  formData.append('nombre', nombre);
  formData.append('cantidad', cantidad);
  formData.append('categoria', categoria);
  formData.append('precioCompra', precioCompra);
  formData.append('descuento', descuento);
  formData.append('proveedor', proveedor);

  const request = await fetch('api/productos', {
    method: 'POST',
    body: formData
  });
cargarProductos();

}

async function editarProducto(idProd){
  const nombre = document.getElementById('nombreProductoEdit').value;
  const descripcion = document.getElementById('descripcionProductoEdit').value;
  const resumen = document.getElementById('ResumenProductoEdit').value;
  const categoria = document.getElementById('categoriaProductoEdit').value;
  const proveedor = document.getElementById('proveedorProductoEdit').value;
  const precioCompra = document.getElementById('precioCompraEdit').value;
  const descuento = document.getElementById('descuentoEdit').value;
  const productoImagen = document.getElementById('productoImagenEdit').files[0];

   const formData = new FormData();
   formData.append('id', idProd);
    formData.append('productoImagen', productoImagen);
     formData.append('descripcion', descripcion);
    formData.append('nombre', nombre);
    formData.append('categoria', categoria);
    formData.append('precioCompra', precioCompra);
    formData.append('descuento', descuento);
    formData.append('proveedor', proveedor);
    formData.append('resumen_prod', resumen);

  const request = await fetch('api/productos/' + idProd, {
    method: 'PUT',
    body: formData
  });
  cargarProductos();
}



async function eliminarProducto(idProd) {
  // Lógica para eliminar el categoria con el id_categoria correspondiente

  const request = await fetch('api/productos/' + idProd, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  cargarProductos();
}

async function eliminarProductos(ids_productos) {
  // Lógica para eliminar los productos con los IDs proporcionados
  for (let idProd of ids_productos) {
    const request = await fetch('api/productos/' + idProd, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    // Procesar la respuesta si es necesario
  }
  // Actualizar la tabla después de eliminar los productos
  cargarProductos();

}



async function obtenerDatosProducto(idProd) {
  const request = await fetch('api/productos/' + idProd, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
    const producto = await request.json();
    // Asignar los datos del categoria a los campos del modal de editar
   asignarDatosProducto(producto);
}

function asignarDatosProducto(producto){
document.getElementById('nombreProductoEdit').value = producto.nom_prod ;
document.getElementById('descripcionProductoEdit').value = producto.descrp_prod ;
document.getElementById('ResumenProductoEdit').value = producto.resumen_product ;
document.getElementById('categoriaProductoEdit').value = producto.categ_prod ;
document.getElementById('proveedorProductoEdit').value = producto.proveedor ;
document.getElementById('precioCompraEdit').value = producto.compra ;
document.getElementById('descuentoEdit').value = producto.descuento ;

}





async function cargarCategproductos(){

const request = await fetch('api/categorias', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const categorias = await request.json();
let listadoCategoriasHtml = '';

  const selectCategoria1 = document.getElementById('categoriaProductoInput');
  const selectCategoria2 = document.getElementById('categoriaProductoEdit');


for (let categoria of categorias) {
  const opcionCategoria = document.createElement('option');
  opcionCategoria.text = categoria.name_categ_prod;
  selectCategoria1.appendChild(opcionCategoria);
}

for (let categoria of categorias) {
  const opcionCategoria = document.createElement('option');
  opcionCategoria.text = categoria.name_categ_prod;
  selectCategoria2.appendChild(opcionCategoria);
}


}

async function cargarProveedores(){

const request = await fetch('api/proveedores', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const proveedores = await request.json();
  let listadoCategoriasHtml = '';

  const selectCategoria1 = document.getElementById('proveedorProductoInput');
  const selectCategoria2 = document.getElementById('proveedorProductoEdit');


for (let proveedor of proveedores) {
  const opcionCategoria = document.createElement('option');
  opcionCategoria.text = proveedor.nombre_prov;
  selectCategoria1.appendChild(opcionCategoria);
}

for (let proveedor of proveedores) {
  const opcionCategoria = document.createElement('option');
  opcionCategoria.text = proveedor.nombre_prov;
  selectCategoria2.appendChild(opcionCategoria);
}


}


let currentStep = 1;
let totalSteps = $(".step").length;

  const nombrePattern = /^[A-Za-z0-9\s]{10,120}$/;
  const cantidadPattern = /^(?!0+$)\d{1,3}$/;
  const codigoSKUPattern = /^\d{5,}$/;
  const precioCompraPattern = /^\d{1,3}(?:,\d{3})*(?:\.\d{2})?$/;
  const precioVentaPattern = /^\d{1,3}(?:,\d{3})*(?:\.\d{2})?$/;
  const descuentoPattern = /^([0-9]|[1-8][0-9]|90)$/;

  function validateForm(step) {
    let isValid = true;

    if (step === 1) {
      // Validar el formulario del paso 1
      if (!codigoSKUPattern.test($("#codigoSKUInput").val())) {
        isValid = false;
        $("#codigoSKUError").text("Por favor, ingresa un codigo valido.");
      } else {
        $("#codigoSKUError").text("");
      }

      if (!nombrePattern.test($("#nombreProductoInput").val())) {
        isValid = false;
        $("#nombreProductoError").text("Por favor, ingresa un nombre válido.");
      } else {
        $("#nombreProductoError").text("");
      }

      // Validar el campo "Categoría"
      if ($("#categoriaProductoInput").val() === "Seleccionar categoría") {
        isValid = false;
        $("#categoriaProductoError")
          .text("Por favor, selecciona una categoría.");
      } else {
        $("#categoriaProductoError").text("");
      }

      // Validar el campo "Proveedor"
      if ($("#proveedorProductoInput").val() === "Seleccionar proveedor") {
        isValid = false;
        $("#proveedorProductoError")
          .text("Por favor, selecciona un proveedor.");
      } else {
        $("#proveedorProductoError").text("");
      }

      // Validar el campo "Descripción"
      if ($("#descripcionProductoInput").val().trim() === "") {
        isValid = false;
        $("#descripcionProductoError")
          .text("Por favor, ingresa la descripción del producto.");
      } else {
        $("#descripcionProductoError").text("");
      }
      // Validar el campo "Resumen"
               if ($("#ResumenProducto").val().trim() === "") {
                 isValid = false;
                 $("#ResumenProductoError").text(
                 "Por favor, ingresa un resumen del producto."
                 );
                 } else {
                 $("#ResumenProductoError").text("");
               }

    }
    if (step === 2) {
      // Validación para el segundo formulario

      if (!precioCompraPattern.test($("#precioCompraInput").val())) {
        isValid = false;
        $("#precioCompraInputError")
          .text("Por favor, ingresa un precio de compra válido.");
      } else {
        $("#precioCompraInputError").text("");
      }


      if (!descuentoPattern.test($("#descuentoInput").val())) {
        isValid = false;
        $("#descuentoInputError")
          .text("Por favor, ingresa un descuento válido entre 0 y 90.");
      } else {
        $("#descuentoInputError").text("");
      }

      if (
        !cantidadPattern.test($("#cantidadInput").val()) ||
        $("#cantidadInput").val() <= 0 ||
        $("#cantidadInput").val() >= 1000
      ) {
        isValid = false;
        $("#cantidadInputError")
          .text("Por favor, ingresa una cantidad válida.");
      } else {
        $("#cantidadInputError").text("");
      }


    }
    if (step === 3) {
      let imagenInput = $("#imagenProductoAgregarInput").val();
      if (imagenInput.trim() === "") {
        isValid = false;
        $("#imagenProductoAgregarInputError").text(
          "Por favor, selecciona una imagen."
        );
      } else {
        $("#imagenProductoAgregarInputError").text("");
      }
    }

    if(step === 4) {

        if (!nombrePattern.test($("#nombreProductoEdit").val())) {
          isValid = false;
          $("#nombreProductoEditError").text(
            "Por favor, ingresa un nombre válido."
          );
        } else {
          $("#nombreProductoEditError").text("");
        }

        // Validar el campo "Categoría"
        if ($("#categoriaProductoEdit").val() === "Seleccionar categoría") {
          isValid = false;
          $("#categoriaProductoEditError").text(
            "Por favor, selecciona una categoría."
          );
        } else {
          $("#categoriaProductoEditError").text("");
        }

        // Validar el campo "Proveedor"
        if ($("#proveedorProductoEdit").val() === "Seleccionar proveedor") {
          isValid = false;
          $("#proveedorProductoEditError").text(
            "Por favor, selecciona un proveedor."
          );
        } else {
          $("#proveedorProductoEditError").text("");
        }

        // Validar el campo "Descripción"
        if ($("#descripcionProductoEdit").val().trim() === "") {
          isValid = false;
          $("#descripcionProductoEditError").text(
            "Por favor, ingresa la descripción del producto."
          );
        } else {
          $("#descripcionProductoEditError").text("");
        }

        // Validar el campo "Resumen"
         if ($("#ResumenProductoEdit").val().trim() === "") {
           isValid = false;
           $("#ResumenProductoEditError").text(
           "Por favor, ingresa un resumen del producto."
           );
           } else {
           $("#ResumenProductoEditError").text("");
         }

         if (!precioCompraPattern.test($("#precioCompraEdit").val())) {
           isValid = false;
           $("#precioCompraEditError").text(
             "Por favor, ingresa un precio de compra válido."
           );
         } else {
           $("#precioCompraEditError").text("");
         }

         if (!descuentoPattern.test($("#descuentoEdit").val())) {
           isValid = false;
           $("#descuentoEditError").text(
             "Por favor, ingresa un descuento válido entre 0 y 90."
           );
         } else {
           $("#descuentoEditError").text("");
         }


          let imagenInput = $("#productoImagenEdit").val();
                  if (imagenInput.trim() === "") {
                    isValid = false;
                    $("#productoImagenEditError").text(
                      "Por favor, selecciona una imagen."
                    );
                  } else {
                    $("#productoImagenEditError").text("");
                  }
    }
    return isValid;
  }

  function bindEventHandlers() {
    $("#nextBtn")
      .off()
      .click(function () {
        if (currentStep < totalSteps) {
          if (validateForm(currentStep)) {
            $("#paso" + currentStep).hide();
            $("#paso" + (currentStep + 1)).show();
            currentStep++;

            $(".paso").removeClass("paso-activo");
            $(".paso:nth-child(-n+" + currentStep + ")").addClass(
              "paso-activo"
            );
            $(".indicator").css(
              "width",
              ((currentStep - 1) / (totalSteps - 1)) * 100 + "%"
            );

            if (currentStep === totalSteps) {
              $("#nextBtn").hide();
              $("#guardarProductoBtn").show();
            }

            $("#prevBtn").show();
          }
        }
      });

    $("#prevBtn")
      .off()
      .click(function () {
        if (currentStep > 1) {
          $("#paso" + currentStep).hide();
          $("#paso" + (currentStep - 1)).show();
          currentStep--;

          $(".paso").removeClass("paso-activo");
          $(".paso:nth-child(-n+" + currentStep + ")").addClass("paso-activo");
          $(".indicator").css(
            "width",
            ((currentStep - 1) / (totalSteps - 1)) * 100 + "%"
          );

          if (currentStep === 1) {
            $("#prevBtn").hide();
          }

          $("#nextBtn").show();
          $("#guardarProductoBtn").hide();
        }
      });

    $("#guardarProductoBtn").off().click(function () {
        if (validateForm(currentStep)) {
          registrarProducto();
          resetModal();
          $("#agregarProductoModal").modal("hide");
            $(agregarProductoExito).modal("show");
        }
      });

    $("#confirmarCancelarGuardarBtn")
      .off()
      .click(function () {
        resetModal();
        $("#agregarProductoModal").modal("hide");
      });


    $("#btnGuardarEditarProducto")
      .off()
      .click(function () {
        if (validateForm(4)) {
        const idProd = this.getAttribute('data-id-producto');
       editarProducto(idProd);
          resetFormEdit();
          $("#modalEditarProducto").modal("hide");
          $(ModalEditExito).modal("show");
        }
    });

    $("#cancelarEditarDatosBtn").off().click(function () {
      resetFormEdit();
      $("#modalEditarProducto").modal("hide");
    });



  }

   $("#imagenProductoAgregarInput").change(function () {
     let inputFile = this;
     if (inputFile.files && inputFile.files[0]) {
       let reader = new FileReader();
       reader.onload = function (e) {
         $("#imagenProductoPreview").html(
           '<img src="' +
             e.target.result +
             '" class="img-fluid" alt="Preview" />'
         );
       };
       reader.readAsDataURL(inputFile.files[0]);
     } else {
       $("#imagenProductoPreview").empty();
     }
   });


   $("#productoImagenEdit").change(function () {
     let inputFile = this;
     if (inputFile.files && inputFile.files[0]) {
       let reader = new FileReader();
       reader.onload = function (e) {
         $("#imagenProductoPreviewEdit").html(
           '<img src="' +
             e.target.result +
             '" class="img-fluid" alt="Preview" />'
         );
       };
       reader.readAsDataURL(inputFile.files[0]);
     } else {
       $("#imagenProductoPreviewEdit").empty();
     }
   });

  function resetForm() {
    $("#codigoSKUInput").val("");
    $("#nombreProductoInput").val("");
    $("#categoriaProductoInput").val("Seleccionar categoría");
    $("#proveedorProductoInput").val("Seleccionar proveedor");
    $("#descripcionProductoInput").val("");
    $("#ResumenProducto").val("");
    $("#precioCompraInput").val("");
    $("#precioVentaInput").val("");
    $("#descuentoInput").val("");
    $("#cantidadInput").val("");
    $("#fechaProductoAgregarInput").val("");
    $("#imagenProductoAgregarInput").val("");
    $("#imagenProductoPreview").empty();


    $(".error-message").text("");
  }

  function resetFormEdit(){
     $("#codigoSKUEdit").val("");
     $("#nombreProductoEdit").val("");
     $("#categoriaProductoEdit").val("Seleccionar categoría");
     $("#proveedorProductoEdit").val("Seleccionar proveedor");
     $("#descripcionProductoEdit").val("");
     $("#ResumenProductoEdit").val("");
     $("#precioCompraEdit").val("");
     $("#precioVentaEdit").val("");
     $("#descuentoEdit").val("");
     $("#cantidadProductoEdit").val("");
     $("#fechaProductoEdit").val("");
     $("#productoImagenEdit").val("");
     $("#imagenProductoPreviewEdit").empty();

     $(".error-message").text("");
  }

  function resetModal() {
    resetForm();
    currentStep = 1;
    $(".step").hide();
    $("#paso1").show();
    $(".paso").removeClass("paso-activo");
    $(".paso:first-child").addClass("paso-activo");
    $(".indicator").css("width", "0%");
    $("#prevBtn").hide();
    $("#nextBtn").show();
    $("#guardarProductoBtn").hide();
  }



