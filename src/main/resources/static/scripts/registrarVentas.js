
$(document).ready(function () {
obtenerAcceso();
bindEventHandlers();
cargarVentas();
});

 async function obtenerAcceso(){

     token = localStorage.token;

      const request = await fetch('api/dashboard/' + token, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

        const respuesta = await request.text();
        if(respuesta !== "dashboard"){
           window.location.href = 'index.html';
        } else {

        }


   }

    function cerrarSesion() {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          window.location.href = 'login.html';
      }


$('#buscarProducto').keyup(function() {


    var term = $(this).val();
    if (term.length >= 2) {
        $.ajax({
            url: '/api/productosNombre/' + term,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var sugerencias = '';
                data.forEach(function(item) {
                    sugerencias += '<button class="dropdown-item sugerencia" type="button" data-producto="' + item.idProd + '">' + item.nom_prod + '</button>';
                });
                $('#sugerencias').html(sugerencias);
                $('#sugerencias').addClass('show');
            }
        });
    } else {
        $('#sugerencias').empty();
        $('#sugerencias').removeClass('show');
    }
});


$('#sugerencias').on('click', '.sugerencia', function() {

    var producto = $(this).data('producto');

    $('#buscarProducto').val('');
    $('#sugerencias').empty();
    $('#sugerencias').removeClass('show');

    // Agregar producto a la tabla


    obtenerDatosProducto(producto);
});



function agregarProductoTabla(producto) {
    var cantidad = 1;
    var $tabla = $('#productos-venta');

    // Verificar si el producto ya existe en la tabla
    var $filaExistente = $tabla.find('tbody tr[data-producto="' + producto.idProd + '"]');
    if ($filaExistente.length > 0) {
        var $inputCantidad = $filaExistente.find('.cantidad-input');
        var cantidadExistente = parseInt($inputCantidad.val());
        cantidad = cantidadExistente + 1;
        $inputCantidad.val(cantidad);
        actualizarSubtotal($filaExistente, cantidad);
        calcularTotal();
        return; // Finalizar la función si el producto ya existe
    }

    var fila = '<tr data-producto="' + producto.idProd + '">' +
        '<td>' + producto.sku_prod + '</td>' +
        '<td>' + producto.nom_prod + '</td>' +
        '<td>' + producto.venta + '</td>' +
        '<td>' +
        '<input type="number" class="form-control cantidad-input" min="1" value="' + cantidad + '" >' +
        '</td>' +
        '<td class="subtotal"></td>' +
        '<td class="delete"><i class="material-icons ri-delete-bin-line"></i></td>' +
        '</tr>';

    $tabla.find('tbody').append(fila);
    var $nuevaFila = $tabla.find('tbody tr:last-child');
    actualizarSubtotal($nuevaFila, cantidad);
    calcularTotal();
}

// Función para actualizar el subtotal
function actualizarSubtotal($fila, cantidad) {
    var precioUnitario = parseFloat($fila.find('td:eq(2)').text());
    var subtotal = cantidad * precioUnitario;
    $fila.find('.subtotal').text(subtotal);
}

// Función para calcular el total
function calcularTotal() {
    var $tabla = $('#productos-venta');
    var $filas = $tabla.find('tbody tr');
    var total = 0;

    $filas.each(function() {
        var subtotal = parseFloat($(this).find('.subtotal').text());
        total += subtotal;
    });

    var $filaTotal = $tabla.find('tfoot .total');
    $filaTotal.text(total);
}

// Escuchar cambios en la cantidad y actualizar subtotal
$('#productos-venta').on('input', '.cantidad-input', function() {
    var cantidad = parseInt($(this).val());
    if (cantidad < 0) {
        $(this).val(0); // Establecer el valor en 0 si se ingresa un número negativo
        cantidad = 0;
    }
    var $fila = $(this).closest('tr');
    actualizarSubtotal($fila, cantidad);
    calcularTotal();
});

// Eliminar fila al hacer clic en el icono de eliminación
$('#productos-venta').on('click', '.delete', function() {
    $(this).closest('tr').remove();
    calcularTotal();
});




