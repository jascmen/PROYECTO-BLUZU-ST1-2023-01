package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.models.Empleado;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class EmpleadoController {

    @RequestMapping(value = "empleado/{id}")
    public Empleado getEmpleado(@PathVariable Long id){
        Empleado empleado   = new Empleado();
        empleado.setId(id);
        empleado.setNombre("Jorge");
        empleado.setApellido("Sanchez");
        empleado.setDni(72671825);
        empleado.setEmail("jascmen@gmail");
        empleado.setCelular(941768950);
        empleado.setCategoria("estilista");
        return empleado;
    }

    @RequestMapping(value = "empleados")
    public List<Empleado> getEmpleado(){
        List<Empleado> empleados = new ArrayList<>();

        Empleado empleado   = new Empleado();
        empleado.setId(123L);
        empleado.setNombre("Jorge");
        empleado.setApellido("Sanchez");
        empleado.setDni(72671825);
        empleado.setEmail("jascmen@gmail");
        empleado.setCelular(941768950);
        empleado.setCategoria("estilista");

        Empleado empleado2   = new Empleado();
        empleado2.setId(765L);
        empleado2.setNombre("Juan");
        empleado2.setApellido("Pedro");
        empleado2.setDni(321312);
        empleado2.setEmail("papu@gmail");
        empleado2.setCelular(766876);
        empleado2.setCategoria("peluquero");

        Empleado empleado3   = new Empleado();
        empleado3.setId(678L);
        empleado3.setNombre("Maria");
        empleado3.setApellido("alejo");
        empleado3.setDni(56567);
        empleado3.setEmail("maria@gmail");
        empleado3.setCelular(123213);
        empleado3.setCategoria("estilista");

        empleados.add(empleado);
        empleados.add(empleado2);
        empleados.add(empleado3);
        return empleados;
    }

    @RequestMapping(value = "empleado12")
    public Empleado editar(){
        Empleado empleado   = new Empleado();
        empleado.setNombre("Jorge");
        empleado.setApellido("Sanchez");
        empleado.setDni(72671825);
        empleado.setEmail("jascmen@gmail");
        empleado.setCelular(941768950);
        empleado.setCategoria("estilista");
        return empleado;
    }

    @RequestMapping(value = "empleado133")
    public Empleado eliminar(){
        Empleado empleado   = new Empleado();
        empleado.setNombre("Jorge");
        empleado.setApellido("Sanchez");
        empleado.setDni(72671825);
        empleado.setEmail("jascmen@gmail");
        empleado.setCelular(941768950);
        empleado.setCategoria("estilista");
        return empleado;
    }

    @RequestMapping(value = "empleado21312")
    public Empleado buscar(){
        Empleado empleado   = new Empleado();
        empleado.setNombre("Jorge");
        empleado.setApellido("Sanchez");
        empleado.setDni(72671825);
        empleado.setEmail("jascmen@gmail");
        empleado.setCelular(941768950);
        empleado.setCategoria("estilista");
        return empleado;
    }
}
