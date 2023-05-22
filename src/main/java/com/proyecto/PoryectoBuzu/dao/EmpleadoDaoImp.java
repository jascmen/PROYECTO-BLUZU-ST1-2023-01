package com.proyecto.PoryectoBuzu.dao;


import com.proyecto.PoryectoBuzu.models.Empleado;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class EmpleadoDaoImp implements EmpleadoDao {

     @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<Empleado> getEmpleados() {
        String query = "From Empleados";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminarEmpleado(Long id_empleado) {
        Empleado empleado = entityManager.find(Empleado.class, id_empleado);
        entityManager.remove(empleado);
    }

    @Override
    public void registrarEmpleado(Empleado empleado) {
        entityManager.merge(empleado);

    }

    @Override
    public void editarEmpleado(Long id_empleado, Empleado empleado) {

        Empleado empleadoExistente = entityManager.find(Empleado.class, id_empleado);

        empleadoExistente.setNombre_empleado(empleado.getNombre_empleado());
        empleadoExistente.setApellidos_empleado(empleado.getApellidos_empleado());
        empleadoExistente.setDni_empleado(empleado.getDni_empleado());
        empleadoExistente.setEmail_empleado(empleado.getEmail_empleado());
        empleadoExistente.setCelular_empleado(empleado.getCelular_empleado());
        empleadoExistente.setImg_empleado(empleado.getImg_empleado());
        empleadoExistente.setCategoria_empleado(empleado.getCategoria_empleado());

        registrarEmpleado(empleadoExistente);
    }

    @Override
    public Empleado obtenerDatosEmpleados(Long id_empleado) {
        Empleado empleado = entityManager.find(Empleado.class, id_empleado);
        return empleado;
    }
}