async function registrarVenta(){

 let datos ={};

  datos.datos_cliente = document.getElementById('ventaNombre').value;
  datos.dni_cliente = document.getElementById('ventaDNI').value;
  datos.email_cliente = document.getElementById('ventaEmail').value;
  datos.celular_cliente = document.getElementById('ventaCelular').value;
  datos.tipo_pago = document.getElementById('ventaTipoPago').value;
  datos.descripcion = document.getElementById('ventaDescripcion').value;


  var productoIds = [];
  var cantidades = [];

  $('#productos-venta tbody tr').each(function() {
      var idProducto = $(this).data('producto');
      var cantidad = parseInt($(this).find('.cantidad-input').val());

      productoIds.push(idProducto);
      cantidades.push(cantidad);
  });


  const request = await fetch('api/ventas', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
                venta: datos,
                productoIds: productoIds,
                cantidades: cantidades
            })
  });
    const response = await request.text();
    cargarVentas();

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
   agregarProductoTabla(producto);
}

async function cargarVentas(){

 const request = await fetch('api/ventas', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const ventas = await request.json();

  const table = $('#tabla-ventas ').DataTable();

    table.clear(); // Limpiar la tabla existente


for (let venta of ventas) {
  table.row.add([
    '<div class=""><input class="form-check-input checkbox-venta" type="checkbox" data-id-venta="' + venta.id_venta + '"/></div>',
    venta.id_venta,
    '<td class="table-text-wrap">' + venta.dni_cliente + '</td>',
    '<td class="descripcion-text-wrap">' + venta.datos_cliente + '</td>',
    '<td class="table-text-wrap">' + venta.total_venta + '</td>',
    '<td class="table-text-wrap">' + venta.fecha_venta + '</td>',
    '<a class="edit" data-bs-toggle="modal" data-bs-target="#modalMostrarDetalles" data-id-venta="' + venta.id_venta + '"><i class="material-icons ri-article-line" data-toggle="tooltip" title="Detalles"></i></a><a class="pdf" data-id-venta="' +
     venta.id_venta + '"><i class="material-icons ri-file-pdf-line" data-toggle="tooltip" title="PDF"></i></a><a class="excel" data-id-venta="' + venta.id_venta + '"><i class="material-icons ri-file-excel-line" data-toggle="tooltip" title="Excel"></i></a>'
  ]);
}
table.draw(); // Redibujar la tabla con los nuevos datos


  const botonPDF = document.querySelectorAll('.pdf');
  for (let boton of botonPDF) {
    boton.addEventListener('click', function() {
      const id_venta = this.getAttribute('data-id-venta');
      reportePDF(id_venta);
    });
  }

    const botonExcel = document.querySelectorAll('.excel');
    for (let boton of botonExcel) {
      boton.addEventListener('click', function() {
        const id_venta = this.getAttribute('data-id-venta');
        reporteExcel(id_venta);
      });
    }

// Evento click para capturar el id_venta y mostrarDetalles
  const botonesMostrar = document.querySelectorAll('.edit');
    for (let boton of botonesMostrar) {
      boton.addEventListener('click', function() {
        const id_venta = this.getAttribute('data-id-venta');
        obtenerDatosVenta(id_venta);
        obtenerItemsVenta(id_venta);
      });
    }

}

async function reportePDF(id_venta) {
  const response = await fetch('api/reportePdf/' + id_venta, {
    method: 'GET',
    headers: {
      'Accept': 'application/pdf'
    },
    responseType: 'blob' // Indicar que se espera una respuesta de tipo Blob (archivo)
  });

  const blob = await response.blob();

 // Opción 1: Descargar el archivo
   const url = URL.createObjectURL(blob);
   const fileName = 'reporte.pdf'; // Nombre del archivo

   const link = document.createElement('a');
   link.href = url;
   link.target = '_blank';
   link.download = fileName; // Establecer el nombre del archivo para descargar
   link.click();

     // Opción 2: Abrir en una nueva ventana o pestaña
     //const url = URL.createObjectURL(blob);
     //window.open(url, '_blank');
}

async function reporteExcel(id_venta) {
  const response = await fetch('api/reporteExcel/' + id_venta, {
    method: 'GET',
    headers: {
      'Accept': 'application/octet-stream' // Cambiar el tipo MIME a application/octet-stream para indicar que se espera un archivo binario
    },
    responseType: 'blob' // Indicar que se espera una respuesta de tipo Blob (archivo)
  });

  const blob = await response.blob();

  // Opción 1: Descargar el archivo
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'reporte.xlsx'; // Cambiar la extensión del archivo a .xlsx
  link.click();

}




async function obtenerDatosVenta(id_venta) {
  const request = await fetch('api/ventas/' + id_venta, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
    const venta = await request.json();
    // Asignar los datos del categoria a los campos del modal de editar
   mostrarDatosVenta(venta);
}

async function obtenerItemsVenta(id_venta) {
  const request = await fetch('api/detalleventas/' + id_venta, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
    const detalles = await request.json();
    // Asignar los datos del categoria a los campos del modal de editar
   mostrarItemsVenta(detalles);
}




function mostrarDatosVenta(venta){
  document.getElementById('nombreDetalles').value = venta.datos_cliente;
  document.getElementById('dniDetalles').value = venta.dni_cliente;
  document.getElementById('emailDetalles').value = venta.email_cliente;
  document.getElementById('celularDetalles').value = venta.celular_cliente;
  document.getElementById('tipoPagoDetalles').value = venta.tipo_pago;
  document.getElementById('descripcionDetalles').value = venta.descripcion;
  document.getElementById('fechaDetalles').value = venta.fecha_venta;
  document.getElementById('totalVenta').value = venta.total_venta;

}

function mostrarItemsVenta(detalles){

    let $tabla = document.getElementById('detalles-venta');
    for (let i = 0; i < detalles.length; i++) {
      let item = detalles[i];
      let fila = '<tr>' +
        '<td>' + item.codigo+ '</td>' +
        '<td>' + item.nombre+ '</td>' +
        '<td>' + item.cantidad+ '</td>' +
        '<td>' +  item.precio + '</td>' +
        '<td>' +  item.subtotal + '</td>';

      $tabla.querySelector('tbody').insertAdjacentHTML('beforeend', fila);
    }

}



 function bindEventHandlers() {
    $("#guardarVentaBtn")
      .off()
      .click(function () {
        if (validateForm()) {
        registrarVenta();
          resetForm();
          $("#modalRegistrarVenta").modal("hide");
          $(ventaRegistradaModal).modal("show");
          }
      });

      $("#btnCerrarDetalles")
            .off()
            .click(function () {
            const tabla = document.getElementById('detalles-venta');
              // Limpiar contenido de la tabla
              tabla.querySelector('tbody').innerHTML = '';
            });

    $("#confirmarCancelarGuardarCategoriaBtn")
      .off()
      .click(function () {
        $("#modalCategoria").modal("hide");
        resetForm();
      });

    $("#guardarEditCategoriaBtn")
      .off()
      .click(function () {
        if (validateFormEdit()) {
        const id_categoria = this.getAttribute('data-id-categoria');
        editarCategoria(id_categoria);
          resetFormEdit();
          $("#modalEditarCategoria").modal("hide");
          $(ventaRegistradaModal).modal("show");
        }
      });

    $("#cancelarEditarCategoriaBtn")
      .off()
      .click(function () {
        resetFormEdit();
        $("#modalEditarCategoria").modal("hide");
      });
  }

  const nombreServicio = /^[A-Za-z0-9ñÑ\s]{4,50}$/;
  const correoPattern = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;
  const dniPattern = /^[0-9]{8}$/;
  const celularPattern = /^9\d{8}$/;


    function validateForm() {
      let isValid = true;

      if (!nombreServicio.test($("#ventaNombre").val())) {
        isValid = false;
        $("#ventaNombreError").text("Por favor, ingresa un nombre valido.");
      } else {
        $("#ventaNombreError").text("");
      }

       if (!dniPattern.test($("#ventaDNI").val())) {
              isValid = false;
              $("#ventaDNIError").text("Por favor, ingresa un dni valido.");
            } else {
              $("#ventaDNIError").text("");
       }

    if (!correoPattern.test($("#ventaEmail").val())) {
                isValid = false;
                $("#ventaEmailError").text("Por favor, ingresa un email valido.");
              } else {
                $("#ventaEmailError").text("");
    }

    if (!celularPattern.test($("#ventaCelular").val())) {
                    isValid = false;
                    $("#ventaCelularError").text("Por favor, ingresa un celular valido.");
                  } else {
                    $("#ventaCelularError").text("");
    }

    if ($("#ventaTipoPago").val() === "Seleccionar tipo de pago") {
            isValid = false;
            $("#ventaTipoPagoError")
              .text("Por favor, seleccione un tipo de pago");
          } else {
            $("#ventaTipoPagoError").text("");
          }


      return isValid;
    }

      function resetForm() {
        $("#ventaNombre").val("");
        $("#ventaDNI").val("");
        $("#ventaEmail").val("");
        $("#ventaCelular").val("");
        $("#ventaTipoPago").val("Seleccionar tipo de pago");
        $("#ventaDescripcion").val("");

        $(".error-message").text("");
      }



