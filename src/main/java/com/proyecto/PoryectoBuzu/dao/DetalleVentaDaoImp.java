package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.DetalleVenta;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class DetalleVentaDaoImp implements DetalleVentaDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DetalleVenta> getdetallesVentas() {
        String query = "From DetalleVenta";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminarDetallesVenta(Long id) {
        DetalleVenta detalleVenta = entityManager.find(DetalleVenta.class, id);
        entityManager.remove(detalleVenta);

    }

    @Override
    public void registrarDetallesVenta(DetalleVenta detalleVenta) {
        entityManager.merge(detalleVenta);
    }


}
