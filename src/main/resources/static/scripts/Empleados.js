$(document).ready(function () {
cargarEmpleados();
  bindEventHandlers();
  cargarCategEmpleados();

});

async function registrarEmpleado(){
  const nombre = document.getElementById('nombreEmpleadoInput').value;
  const apellido = document.getElementById('apellidoEmpleadoInput').value;
  const dni = document.getElementById('dniEmpleadoInput').value;
  const correo = document.getElementById('correoEmpleadoInput').value;
  const celular = document.getElementById('celularEmpleadoInput').value;
  const categoria = document.getElementById('categoriaEmpleadoInput').value;
  const imagen = document.getElementById('imagenEmpleadoInput').files[0];

  const formData = new FormData();
  formData.append('empleadoImagen', imagen);
  formData.append('nombre', nombre);
  formData.append('apellido', apellido);
  formData.append('dni', dni);
  formData.append('correo', correo);
  formData.append('celular', celular);
  formData.append('categoria', categoria);

  const request = await fetch('api/empleados', {
    method: 'POST',
    body: formData
  });
cargarEmpleados();

}


async function editarEmpleado(id_empleado){
  const nombre = document.getElementById('nombreEditarEmpleado').value;
  const apellido = document.getElementById('apellidoEditarEmpleado').value;
  const dni = document.getElementById('dniEmpleadoEditar').value;
  const correo = document.getElementById('correoEmpleadoEditar').value;
  const celular = document.getElementById('celularEmpleadoEditar').value;
  const categoria = document.getElementById('categoriaEmpleadoEditar').value;
  const imagen = document.getElementById('imagenEmpleadoEditar').files[0];

  const formData = new FormData();
  formData.append('id', id_empleado);
  formData.append('empleadoImagen', imagen);
  formData.append('nombre', nombre);
  formData.append('apellido', apellido);
  formData.append('dni', dni);
  formData.append('correo', correo);
  formData.append('celular', celular);
  formData.append('categoria', categoria);

  const request = await fetch('api/empleados/' + id_empleado, {
    method: 'PUT',
    body: formData
  });
  cargarEmpleados();
}

