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
  let proveedorHtml= '<tr><td><div class=""><input class="form-check-input" type="checkbox" value="" id="" name="" /></div></td><td>'
                      +proveedor.id_proveedor+'</td><td table-text-wrap>'
                      +proveedor.nombre_prov +'</td><td table-text-wrap>'
                      +proveedor.direccion_prov +'</td><td table-text-wrap>'
                      +proveedor.correo_prov +'</td><td table-text-wrap>'
                      +proveedor.celular_prov +'</td><th><a class="edit" data-bs-toggle="modal" data-bs-target="#editarProveedorModal"><i class="ri-pencil-line"></i></a><a class="delete" data-bs-toggle="modal" data-bs-target="#eliminarProveedorModal" data-id-proveedor="' + proveedor.id_proveedor + '"><i class="ri-delete-bin-line"></i></a></th></tr>';
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
}
// Evento click para eliminar el proveedor
document.getElementById('btnEliminarProveedor').addEventListener('click', function() {
  const id_proveedor = this.getAttribute('data-id-proveedor');
  eliminarProveedor(id_proveedor);
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

    location.reload()
}