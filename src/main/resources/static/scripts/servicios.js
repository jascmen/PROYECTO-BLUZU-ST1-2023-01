$(document).ready(function () {

cargarServicios();
  bindEventHandlers();
});

async function cargarServicios(){

 const request = await fetch('api/servicios', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const servicios = await request.json();

let listadoServiciosHtml = '';
 for( let servicio of servicios){
    let servicioHtml = '<tr><td><div class=""><input class="form-check-input checkbox-servicio" type="checkbox" data-id-servicio="'
                       + servicio.id_servicio +'"/></div></td><td> '
                       + servicio.id_servicio + '</td><td class="table-text-wrap">'
                       + servicio.name_servicio + '</td><td class="descripcion-text-wrap">'
                       + servicio.descrip_servicio +'</td><td><img class="medium-image" src="" alt="" /></td><th><a class="edit" data-bs-toggle="modal" data-bs-target="#modalEditarServicio" data-id-servicio="'
                       + servicio.id_servicio +'"><i class="material-icons ri-edit-2-fill" data-toggle="tooltip" title="Editar"></i></a><a class="delete" data-bs-toggle="modal" data-bs-target="#eliminarServicioModal" data-id-servicio="'
                       + servicio.id_servicio +'"><i class="material-icons ri-delete-bin-5-line" data-toggle="tooltip" title="Eliminar"></i></a></th></tr>';

    listadoServiciosHtml += servicioHtml;
 }
document.querySelector('#tabla-servicios tbody').outerHTML= listadoServiciosHtml;

// Evento click para capturar el id_servicio para eliminar
  const botonesEliminar = document.querySelectorAll('.delete');
  for (let boton of botonesEliminar) {
    boton.addEventListener('click', function() {
      const id_servicio = this.getAttribute('data-id-servicio');
      const botonEliminarServicio = document.querySelector('#btnEliminarServicio');
      botonEliminarServicio.setAttribute('data-id-servicio', id_servicio);
    });
  }
// Evento click para capturar el id_servicio al editar
  const botonesEditar = document.querySelectorAll('.edit');
    for (let boton of botonesEditar) {
      boton.addEventListener('click', function() {
        const id_servicio = this.getAttribute('data-id-servicio');
        const botonEditarServicio = document.querySelector('#guardarServicioEditBtn');
        botonEditarServicio.setAttribute('data-id-servicio', id_servicio);
        obtenerDatosServicio(id_servicio);
      });
    }

}

// Evento click para eliminar el servicio
document.getElementById('btnEliminarServicio').addEventListener('click', function() {
  const id_servicio = this.getAttribute('data-id-servicio');
  eliminarServicio(id_servicio);
});

// Evento click para validar modal eliminar servicios
document.getElementById('btnValidarServiciosEliminar').addEventListener('click', function() {
  const checkboxesSeleccionados = Array.from(document.querySelectorAll('.checkbox-servicio:checked'));
  const ids_servicios = checkboxesSeleccionados.map(function(checkbox) {
    return checkbox.getAttribute('data-id-servicio');
  });

  if (ids_servicios.length > 0) {
    $('#eliminarServiciosModal').modal("show");
  } else {
    $('#serviciosEliminadosVacio').modal("show");
  }
});

// Evento click para eliminar  servicios
document.getElementById('btnEliminarServicios').addEventListener('click', function() {
    // Obtener los checkboxes de servicios seleccionados
    const checkboxesSeleccionados = Array.from(document.querySelectorAll('.checkbox-servicio:checked'));
    // Obtener los IDs de los servicios seleccionados
    const ids_servicios = checkboxesSeleccionados.map(function(checkbox) {
      return checkbox.getAttribute('data-id-servicio');
    });

    // Llamar a la función para eliminar los servicios seleccionados
    eliminarServicios(ids_servicios);
});



async function registrarServicio(){

  let datos ={};

  datos.name_servicio = document.getElementById('servicioNombre').value;
  datos.descrip_servicio = document.getElementById('servicioDescripcion').value;

  const request = await fetch('api/servicios', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
    const responseText = await request.text();
    const servicios = responseText ? JSON.parse(responseText) : null;
    cargarServicios();

}

async function eliminarServicio(id_servicio) {
  // Lógica para eliminar el servicio con el id_servicio correspondiente

  const request = await fetch('api/servicios/' + id_servicio, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  cargarServicios();

}

async function eliminarServicios(ids_servicios) {
  // Lógica para eliminar los servicios con los IDs proporcionados
  for (let id_servicio of ids_servicios) {
    const request = await fetch('api/servicios/' + id_servicio, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    // Procesar la respuesta si es necesario
  }
  // Actualizar la tabla después de eliminar los servicios
  cargarServicios();

}

async function obtenerDatosServicio(id_servicio) {
  const request = await fetch('api/servicios/' + id_servicio, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
    const servicio = await request.json();
    // Asignar los datos del servicio a los campos del modal de editar
    asignarDatosServicioModal(servicio);

}

function asignarDatosServicioModal(servicio) {
  document.getElementById('editServicioNombre').value = servicio.name_servicio;
  document.getElementById('editServicioDescripcion').value = servicio.descrip_servicio;
}

async function editarServicio(id_servicio) {


  let datos ={};

  datos.name_servicio = document.getElementById('editServicioNombre').value;
  datos.descrip_servicio = document.getElementById('editServicioDescripcion').value;

  const request = await fetch('api/servicios/' + id_servicio,  {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const responseText = await request.text();
    const servicios = responseText ? JSON.parse(responseText) : null;
    cargarServicios();
}


  const nombreServicio = /^[A-Za-z\s]{4,50}$/;

  function validateForm() {
    let isValid = true;

    if (!nombreServicio.test($("#servicioNombre").val())) {
      isValid = false;
      $("#servicioNombreError").text("Por favor, ingresa un nombre valido.");
    } else {
      $("#servicioNombreError").text("");
    }

    if ($("#servicioDescripcion").val().trim() === "") {
      isValid = false;
      $("#servicioDescripcionError").text(
        "Por favor, ingresa la descripción del producto."
      );
    } else {
      $("#servicioDescripcionError").text("");
    }



    return isValid;
  }

  function validateFormEdit() {
    let isValid2 = true;

     if (!nombreServicio.test($("#editServicioNombre").val())) {
       isValid2 = false;
       $("#editServicioNombreError").text(
         "Por favor, ingresa un nombre valido."
       );
     } else {
       $("#editServicioNombreError").text("");
     }

     if ($("#editServicioDescripcion").val().trim() === "") {
       isValid2 = false;
       $("#editServicioDescripcionError").text(
         "Por favor, ingresa la descripción del producto."
       );
     } else {
       $("#editServicioDescripcionError").text("");
     }



    return isValid2;
  }

  function bindEventHandlers() {
    $("#guardarServicioBtn")
      .off()
      .click(function () {
        if (validateForm()) {
        registrarServicio();
          resetForm();
          $("#modalAgregarServicio").modal("hide");
          $(servicioRegistradoModal).modal("show");
        }
      });

    $("#confirmarCancelarGuardarServicioBtn")
      .off()
      .click(function () {
        $("#modalAgregarServicio").modal("hide");
        resetForm();
      });

    $("#guardarServicioEditBtn")
      .off()
      .click(function () {
        if (validateFormEdit()) {
          const id_servicio = this.getAttribute('data-id-servicio');
          editarServicio(id_servicio);
          resetFormEdit();
          $("#modalEditarServicio").modal("hide");
          $(servicioEditarExitoModal).modal("show");
        }
      });

    $("#cancelarEditarServicioBtn")
      .off()
      .click(function () {
        resetFormEdit();
        $("#modalEditarServicio").modal("hide");
      });
  }



  function resetForm() {
    $("#servicioNombre").val("");
    $("#servicioDescripcion").val("");

    $(".error-message").text("");
  }

  function resetFormEdit() {
    $("#editServicioNombre").val("");
    $("#editServicioDescripcion").val("");


    $(".error-message").text("");
  }

