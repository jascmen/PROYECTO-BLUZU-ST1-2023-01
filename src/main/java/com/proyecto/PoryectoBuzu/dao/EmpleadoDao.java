package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Empleado;

import java.util.List;

public interface EmpleadoDao {


    List<Empleado> getEmpleados();

    void eliminarEmpleado( Long id_empleado);

    void registrarEmpleado(Empleado empleado);

    void editarEmpleado( Long id_empleado, Empleado empleado);

    Empleado obtenerDatosEmpleados(Long id_empleado);
}
