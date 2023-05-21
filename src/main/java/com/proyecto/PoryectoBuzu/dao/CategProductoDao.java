package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.CategoriaProd;

import java.util.List;

public interface CategProductoDao {

    List<CategoriaProd> getCategoriasProductos();

    void eliminar(Long id);

    void registrarCate(CategoriaProd categProd );

    void editarCategProduct(Long idCategProd, CategoriaProd categProd );

    CategoriaProd obtenerDatosCategProd(Long idCategProd);
}
