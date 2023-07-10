package com.proyecto.PoryectoBuzu.models;

import lombok.Getter;
import lombok.Setter;

public class VentasCompletadas {

    @Getter @Setter
    private String mes;

    @Getter @Setter
    private double cantidad;

    public VentasCompletadas(String mes, double cantidad) {
        this.mes = mes;
        this.cantidad = cantidad;
    }
}
