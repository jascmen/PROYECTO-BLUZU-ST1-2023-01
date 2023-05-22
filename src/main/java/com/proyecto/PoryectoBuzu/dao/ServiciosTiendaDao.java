package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.ServiciosTienda;

import java.util.List;

public interface ServiciosTiendaDao {

    List<ServiciosTienda> getServiciosTienda();

    void eliminar(Long id);

    void registrarServicio(ServiciosTienda servicioTienda);

    void editarServicio(Long id, ServiciosTienda servicioTienda);

    ServiciosTienda obtenerDatosServicio (Long id);


}
