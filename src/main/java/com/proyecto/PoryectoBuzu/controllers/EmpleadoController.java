package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.EmpleadoDao;
import com.proyecto.PoryectoBuzu.models.Empleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        public void registrarEmpleado(@RequestBody Empleado empleado  ){
        empleadodao.registrarEmpleado(empleado);
    }

    @RequestMapping(value = "api/empleados/{id_empleado}", method = RequestMethod.PUT)
    public void editarEmpleado(@PathVariable Long id_empleado, @RequestBody Empleado empleado){
        empleadodao.editarEmpleado(id_empleado, empleado);
    }

    @RequestMapping(value = "api/empleados/{id_empleado}", method = RequestMethod.GET)
    public  Empleado obtenerDatosEmpleados(@PathVariable Long id_empleado){
        return empleadodao.obtenerDatosEmpleados(id_empleado);
    }
}
