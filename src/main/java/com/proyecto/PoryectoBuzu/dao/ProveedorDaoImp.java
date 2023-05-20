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
}
