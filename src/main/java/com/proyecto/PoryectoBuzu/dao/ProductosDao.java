package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Errores;
import com.proyecto.PoryectoBuzu.models.Productos;

import java.util.List;

public interface ProductosDao {

    List<Productos> getProductos();

    List<Productos> getProductosPorNombre(String nombre);

    void eliminarProducto(Long idProd);

    void registrarProducto(Productos producto);

    void editarProducto(Productos producto);

    Productos obtenerDatosProducto(Long idProd);

    Boolean verificarVacio(Errores errores);

    String verificarCodigo(String sku);




}
