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

    @Getter @Setter
    private double totalVenta;


    public CategoriaVendida(String categoria, int cantidad) {
        this.categoria = categoria;
        this.cantidad = cantidad;
    }

    public CategoriaVendida(String categoria, double totalVenta) {
        this.categoria = categoria;
        this.totalVenta = totalVenta;
    }
}
