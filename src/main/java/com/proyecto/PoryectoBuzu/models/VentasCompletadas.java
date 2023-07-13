package com.proyecto.PoryectoBuzu.models;

import lombok.Getter;
import lombok.Setter;

public class VentasCompletadas {

    @Getter @Setter
    private String semana;

    @Getter @Setter
    private double cantidad;

    public VentasCompletadas(String semana, double cantidad) {
        this.semana = semana;
        this.cantidad = cantidad;
    }
}
