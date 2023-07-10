package com.proyecto.PoryectoBuzu.models;

import lombok.Getter;
import lombok.Setter;

public class ProductosVendidosMesActual {


    @Getter @Setter
    private double cantidad;

    @Getter @Setter
    private double totalVenta;

    @Getter @Setter
    private String nombre;


    public ProductosVendidosMesActual(String nombreProducto, double cantidad, double totalVenta) {
    }

    public ProductosVendidosMesActual() {

    }
}
