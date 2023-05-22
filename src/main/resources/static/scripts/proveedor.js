$(document).ready(function(){
cargarProveedores();
 bindEventHandlers();

});
function bindEventHandlers() {

    $("#guardarProveedorBtn")
      .off()
      .click(function () {
        if (validateForm()) {
          registrarProveedor();
          resetForm();
          $("#modalAgregarProveedor").modal("hide");
          $(proveedorRegistradoModal).modal("show");

        }
      });

    $("#confirmarCancelarGuardarProveedorBtn")
      .off()
      .click(function () {
        $("#modalAgregarProveedor").modal("hide");
        resetForm();
      });

    $("#guardarEditProveedorBtn")
      .off()
      .click(function () {
        if (validateFormEdit()) {
          const id_proveedor = this.getAttribute('data-id-proveedor');
          editarProveedor(id_proveedor);
          resetFormEdit();
          $("#editarProveedorModal").modal("hide");
          $(proveedorEditadoModal).modal("show");
        }
      });

    $("#cancelarEditarProveedorBtn")
      .off()
      .click(function () {
        resetFormEdit();
        $("#editarProveedorModal").modal("hide");
      });
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

let listadoProveedoresHtml = '';
  for( let proveedor of proveedores){
  let proveedorHtml= '<tr><td><div class=""><input class="form-check-input checkbox-proveedor" type="checkbox" data-id-proveedor="' + proveedor.id_proveedor + '" /></div></td><td>'
                      +proveedor.id_proveedor+'</td><td table-text-wrap>'
                      +proveedor.nombre_prov +'</td><td table-text-wrap>'
                      +proveedor.direccion_prov +'</td><td table-text-wrap>'
                      +proveedor.correo_prov +'</td><td table-text-wrap>'
                      +proveedor.celular_prov +'</td><th><a class="edit" data-bs-toggle="modal" data-bs-target="#editarProveedorModal" data-id-proveedor="'
                      + proveedor.id_proveedor + '"><i class="ri-pencil-line"></i></a><a class="delete" data-bs-toggle="modal" data-bs-target="#eliminarProveedorModal" data-id-proveedor="'
                      + proveedor.id_proveedor + '"><i class="ri-delete-bin-line"></i></a></th></tr>';
    listadoProveedoresHtml += proveedorHtml;

  }
document.querySelector('#tabla-proveedores tbody').outerHTML= listadoProveedoresHtml;

// Evento click para capturar el id_proveedor al eliminar
  const botonesEliminar = document.querySelectorAll('.delete');
  for (let boton of botonesEliminar) {
    boton.addEventListener('click', function() {
      const id_proveedor = this.getAttribute('data-id-proveedor');
      const botonEliminarProveedor = document.querySelector('#btnEliminarProveedor');
      botonEliminarProveedor.setAttribute('data-id-proveedor', id_proveedor);
    });
  }
// Evento click para capturar el id_proveedor al editar
  const botonesEditar = document.querySelectorAll('.edit');
    for (let boton of botonesEditar) {
      boton.addEventListener('click', function() {
        const id_proveedor = this.getAttribute('data-id-proveedor');
        const botonEditarProveedor = document.querySelector('#guardarEditProveedorBtn');
        botonEditarProveedor.setAttribute('data-id-proveedor', id_proveedor);
        obtenerDatosProveedor(id_proveedor);
      });
    }

}

// Evento click para eliminar el proveedor
document.getElementById('btnEliminarProveedor').addEventListener('click', function() {
  const id_proveedor = this.getAttribute('data-id-proveedor');
  eliminarProveedor(id_proveedor);
});

// Evento click para validar modal eliminar proveedores
document.getElementById('btnValidarModalEliminar').addEventListener('click', function() {
  const checkboxesSeleccionados = Array.from(document.querySelectorAll('.checkbox-proveedor:checked'));
  const ids_proveedores = checkboxesSeleccionados.map(function(checkbox) {
    return checkbox.getAttribute('data-id-proveedor');
  });

  if (ids_proveedores.length > 0) {
    $('#eliminarProveedoresModal').modal("show");
  } else {
    $('#proveedoresEliminadosVacio').modal("show");
  }
});

// Evento click para eliminar  proveedores
document.getElementById('btnEliminarProveedores').addEventListener('click', function() {
    // Obtener los checkboxes de proveedor seleccionados
    const checkboxesSeleccionados = Array.from(document.querySelectorAll('.checkbox-proveedor:checked'));
    // Obtener los IDs de los proveedores seleccionados
    const ids_proveedores = checkboxesSeleccionados.map(function(checkbox) {
      return checkbox.getAttribute('data-id-proveedor');
    });

    // Llamar a la función para eliminar los proveedores seleccionados
    eliminarProveedores(ids_proveedores);
});



