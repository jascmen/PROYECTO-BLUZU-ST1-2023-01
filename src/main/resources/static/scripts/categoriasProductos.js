$(document).ready(function(){
cargarCategProduct();

bindEventHandlers();

});


  function bindEventHandlers() {
    $("#guardarCategoriaBtn")
      .off()
      .click(function () {
        if (validateForm()) {
        registrarCategProduct();
          resetForm();
          $("#modalCategoria").modal("hide");
          $(categoriaRegistradaModal).modal("show");
        }
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
          $(categoriaEditExitoModal).modal("show");
        }
      });

    $("#cancelarEditarCategoriaBtn")
      .off()
      .click(function () {
        resetFormEdit();
        $("#modalEditarCategoria").modal("hide");
      });
  }

async function registrarCategProduct(){

 let datos ={};

  datos.name_categ_prod = document.getElementById('categoriaNombre').value;
  datos.descrip_categ_pro = document.getElementById('categoriaDescripcion').value;

  const request = await fetch('api/categorias', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
    const responseText = await request.text();
    const categorias = responseText ? JSON.parse(responseText) : null;

 cargarCategProduct();
}

async function cargarCategProduct(){

const request = await fetch('api/categorias', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const categorias = await request.json();
let listadoCategoriasHtml = '';

  for( let categoria of categorias){

  let categoriaHtml = '<tr><td><div class=""><input class="form-check-input checkbox-categoria" type="checkbox" data-id-categoria="'
                              + categoria.id_categ_prod +'"</div></td><td>'
                              + categoria.id_categ_prod +'</td><td class="table-text-wrap">'+categoria.name_categ_prod+'</td><td class="descripcion-text-wrap">'
                              + categoria.descrip_categ_pro +'</td><th><a class="edit" data-bs-toggle="modal" data-bs-target="#modalEditarCategoria" data-id-categoria="'
                              + categoria.id_categ_prod +'"><i class="material-icons ri-edit-2-fill" data-toggle="tooltip" title="Editar"></i></a><a class="delete" data-bs-toggle="modal" data-bs-target="#eliminarCategoriaModal" data-id-categoria="'
                              + categoria.id_categ_prod +'"><i class="material-icons ri-delete-bin-5-line" data-toggle="tooltip" title="Eliminar"></i></a></th></tr>';
 listadoCategoriasHtml += categoriaHtml;
  }


document.querySelector('#tabla-categorias tbody').outerHTML= listadoCategoriasHtml;

// Evento click para capturar el id_categoria al eliminar
  const botonesEliminar = document.querySelectorAll('.delete');
  for (let boton of botonesEliminar) {
    boton.addEventListener('click', function() {
      const id_categoria = this.getAttribute('data-id-categoria');
      const botonEliminarCategoria = document.querySelector('#btnEliminarCategoria');
      botonEliminarCategoria.setAttribute('data-id-categoria', id_categoria);
    });
  }
// Evento click para capturar el id_categoria al editar
  const botonesEditar = document.querySelectorAll('.edit');
    for (let boton of botonesEditar) {
      boton.addEventListener('click', function() {
        const id_categoria = this.getAttribute('data-id-categoria');
        const botonEditarCategoria = document.querySelector('#guardarEditCategoriaBtn');
        botonEditarCategoria.setAttribute('data-id-categoria', id_categoria);
        obtenerDatosCategoria(id_categoria);
      });
    }

}

// Evento click para eliminar categoria
document.getElementById('btnEliminarCategoria').addEventListener('click', function() {
  const id_categoria = this.getAttribute('data-id-categoria');
  eliminarCategoria(id_categoria);
});

// Evento click para validar modal eliminar categorias
document.getElementById('btnValidarCategoriasEliminar').addEventListener('click', function() {
  const checkboxesSeleccionados = Array.from(document.querySelectorAll('.checkbox-categoria:checked'));
  const ids_categorias = checkboxesSeleccionados.map(function(checkbox) {
    return checkbox.getAttribute('data-id-categoria');
  });

  if (ids_categorias.length > 0) {
    $('#eliminarCategoriasModal').modal("show");
  } else {
    $('#categoriasEliminadasVacio').modal("show");
  }
});

// Evento click para eliminar  categorias
document.getElementById('btnEliminarCategorias').addEventListener('click', function() {
    // Obtener los checkboxes de categorias seleccionados
    const checkboxesSeleccionados = Array.from(document.querySelectorAll('.checkbox-categoria:checked'));
    // Obtener los IDs de los categorias seleccionados
    const ids_categorias = checkboxesSeleccionados.map(function(checkbox) {
      return checkbox.getAttribute('data-id-categoria');
    });

    // Llamar a la función para eliminar los categorias seleccionados
    eliminarCategorias(ids_categorias);
});

async function eliminarCategoria(id_categoria) {
  // Lógica para eliminar el categoria con el id_categoria correspondiente

  const request = await fetch('api/categorias/' + id_categoria, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  cargarCategProduct();

}
async function eliminarCategorias(ids_categorias) {
  // Lógica para eliminar los categorias con los IDs proporcionados
  for (let id_categoria of ids_categorias) {
    const request = await fetch('api/categorias/' + id_categoria, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    // Procesar la respuesta si es necesario
  }
  // Actualizar la tabla después de eliminar los categorias
  cargarCategProduct();

}

async function obtenerDatosCategoria(id_categoria) {
  const request = await fetch('api/categorias/' + id_categoria, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
    const categoria = await request.json();
    // Asignar los datos del categoria a los campos del modal de editar
    asignarDatosCategoriaModal(categoria);
}

function asignarDatosCategoriaModal(categoria) {
  document.getElementById('editCategoriaNombre').value = categoria.name_categ_prod;
  document.getElementById('editCategoriaDescripcion').value = categoria.descrip_categ_pro;
}


async function editarCategoria(id_categoria) {


  let datos ={};

  datos.name_categ_prod = document.getElementById('editCategoriaNombre').value;
  datos.descrip_categ_pro = document.getElementById('editCategoriaDescripcion').value;

  const request = await fetch('api/categorias/' + id_categoria,  {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const responseText = await request.text();
    const categorias = responseText ? JSON.parse(responseText) : null;

    cargarCategProduct();
}



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

    return isValid2;
  }




  function resetForm() {
    $("#categoriaNombre").val("");
    $("#categoriaDescripcion").val("");

    $(".error-message").text("");
  }

  function resetFormEdit() {
    $("#editCategoriaNombre").val("");
    $("#editCategoriaDescripcion").val("");

    $(".error-message").text("");
  }

  //$("#modalCategoria").on("shown.bs.modal", function () {
    //cargarCategProduct();
  //});

  //$("#modalEditarCategoria").on("shown.bs.modal", function () {
    //cargarCategProduct();
  //});

