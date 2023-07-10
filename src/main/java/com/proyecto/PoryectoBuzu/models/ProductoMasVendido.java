package com.proyecto.PoryectoBuzu.models;

import lombok.Getter;
import lombok.Setter;

public class ProductoMasVendido {
    @Getter @Setter
    private String nombre;

    @Getter @Setter
    private int cantidad;

    @Getter @Setter
    private  int id;


    public ProductoMasVendido(String nombre, int cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

    public ProductoMasVendido(int id,int cantidad) {
        this.id = id;
        this.cantidad = cantidad;
    }

}
