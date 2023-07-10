package com.proyecto.PoryectoBuzu.models;

import lombok.Getter;
import lombok.Setter;

public class CategoriaVendida {

    @Getter @Setter
    private String categoria;

    @Getter @Setter
    private int id;

    @Getter @Setter
    private int cantidad;

    public CategoriaVendida(int id, int cantidad) {
        this.id = id;
        this.cantidad = cantidad;
    }

    public CategoriaVendida(String categoria, int cantidad) {
        this.categoria = categoria;
        this.cantidad = cantidad;
    }
}
