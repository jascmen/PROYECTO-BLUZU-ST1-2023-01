$(document).ready(function () {
  let currentStep = 1;
  let totalSteps = $(".step").length;

  const nombrePattern = /^[A-Za-z\s]{10,50}$/;
  const cantidadPattern = /^(?!0+$)\d{1,3}$/;
  const codigoSKUPattern = /^[0-9]{6}$/;
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

      if (!precioVentaPattern.test($("#precioVentaInput").val())) {
        isValid = false;
        $("#precioVentaInputError")
          .text("Por favor, ingresa un precio de venta válido.");
      } else {
        $("#precioVentaInputError").text("");
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

      let fechaInput = $("#fechaProductoAgregarInput").val();
      let fecha = new Date(fechaInput);

      if (isNaN(fecha.getTime())) {
        // El valor ingresado no es una fecha válida
        isValid = false;
        $("#fechaProductoAgregarInputError").text(
          "Por favor, ingresa una fecha válida."
        );
      } else {
        $("#fechaProductoAgregarInputError").text("");
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
        if (!codigoSKUPattern.test($("#codigoSKUEdit").val())) {
          isValid = false;
          $("#codigoSKUEditError").text("Por favor, ingresa un codigo valido.");
        } else {
          $("#codigoSKUEditError").text("");
        }

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

         if (!precioCompraPattern.test($("#precioCompraEdit").val())) {
           isValid = false;
           $("#precioCompraEditError").text(
             "Por favor, ingresa un precio de compra válido."
           );
         } else {
           $("#precioCompraEditError").text("");
         }

         if (!precioVentaPattern.test($("#precioVentaEdit").val())) {
           isValid = false;
           $("#precioVentaEditError").text(
             "Por favor, ingresa un precio de venta válido."
           );
         } else {
           $("#precioVentaEditError").text("");
         }

         if (!descuentoPattern.test($("#descuentoEdit").val())) {
           isValid = false;
           $("#descuentoEditError").text(
             "Por favor, ingresa un descuento válido entre 0 y 90."
           );
         } else {
           $("#descuentoEditError").text("");
         }

         if (
           !cantidadPattern.test($("#cantidadProductoEdit").val()) ||
           $("#cantidadProductoEdit").val() <= 0 ||
           $("#cantidadProductoEdit").val() >= 1000
         ) {
           isValid = false;
           $("#cantidadproductoEditError").text(
             "Por favor, ingresa una cantidad válida."
           );
         } else {
           $("#cantidadproductoEditError").text("");
         }

         let fechaInput = $("#fechaProductoEdit").val();
         let fecha = new Date(fechaInput);

         if (isNaN(fecha.getTime())) {
           // El valor ingresado no es una fecha válida
           isValid = false;
           $("#fechaProductoEditError").text(
             "Por favor, ingresa una fecha válida."
           );
         } else {
           $("#fechaProductoEditError").text("");
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
          resetModal();
          $("#agregarProductoModal")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
            $(agregarProductoExito).modal("show");
        }
      });

    $("#confirmarCancelarGuardarBtn")
      .off()
      .click(function () {
        resetModal();
        $("#agregarProductoModal")
          .find('[data-bs-dismiss="modal"]')
          .trigger("click");
      });
    
    
    $("#btnGuardarEditarProducto")
      .off()
      .click(function () {
        if (validateForm(4)) {
          resetFormEdit();
          $("#modalEditarProducto")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
          $(ModalEditExito).modal("show");
        }
    });

    $("#cancelarEditarDatosBtn").off().click(function () {
      resetFormEdit();
      $("#modalEditarProducto")
            .find('[data-bs-dismiss="modal"]')
            .trigger("click");
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



  $("#agregarProductoModal").on("shown.bs.modal", function () {
    resetModal();
    
  });

  $("#modalEditarProducto").on("shown.bs.modal", function () {
    resetFormEdit();
  });

 


  bindEventHandlers();
});
