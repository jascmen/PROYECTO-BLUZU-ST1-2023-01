$(document).ready(function(){
cargarUsuarios();

});

async function cargarUsuarios(){

  const request = await fetch('empleados', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const empleados = await request.json();

let listadoEmpleadosHtml = '';
  for( let empleado of empleados){
  let empleadoHtml='<tr><td><div class=""><input class="form-check-input" type="checkbox" value="" id="" name=""></div></td><td>1</td><td class="table-text-wrap">'
                    + empleado.nombre +'</td><td class="table-text-wrap">'
                    + empleado.apellido +'</td><td class="table-text-wrap">'
                    + empleado.dni +'</td><td class="table-text-wrap">'
                    +empleado.email +'</td><td class="table-text-wrap">'
                    + empleado.celular +'</td><td class="table-text-wrap">'
                    + empleado.categoria +'</td><td><img class="medium-image" src="images/perro1.jpg" alt=""></td><th><a class="edit" data-bs-toggle="modal" data-bs-target="#modalEditarEmpleado"><i class="ri-edit-2-fill" data-toggle="tooltip" title="Editar"></i></a><a class="delete" data-bs-toggle="modal" data-bs-target="#eliminarEmpleadoModal"><i class="ri-delete-bin-5-line" data-toggle="tooltip" title="Eliminar"></i></a></th></tr>"';
    listadoEmpleadosHtml += empleadoHtml;

  }

document.querySelector('#tabla-empleados tbody').outerHTML =listadoEmpleadosHtml;
}