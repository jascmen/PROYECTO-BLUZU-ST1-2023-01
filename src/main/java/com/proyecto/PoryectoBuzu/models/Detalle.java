package com.proyecto.PoryectoBuzu.models;

import lombok.Getter;
import lombok.Setter;

public class Detalle {

    @Getter @Setter
    private String codigo;

    @Getter @Setter
    private String nombre;

    @Getter @Setter
    private int cantidad;

    @Getter @Setter
    private Double precio;

    @Getter @Setter
    private Double subtotal;
}