async function cargarEmpleados(){

  const request = await fetch('api/empleados', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const empleados = await request.json();

let listadoEmpleadosHtml = '';
  for( let empleado of empleados){
  let empleadoHtml='<tr><td><div class=""><input class="form-check-input checkbox-empleado" type="checkbox" data-id-empleado="'
                    + empleado.id_empleado + '"></div></td><td>'
                    +empleado.id_empleado + '</td><td class="table-text-wrap">'
                    + empleado.nombre_empleado +'</td><td class="table-text-wrap">'
                    + empleado.apellidos_empleado +'</td><td class="table-text-wrap">'
                    + empleado.dni_empleado +'</td><td class="table-text-wrap">'
                    +empleado.email_empleado +'</td><td class="table-text-wrap">'
                    + empleado.celular_empleado +'</td><td class="table-text-wrap">'
                    + empleado.categoria_empleado +'</td><td><img class="imagen-media" src="/empleados/'
                    +empleado.img_empleado+'" alt=""></td><th><a class="edit" data-bs-toggle="modal" data-bs-target="#modalEditarEmpleado" data-id-empleado="'
                    + empleado.id_empleado + '"><i class="ri-edit-2-fill" data-toggle="tooltip" title="Editar"></i></a><a class="delete" data-bs-toggle="modal" data-bs-target="#eliminarEmpleadoModal" data-id-empleado="'
                    + empleado.id_empleado + '"><i class="ri-delete-bin-5-line" data-toggle="tooltip" title="Eliminar"></i></a></th></tr>"';
    listadoEmpleadosHtml += empleadoHtml;

  }

document.querySelector('#tabla-empleados tbody').outerHTML = listadoEmpleadosHtml;

// Evento click para capturar el id_empleado al eliminar
  const botonesEliminar = document.querySelectorAll('.delete');
  for (let boton of botonesEliminar) {
    boton.addEventListener('click', function() {
      const id_empleado = this.getAttribute('data-id-empleado');
      const botonEliminarEmpleado = document.querySelector('#btnEliminarEmpleado');
      botonEliminarEmpleado.setAttribute('data-id-empleado', id_empleado);
    });
  }
// Evento click para capturar el id_empleado al editar
  const botonesEditar = document.querySelectorAll('.edit');
    for (let boton of botonesEditar) {
      boton.addEventListener('click', function() {
        const id_empleado = this.getAttribute('data-id-empleado');
        const botonEditarEmpleado = document.querySelector('#btnGuardarEditarEmpleado');
        botonEditarEmpleado.setAttribute('data-id-empleado', id_empleado);
        obtenerDatosEmpleado(id_empleado);
      });
    }


}
// Evento click para validar modal eliminar empleados
document.getElementById('validarEliminarEmpleados').addEventListener('click', function() {
  const checkboxesSeleccionados = Array.from(document.querySelectorAll('.checkbox-empleado:checked'));
  const ids_empleados = checkboxesSeleccionados.map(function(checkbox) {
    return checkbox.getAttribute('data-id-empleado');
  });

  if (ids_empleados.length > 0) {
    $('#eliminarEmpleadosModal').modal("show");
  } else {
    $('#empleadosEliminadosVacio').modal("show");
  }
});


// Evento click para eliminar el empleado
document.getElementById('btnEliminarEmpleado').addEventListener('click', function() {
  const id_empleado = this.getAttribute('data-id-empleado');
  eliminarEmpleado(id_empleado);
});

// Evento click para eliminar  empleados
document.getElementById('btnEliminarEmpleados').addEventListener('click', function() {
    // Obtener los checkboxes de categorias seleccionados
    const checkboxesSeleccionados = Array.from(document.querySelectorAll('.checkbox-empleado:checked'));
    // Obtener los IDs de los categorias seleccionados
    const ids_empleados = checkboxesSeleccionados.map(function(checkbox) {
      return checkbox.getAttribute('data-id-empleado');
    });

    // Llamar a la función para eliminar los empleados seleccionados
    eliminarEmpleados(ids_empleados);
});



async function eliminarEmpleado(id_empleado) {
  // Lógica para eliminar el categoria con el id_categoria correspondiente

  const request = await fetch('api/empleados/' + id_empleado, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  cargarEmpleados();
}

async function eliminarEmpleados(ids_empleados) {
  // Lógica para eliminar los empleados con los IDs proporcionados
  for (let id_empleado of ids_empleados) {
    const request = await fetch('api/empleados/' + id_empleado, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    // Procesar la respuesta si es necesario
  }
  // Actualizar la tabla después de eliminar los empleados
  cargarEmpleados();

}

async function obtenerDatosEmpleado(id_empleado) {
  const request = await fetch('api/empleados/' + id_empleado, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
    const empleado = await request.json();
    // Asignar los datos del categoria a los campos del modal de editar
   asignarDatos(empleado);
}

function asignarDatos(empleado){
document.getElementById('nombreEditarEmpleado').value = empleado.nombre_empleado ;
document.getElementById('apellidoEditarEmpleado').value = empleado.apellidos_empleado ;
document.getElementById('dniEmpleadoEditar').value = empleado.dni_empleado ;
document.getElementById('correoEmpleadoEditar').value = empleado.email_empleado ;
document.getElementById('celularEmpleadoEditar').value = empleado.celular_empleado ;
document.getElementById('categoriaEmpleadoEditar').value = empleado.categoria_empleado ;

}




async function cargarCategEmpleados(){

const request = await fetch('api/categoriasEmpleados', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const categorias = await request.json();
let listadoCategoriasHtml = '';

  const selectCategoria1 = document.getElementById('categoriaEmpleadoInput');
  const selectCategoria2 = document.getElementById('categoriaEmpleadoEditar');


for (let categoria of categorias) {
  const opcionCategoria = document.createElement('option');
  opcionCategoria.text = categoria.nom_categ_emp;
  selectCategoria1.appendChild(opcionCategoria);
}

for (let categoria of categorias) {
  const opcionCategoria = document.createElement('option');
  opcionCategoria.text = categoria.nom_categ_emp;
  selectCategoria2.appendChild(opcionCategoria);
}


}



 let currentStep = 1;
  let totalSteps = $(".step").length;

  const nombrePattern = /^[A-Za-z\s]{10,50}$/;
  const apellidoPattern = /^[A-Za-z\s]{10,50}$/;
  const correoPattern = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;
  const dniPattern = /^[0-9]{8}$/;
  const celularPattern = /^9\d{8}$/;


  function validateForm(step) {
    let isValid = true;

    if (step === 1) {
      // Validar el formulario del paso 1
      if (!nombrePattern.test($("#nombreEmpleadoInput").val())) {
        isValid = false;
        $("#nombreEmpleadoInputError").text(
          "Por favor, ingresa un nombre valido."
        );
      } else {
        $("#nombreEmpleadoInputError").text("");
      }

      if (!apellidoPattern.test($("#apellidoEmpleadoInput").val())) {
        isValid = false;
        $("#apellidoEmpleadoInputError").text(
          "Por favor, ingresa un apellido válido."
        );
      } else {
        $("#apellidoEmpleadoInputError").text("");
      }

       if (!dniPattern.test($("#dniEmpleadoInput").val())) {
         isValid = false;
         $("#dniEmpleadoInputError").text(
           "Por favor, ingresa un apellido válido."
         );
       } else {
         $("#dniEmpleadoInputError").text("");
       }


    }
    if (step === 2) {
      // Validación para el segundo formulario

      if (!correoPattern.test($("#correoEmpleadoInput").val())) {
        isValid = false;
        $("#correoEmpleadoInputError").text(
          "Por favor, ingresa un nombre válido."
        );
      } else {
        $("#correoEmpleadoInputError").text("");
      }

       if (!celularPattern.test($("#celularEmpleadoInput").val())) {
         isValid = false;
         $("#ccelularEmpleadoInputError").text(
           "Por favor, ingresa un apellido válido."
         );
       } else {
         $("#ccelularEmpleadoInputError").text("");
       }

      if ($("#categoriaEmpleadoInput").val() === "Seleccionar categoría") {
        isValid = false;
        $("#categoriaEmpleadoInputError").text(
          "Por favor, selecciona una categoría."
        );
      } else {
        $("#categoriaEmpleadoInputError").text("");
      }

    }
    if (step === 3) {
      let imagenInput = $("#imagenEmpleadoInput").val();
      if (imagenInput.trim() === "") {
        isValid = false;
        $("#imagenEmpleadoInputError").text(
          "Por favor, selecciona una imagen."
        );
      } else {
        $("#imagenEmpleadoInputError").text("");
      }
    }

    if (step === 4 ) {
      if (!nombrePattern.test($("#nombreEditarEmpleado").val())) {
        isValid = false;
        $("#nombreEditarEmpleadoError").text(
          "Por favor, ingresa un nombre valido."
        );
      } else {
        $("#nombreEditarEmpleadoError").text("");
      }

      if (!apellidoPattern.test($("#apellidoEditarEmpleado").val())) {
        isValid = false;
        $("#apellidoEditarEmpleadoError").text(
          "Por favor, ingresa un apellido válido."
        );
      } else {
        $("#apellidoEditarEmpleadoError").text("");
      }

      if (!dniPattern.test($("#dniEmpleadoEditar").val())) {
        isValid = false;
        $("#dniEmpleadoEditarError").text(
          "Por favor, ingresa un apellido válido."
        );
      } else {
        $("#dniEmpleadoEditarError").text("");
      }

      if (!correoPattern.test($("#correoEmpleadoEditar").val())) {
        isValid = false;
        $("#correoEmpleadoEditarError").text(
          "Por favor, ingresa un nombre válido."
        );
      } else {
        $("#correoEmpleadoEditarError").text("");
      }

      if (!celularPattern.test($("#celularEmpleadoEditar").val())) {
        isValid = false;
        $("#celularEmpleadoEditarError").text(
          "Por favor, ingresa un apellido válido."
        );
      } else {
        $("#celularEmpleadoEditarError").text("");
      }

      if ($("#categoriaEmpleadoEditar").val() === "Seleccionar categoría") {
        isValid = false;
        $("#categoriaEmpleadoEditarError").text(
          "Por favor, selecciona una categoría."
        );
      } else {
        $("#categoriaEmpleadoEditarError").text("");
      }

      let imagenInput = $("#imagenEmpleadoEditar").val();
      if (imagenInput.trim() === "") {
        isValid = false;
        $("#imagenEmpleadoEditarError").text(
          "Por favor, selecciona una imagen."
        );
      } else {
        $("#imagenEmpleadoEditarError").text("");
      }
    }

    return isValid;
  }

  function bindEventHandlers() {
    $("#nextBtnEmpleado")
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
              $("#nextBtnEmpleado").hide();
              $("#guardarEmpleadoBtn").show();
            }

            $("#prevBtnEmpleado").show();
          }
        }
      });

    $("#prevBtnEmpleado")
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
            $("#prevBtnEmpleado").hide();
          }

          $("#nextBtnEmpleado").show();
          $("#guardarEmpleadoBtn").hide();
        }
      });

    $("#guardarEmpleadoBtn")
      .off()
      .click(function () {
        if (validateForm(currentStep)) {
        registrarEmpleado();
          resetModal();
          $("#modalAgregarEmpleado").modal("hide");
          $(agregarEmpleadoExito).modal("show");
        }
      });

    $("#confirmarCancelarGuardarEmpBtn")
      .off()
      .click(function () {
        $("#modalAgregarEmpleado").modal("hide");
        resetModal();
      });

    $("#btnGuardarEditarEmpleado")
      .off()
      .click(function () {
        if (validateForm(4)) {
         const id_empleado = this.getAttribute('data-id-empleado');
         editarEmpleado(id_empleado);
          resetFormEdit();
          $("#modalEditarEmpleado").modal("hide");
          $(empleadoEditadoModal).modal("show");
        }
      });

    $("#cancelarEditarEmpleadoBtn")
      .off()
      .click(function () {
        resetFormEdit();
        $("#modalEditarEmpleado").modal("hide");
      });
  }



  $("#imagenEmpleadoInput").change(function () {
    let inputFile = this;
    if (inputFile.files && inputFile.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $("#imagenEmpleadoPreview").html(
          '<img src="' +
            e.target.result +
            '" class="img-fluid" alt="Preview" />'
        );
      };
      reader.readAsDataURL(inputFile.files[0]);
    } else {
      $("#imagenEmpleadoPreview").empty();
    }
  });

  $("#imagenEmpleadoEditar").change(function () {
    let inputFile = this;
    if (inputFile.files && inputFile.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $("#imagenEmpleadoEditarPreview").html(
          '<img src="' +
            e.target.result +
            '" class="img-fluid" alt="Preview" />'
        );
      };
      reader.readAsDataURL(inputFile.files[0]);
    } else {
      $("#imagenEmpleadoEditarPreview").empty();
    }
  });

  function resetForm() {
    $("#dniEmpleadoInput").val("");
    $("#nombreEmpleadoInput").val("");
    $("#apellidoEmpleadoInput").val("");
    $("#correoEmpleadoInput").val("");
    $("#celularEmpleadoInput").val("");
    $("#categoriaEmpleadoInput").val("Seleccionar categoría");
    $("#imagenEmpleadoInput").val("");
    $("#imagenEmpleadoPreview").empty();

    $(".error-message").text("");
  }

  function resetFormEdit() {
    $("#dniEmpleadoEditar").val("");
    $("#nombreEmpleadoEditar").val("");
    $("#apellidoEmpleadoEditar").val("");
    $("#correoEmpleadoEditar").val("");
    $("#celularEmpleadoEditar").val("");
    $("#categoriaEmpleadoEditar").val("Seleccionar categoría");
    $("#imagenEmpleadoEditar").val("");
    $("#imagenEmpleadoEditarPreview").empty();

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
    $("#prevBtnEmpleado").hide();
    $("#nextBtnEmpleado").show();
    $("#guardarEmpleadoBtn").hide();
  }