async function eliminarProveedor(id_proveedor) {
  // Lógica para eliminar el proveedor con el id_proveedor correspondiente

  const request = await fetch('api/proveedores/' + id_proveedor, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  cargarProveedores();

}

async function eliminarProveedores(ids_proveedores) {
  // Lógica para eliminar los proveedores con los IDs proporcionados
  for (let id_proveedor of ids_proveedores) {
    const request = await fetch('api/proveedores/' + id_proveedor, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    // Procesar la respuesta si es necesario
  }
  // Actualizar la tabla después de eliminar los proveedores
  cargarProveedores();

}

async function obtenerDatosProveedor(id_proveedor) {
  const request = await fetch('api/proveedores/' + id_proveedor, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
    const proveedor = await request.json();
    // Asignar los datos del proveedor a los campos del modal de editar
    asignarDatosProveedorModal(proveedor);

}

function asignarDatosProveedorModal(proveedor) {
  document.getElementById('nombreProveedorEdit').value = proveedor.nombre_prov;
  document.getElementById('correoProveedorEdit').value = proveedor.correo_prov;
  document.getElementById('celularProveedorEdit').value = proveedor.celular_prov;
  document.getElementById('direccionProveedorEdit').value = proveedor.direccion_prov;
}

 const nombreProveedor = /^[A-Za-z\s]{10,50}$/;
  const direccionProveedor = /^([A-Za-z0-9\s\-\#\.\,]+)$/;
  const correoProveedor = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;
  const celularProveedor = /^9\d{8}$/;

  function validateForm() {
    let isValid = true;

      // Validar el formulario del paso 1
      if (!nombreProveedor.test($("#nombreProveedor").val())) {
        isValid = false;
        $("#nombreProveedorError").text(
          "Por favor, ingresa un nombre valido."
        );
      } else {
        $("#nombreProveedorError").text("");
      }

      if (!direccionProveedor.test($("#direccionProveedor").val())) {
        isValid = false;
        $("#direccionProveedorError").text(
          "Por favor, ingresa una direccioon válido."
        );
      } else {
        $("#direccionProveedorError").text("");
      }

      if (!correoProveedor.test($("#correoProveedor").val())) {
        isValid = false;
        $("#correoProveedorError").text(
          "Por favor, ingresa un correo válido."
        );
      } else {
        $("#correoProveedorError").text("");
      }

       if (!celularProveedor.test($("#celularProveedor").val())) {
        isValid = false;
        $("#celularProveedorError").text(
          "Por favor, ingresa un celular válido."
        );
      } else {
        $("#celularProveedorError").text("");
      }

    return isValid;
  }

   function validateFormEdit() {
     let isValid2 = true;

     // Validar el formulario del paso 1
     if (!nombreProveedor.test($("#nombreProveedorEdit").val())) {
       isValid2 = false;
       $("#nombreProveedorEditError").text(
         "Por favor, ingresa un nombre valido."
       );
     } else {
       $("#nombreProveedorEditError").text("");
     }

     if (!direccionProveedor.test($("#direccionProveedorEdit").val())) {
       isValid2 = false;
       $("#direccionProveedorEditError").text(
         "Por favor, ingresa una direccioon válido."
       );
     } else {
       $("#direccionProveedorEditError").text("");
     }

     if (!correoProveedor.test($("#correoProveedorEdit").val())) {
       isValid2 = false;
       $("#correoProveedorEditError").text(
         "Por favor, ingresa un correo válido."
       );
     } else {
       $("#correoProveedorEditError").text("");
     }

     if (!celularProveedor.test($("#celularProveedorEdit").val())) {
       isValid2 = false;
       $("#celularProveedorEditError").text(
         "Por favor, ingresa un celular válido."
       );
     } else {
       $("#celularProveedorEditError").text("");
     }

     return isValid2;
   }


  function resetForm() {
    $("#nombreProveedor").val("");
    $("#direccionProveedor").val("");
    $("#correoProveedor").val("");
    $("#celularProveedor").val("");

    $(".error-message").text("");
  }

  function resetFormEdit() {
    $("#nombreProveedorEdit").val("");
    $("#direccionProveedorEdit").val("");
    $("#correoProveedorEdit").val("");
    $("#celularProveedorEdit").val("");

    $(".error-message").text("");
  }



async function registrarProveedor(){

  let datos ={};

  datos.nombre_prov = document.getElementById('nombreProveedor').value;
  datos.celular_prov = document.getElementById('celularProveedor').value;
  datos.correo_prov = document.getElementById('correoProveedor').value;
  datos.direccion_prov = document.getElementById('direccionProveedor').value;

  const request = await fetch('api/proveedores', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
    const responseText = await request.text();
    const proveedores = responseText ? JSON.parse(responseText) : null;
    cargarProveedores();

}



async function editarProveedor(id_proveedor) {


  let datos ={};

  datos.nombre_prov = document.getElementById('nombreProveedorEdit').value;
  datos.celular_prov = document.getElementById('celularProveedorEdit').value;
  datos.correo_prov = document.getElementById('correoProveedorEdit').value;
  datos.direccion_prov = document.getElementById('direccionProveedorEdit').value;

  const request = await fetch('api/proveedores/' + id_proveedor,  {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  //const proveedores = await request.json();
  const responseText = await request.text();
    const proveedores = responseText ? JSON.parse(responseText) : null;
    cargarProveedores();
}

