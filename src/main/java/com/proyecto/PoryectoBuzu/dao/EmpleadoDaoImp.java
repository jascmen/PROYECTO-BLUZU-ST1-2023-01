package com.proyecto.PoryectoBuzu.dao;


import com.proyecto.PoryectoBuzu.models.Empleado;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;

@Repository
@Transactional
public class EmpleadoDaoImp implements EmpleadoDao {

     @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<Empleado> getEmpleados() {
        String query = "From Empleado";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminarEmpleado(Long id_empleado) {
        Empleado empleado = entityManager.find(Empleado.class, id_empleado);

        String nombreImagen = empleado.getImg_empleado();

        String rutaAbsoluta = "C://Empleados//recursos";
        String rutaImagen = rutaAbsoluta + "//" + nombreImagen;
        File archivoImagen = new File(rutaImagen);
        archivoImagen.delete();

        entityManager.remove(empleado);
    }

    @Override
    public void registrarEmpleado(Empleado empleado) {
        entityManager.merge(empleado);

    }

    @Override
    public void editarEmpleado(Empleado empleado) {

        registrarEmpleado(empleado);
    }

    @Override
    public Empleado obtenerDatosEmpleados(Long id_empleado) {
        Empleado empleado = entityManager.find(Empleado.class, id_empleado);
        return empleado;
    }
}
