$(document).ready(function () {
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

    let imagenInput = $("#imagenServicio").val();
    if (imagenInput.trim() === "") {
      isValid = false;
      $("#imagenServicioError").text("Por favor, selecciona una imagen.");
    } else {
      $("#imagenServicioError").text("");
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

     let imagenInput = $("#imagenServicioEdit").val();
     if (imagenInput.trim() === "") {
       isValid2 = false;
       $("#imagenServicioEditError").text("Por favor, selecciona una imagen.");
     } else {
       $("#imagenServicioEditError").text("");
     }

    return isValid2;
  }

  function bindEventHandlers() {
    $("#guardarServicioBtn")
      .off()
      .click(function () {
        if (validateForm()) {
          resetForm();
          $("#modalAgregarServicio")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
          $(servicioRegistradoModal).modal("show");
        }
      });

    $("#confirmarCancelarGuardarServicioBtn")
      .off()
      .click(function () {
        $("#modalAgregarServicio")
          .find('[data-bs-dismiss="modal"]')
          .trigger("click");
        resetForm();
      });

    $("#guardarServicioEditBtn")
      .off()
      .click(function () {
        if (validateFormEdit()) {
          resetFormEdit();
          $("#modalEditarServicio")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
          $(servicioEditarExitoModal).modal("show");
        }
      });

    $("#cancelarEditarServicioBtn")
      .off()
      .click(function () {
        resetFormEdit();
        $("#modalEditarServicio")
          .find('[data-bs-dismiss="modal"]')
          .trigger("click");
      });
  }

  $("#imagenServicio").change(function () {
    let inputFile = this;
    if (inputFile.files && inputFile.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $("#imagenServicioPreview").html(
          '<img src="' +
            e.target.result +
            '" class="img-fluid" alt="Preview" />'
        );
      };
      reader.readAsDataURL(inputFile.files[0]);
    } else {
      $("#imagenServicioPreview").empty();
    }
  });

  $("#imagenServicioEdit").change(function () {
    let inputFile = this;
    if (inputFile.files && inputFile.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $("#imagenServicioEditPreview").html(
          '<img src="' +
            e.target.result +
            '" class="img-fluid" alt="Preview" />'
        );
      };
      reader.readAsDataURL(inputFile.files[0]);
    } else {
      $("#imagenServicioEditPreview").empty();
    }
  });

  function resetForm() {
    $("#servicioNombre").val("");
    $("#servicioDescripcion").val("");
    $("#imagenServicio").val("");
    $("#imagenServicioPreview").empty();
    

    $(".error-message").text("");
  }

  function resetFormEdit() {
    $("#editServicioNombre").val("");
    $("#editServicioDescripcion").val("");
    $("#imagenServicioEdit").val("");
    $("#imagenServicioEditPreview").empty();


    $(".error-message").text("");
  }

  $("#modalAgregarServicio").on("shown.bs.modal", function () {
    resetForm();
  });

  $("#modalEditarServicio").on("shown.bs.modal", function () {
    resetFormEdit();
  });

  bindEventHandlers();
});
