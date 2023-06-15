package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.DetalleVenta;

import java.util.List;

public interface DetalleVentaDao {

    List<DetalleVenta> getdetallesVentas();

    void eliminarDetallesVenta(Long id);

    void registrarDetallesVenta(DetalleVenta detalleVenta);



}
