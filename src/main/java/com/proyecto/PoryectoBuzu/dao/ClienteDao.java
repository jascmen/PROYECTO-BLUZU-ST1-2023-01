package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Clientes;

import java.util.List;

public interface ClienteDao {

    void registrarCLiente(Clientes cliente);

    boolean verificarCredenciales(Clientes cliente);

}
