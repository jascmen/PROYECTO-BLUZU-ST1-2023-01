$(document).ready(function(){
cargarProveedores();
});

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
                      +proveedor.celular_prov +'</td><th><a class="edit" data-bs-toggle="modal" data-bs-target="#editarProveedorModal" data-id-proveedor="' + proveedor.id_proveedor + '"><i class="ri-pencil-line"></i></a><a class="delete" data-bs-toggle="modal" data-bs-target="#eliminarProveedorModal" data-id-proveedor="' + proveedor.id_proveedor + '"><i class="ri-delete-bin-line"></i></a></th></tr>';
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
