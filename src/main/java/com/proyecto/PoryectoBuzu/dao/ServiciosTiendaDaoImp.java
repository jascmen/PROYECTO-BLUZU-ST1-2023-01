package com.proyecto.PoryectoBuzu.dao;


import com.proyecto.PoryectoBuzu.models.ServiciosTienda;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class ServiciosTiendaDaoImp implements ServiciosTiendaDao {


    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ServiciosTienda> getServiciosTienda() {
        String query = "From ServiciosTienda";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id_servicio) {
        ServiciosTienda serviciosTienda = entityManager.find(ServiciosTienda.class, id_servicio);
        entityManager.remove(serviciosTienda);
    }

    @Override
    public void registrarServicio(ServiciosTienda servicioTienda) {
        entityManager.merge(servicioTienda);
    }

    @Override
    public void editarServicio(Long id_servicio, ServiciosTienda servicioTienda) {

        ServiciosTienda servicioExistente = entityManager.find(ServiciosTienda.class, id_servicio );

        servicioExistente.setName_servicio(servicioTienda.getName_servicio());
        servicioExistente.setDescrip_servicio(servicioTienda.getDescrip_servicio());
        servicioExistente.setImg_servicio(servicioTienda.getImg_servicio());

        registrarServicio(servicioExistente);


    }

    @Override
    public ServiciosTienda obtenerDatosServicio(Long id_servicio) {
        ServiciosTienda servicioTienda = entityManager.find(ServiciosTienda.class, id_servicio);
        return servicioTienda;
    }
}
