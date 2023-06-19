package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Clientes;

import java.util.List;

public interface ClienteDao {

    void registrarCLiente(Clientes cliente);

    Clientes obtenerUsuarioPorCredenciales(Clientes cliente);

    boolean verificarCorreo(Clientes cliente);

    String obtenerRol (Long id);

    Clientes  obtenerDatos (Long id);

}
