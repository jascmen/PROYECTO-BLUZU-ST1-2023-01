$(document).ready(function () {
  const nombreCategoria = /^[A-Za-z\s]{4,50}$/;

  function validateForm() {
    let isValid = true;

    if (!nombreCategoria.test($("#categoriaNombre").val())) {
      isValid = false;
      $("#categoriaNombreError").text("Por favor, ingresa un nombre valido.");
    } else {
      $("#categoriaNombreError").text("");
    }

    if ($("#categoriaDescripcion").val().trim() === "") {
      isValid = false;
      $("#categoriaDescripcionError").text(
        "Por favor, ingresa la descripción del producto."
      );
    } else {
      $("#categoriaDescripcionError").text("");
    }

    let imagenInput = $("#imagenCategoria").val();
    if (imagenInput.trim() === "") {
      isValid = false;
      $("#imagenCategoriaError").text("Por favor, selecciona una imagen.");
    } else {
      $("#imagenCategoriaError").text("");
    }

    return isValid;
  }

  function validateFormEdit() {
    let isValid2 = true;

    if (!nombreCategoria.test($("#editCategoriaNombre").val())) {
      isValid2 = false;
      $("#editCategoriaNombreError").text(
        "Por favor, ingresa un nombre valido."
      );
    } else {
      $("#editCategoriaNombreError").text("");
    }

    if ($("#editCategoriaDescripcion").val().trim() === "") {
      isValid2 = false;
      $("#editCategoriaDescripcionError").text(
        "Por favor, ingresa la descripción del producto."
      );
    } else {
      $("#editCategoriaDescripcionError").text("");
    }

    let imagenInput = $("#imagenCategoriaEdit").val();
    if (imagenInput.trim() === "") {
      isValid2 = false;
      $("#imagenCategoriaEditError").text("Por favor, selecciona una imagen.");
    } else {
      $("#imagenCategoriaEditError").text("");
    }

    return isValid2;
  }

  function bindEventHandlers() {
    $("#guardarCategoriaBtn")
      .off()
      .click(function () {
        if (validateForm()) {
          resetForm();
          $("#modalCategoria")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
          $(categoriaRegistradaModal).modal("show");
        }
      });

    $("#confirmarCancelarGuardarCategoriaBtn")
      .off()
      .click(function () {
        $("#modalCategoria").find('[data-bs-dismiss="modal"]').trigger("click");
        resetForm();
      });

    $("#guardarEditCategoriaBtn")
      .off()
      .click(function () {
        if (validateFormEdit()) {
          resetFormEdit();
          $("#modalEditarCategoria")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
          $(categoriaEditExitoModal).modal("show");
        }
      });

    $("#cancelarEditarCategoriaBtn")
      .off()
      .click(function () {
        resetFormEdit();
        $("#modalEditarCategoria")
          .find('[data-bs-dismiss="modal"]')
          .trigger("click");
      });
  }

  $("#imagenCategoria").change(function () {
    let inputFile = this;
    if (inputFile.files && inputFile.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $("#imagenCategoriaPreview").html(
          '<img src="' +
            e.target.result +
            '" class="img-fluid" alt="Preview" />'
        );
      };
      reader.readAsDataURL(inputFile.files[0]);
    } else {
      $("#imagenCategoriaPreview").empty();
    }
  });

  $("#imagenCategoriaEdit").change(function () {
    let inputFile = this;
    if (inputFile.files && inputFile.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $("#imagenCategoriaEditPreview").html(
          '<img src="' +
            e.target.result +
            '" class="img-fluid" alt="Preview" />'
        );
      };
      reader.readAsDataURL(inputFile.files[0]);
    } else {
      $("#imagenCategoriaEditPreview").empty();
    }
  });

  function resetForm() {
    $("#categoriaNombre").val("");
    $("#categoriaDescripcion").val("");
    $("#imagenCategoria").val("");
    $("#imagenCategoriaPreview").empty();

    $(".error-message").text("");
  }

  function resetFormEdit() {
    $("#editCategoriaNombre").val("");
    $("#editCategoriaDescripcion").val("");
    $("#imagenCategoriaEdit").val("");
    $("#imagenCategoriaEditPreview").empty();

    $(".error-message").text("");
  }

  $("#modalCategoria").on("shown.bs.modal", function () {
    resetForm();
  });

  $("#modalEditarCategoria").on("shown.bs.modal", function () {
    resetFormEdit();
  });

  bindEventHandlers();
});
