package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Ventas;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class VentasDaoImpl implements VentasDao {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<Ventas> getVentas() {
        String query = "From Ventas";
        return entityManager.createQuery(query).getResultList();

    }

    @Override
    public void eliminarVenta(Long id) {
        Ventas venta = entityManager.find(Ventas.class, id);

        entityManager.remove(venta);

    }

    @Override
    public void registrarVenta(Ventas venta) {
        entityManager.merge(venta);

    }

    @Override
    public Ventas obtenerDatosVenta(Long id) {
        Ventas venta = entityManager.find(Ventas.class, id);
        return venta;

    }
}
