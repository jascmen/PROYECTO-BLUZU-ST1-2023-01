package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.EmpleadoDao;
import com.proyecto.PoryectoBuzu.models.Empleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
public class EmpleadoController {

    @Autowired
    private EmpleadoDao empleadodao;

    @RequestMapping(value = "api/empleados", method = RequestMethod.GET)
    public List<Empleado> getEmpleados(){
        return empleadodao.getEmpleados();
    }

    @RequestMapping(value = "api/empleados/{id_empleado}", method = RequestMethod.DELETE)
    public void eliminar( @PathVariable Long id_empleado){

        empleadodao.eliminarEmpleado(id_empleado);
    }


    @RequestMapping(value = "api/empleados", method = RequestMethod.POST)
    public void registrarEmpleado(@RequestParam("empleadoImagen") MultipartFile imagen,
                                  @RequestParam("nombre") String nombre,
                                  @RequestParam("apellido") String apellido,
                                  @RequestParam("dni") Integer dni,
                                  @RequestParam("correo") String correo,
                                  @RequestParam("celular") Integer celular,
                                  @RequestParam("categoria") String categoria) {

        if(!imagen.isEmpty()){



            String rutaAbsoluta = "images//Empleados//";
            String nuevoNombreImagen = apellido.replaceAll(" ","")+"-"+ dni.toString() + ".jpg";

            try {
                byte[] bytesImg = imagen.getBytes();
                Path rutacompleta = Paths.get(rutaAbsoluta + "//"+ nuevoNombreImagen);
                Files.write(rutacompleta, bytesImg);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

            // Crear un objeto Empleado con los demás datos del formulario
            Empleado empleado = new Empleado();
            empleado.setNombre_empleado(nombre);
            empleado.setApellidos_empleado(apellido);
            empleado.setDni_empleado(dni);
            empleado.setEmail_empleado(correo);
            empleado.setCelular_empleado(celular);
            empleado.setCategoria_empleado(categoria);
            empleado.setImg_empleado(nuevoNombreImagen);
            empleadodao.registrarEmpleado(empleado);

        }
    }

    @RequestMapping(value = "api/empleados/{id}", method = RequestMethod.PUT)
    public void editarEmpleado(@PathVariable("id") Long id,
                               @RequestParam(value = "empleadoImagen") MultipartFile imagen,
                               @RequestParam("nombre") String nombre,
                               @RequestParam("apellido") String apellido,
                               @RequestParam("dni") Integer dni,
                               @RequestParam("correo") String correo,
                               @RequestParam("celular") Integer celular,
                               @RequestParam("categoria") String categoria) {

        Empleado empleadoExistente = empleadodao.obtenerDatosEmpleados(id);

        String nombreImagen = empleadoExistente.getImg_empleado();

        String rutaExistente = "images//Empleados//";
        String rutaImagen = rutaExistente + "//" + nombreImagen;
        File archivoImagen = new File(rutaImagen);
        archivoImagen.delete();

        if (imagen != null && !imagen.isEmpty()) {
            // Procesar la nueva imagen solo si se proporciona una imagen válida
            String nuevoNombreImagen = apellido.replaceAll(" ", "") + "-" + dni.toString() + ".jpg";

            try {
                byte[] bytesImg = imagen.getBytes();
                Path rutacompleta = Paths.get(rutaExistente + "//" + nuevoNombreImagen);
                Files.write(rutacompleta, bytesImg);
                empleadoExistente.setImg_empleado(nuevoNombreImagen);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }


        // Actualizar los demás datos del empleado
        empleadoExistente.setNombre_empleado(nombre);
        empleadoExistente.setApellidos_empleado(apellido);
        empleadoExistente.setDni_empleado(dni);
        empleadoExistente.setEmail_empleado(correo);
        empleadoExistente.setCelular_empleado(celular);
        empleadoExistente.setCategoria_empleado(categoria);

        // Guardar los cambios en el empleado
        empleadodao.editarEmpleado(empleadoExistente);
    }


    @RequestMapping(value = "api/empleados/{id_empleado}", method = RequestMethod.GET)
    public  Empleado obtenerDatosEmpleados(@PathVariable Long id_empleado){
        return empleadodao.obtenerDatosEmpleados(id_empleado);
    }
}
