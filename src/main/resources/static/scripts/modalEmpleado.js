$(document).ready(function () {
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
          resetModal();
          $("#modalAgregarEmpleado")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
          $(agregarEmpleadoExito).modal("show");
        }
      });

    $("#confirmarCancelarGuardarEmpBtn")
      .off()
      .click(function () {
        $("#modalAgregarEmpleado")
          .find('[data-bs-dismiss="modal"]')
          .trigger("click");
        resetModal();
      });

    $("#btnGuardarEditarEmpleado")
      .off()
      .click(function () {
        if (validateForm(4)) {
          resetFormEdit();
          $("#modalEditarEmpleado")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
          $(empleadoEditadoModal).modal("show");
        }
      });

    $("#cancelarEditarEmpleadoBtn")
      .off()
      .click(function () {
        resetFormEdit();
        $("#modalEditarEmpleado")
          .find('[data-bs-dismiss="modal"]')
          .trigger("click");
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

  $("#modalAgregarEmpleado").on("shown.bs.modal", function () {
    resetModal();
  });

  $("#modalEditarEmpleado").on("shown.bs.modal", function () {
    resetFormEdit();
  });


  bindEventHandlers();
});
