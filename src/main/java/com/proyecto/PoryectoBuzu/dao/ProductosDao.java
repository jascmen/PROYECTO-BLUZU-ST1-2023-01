package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Productos;

import java.util.List;

public interface ProductosDao {

    List<Productos> getProductos();

    void eliminarProducto(Long id_producto);

    void registrarProducto(Productos producto);

    void editarProducto(Productos producto);

    Productos obtenerDatosProducto(Long id_producto);
}
