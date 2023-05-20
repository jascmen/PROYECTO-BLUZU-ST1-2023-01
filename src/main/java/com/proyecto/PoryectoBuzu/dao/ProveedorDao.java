package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Proveedor;

import java.util.List;

public interface ProveedorDao {

    List<Proveedor> getProveedores();

    void eliminar(Long id);

    void registrarProveedor(Proveedor proveedor);
}
