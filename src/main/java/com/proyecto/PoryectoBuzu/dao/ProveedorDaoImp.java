package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Proveedor;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class ProveedorDaoImp implements ProveedorDao {

    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public List<Proveedor> getProveedores() {
        String query= "From Proveedor";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id_proveedor) {
        Proveedor proveedor = entityManager.find(Proveedor.class, id_proveedor);
        entityManager.remove(proveedor);
    }

    @Override
    public void registrarProveedor(Proveedor proveedor) {
        entityManager.merge(proveedor);
    }

    @Override
    public void editarProveedor(Long idProveedor, Proveedor proveedor) {

        // Obtener el proveedor existente de la base de datos usando el idProveedor

        Proveedor proveedorExistente = entityManager.find(Proveedor.class, idProveedor );

            // Actualizar los datos del proveedor existente con los valores del proveedor recibido

            proveedorExistente.setNombre_prov(proveedor.getNombre_prov());
            proveedorExistente.setDireccion_prov(proveedor.getDireccion_prov());
            proveedorExistente.setCelular_prov(proveedor.getCelular_prov());
            proveedorExistente.setCorreo_prov(proveedor.getCorreo_prov());
            registrarProveedor(proveedorExistente);
    }

    @Override
    public Proveedor obtenerDatosProveedor(Long idProveedor) {
        Proveedor proveedor = entityManager.find(Proveedor.class, idProveedor );
        return proveedor;
    }



}
