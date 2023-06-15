package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Ventas;

import java.util.List;

public interface VentasDao {

    List<Ventas> getVentas();

    void eliminarVenta(Long id);

    void registrarVenta(Ventas venta);

    Ventas obtenerDatosVenta(Long id);


}
