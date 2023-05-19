$(document).ready(function () {

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

  function bindEventHandlers() {
   
    $("#guardarProveedorBtn")
      .off()
      .click(function () {
        if (validateForm()) {
          resetForm();
          $("#modalAgregarProveedor")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
          $(proveedorRegistradoModal).modal("show");
        }
      });

    $("#confirmarCancelarGuardarProveedorBtn")
      .off()
      .click(function () {
        $("#modalAgregarProveedor")
          .find('[data-bs-dismiss="modal"]')
          .trigger("click");
        resetForm();
      });

    $("#guardarEditProveedorBtn")
      .off()
      .click(function () {
        if (validateFormEdit()) {
          resetFormEdit();
          $("#editarProveedorModal")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
          $(proveedorEditadoModal).modal("show");
        }
      });

    $("#cancelarEditarProveedorBtn")
      .off()
      .click(function () {
        resetFormEdit();
        $("#editarProveedorModal")
          .find('[data-bs-dismiss="modal"]')
          .trigger("click");
      });
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


  $("#modalAgregarProveedor").on("shown.bs.modal", function () {
    resetForm();
  });

  $("#editarProveedorModal").on("shown.bs.modal", function () {
    resetFormEdit();
  });

  bindEventHandlers();
});
