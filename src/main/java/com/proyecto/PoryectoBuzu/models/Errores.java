package com.proyecto.PoryectoBuzu.models;

import lombok.Getter;
import lombok.Setter;

public class Errores {

    @Getter @Setter
    private String nombre;

    @Getter @Setter
    private String apellido;

    @Getter @Setter
    private String email;

    @Getter @Setter
    private String codigoSKU;

    @Getter @Setter
    private String imagen;

    @Getter @Setter
    private String descripcion;

    @Getter @Setter
    private String resumen;

    @Getter @Setter
    private String descuento;

    @Getter @Setter
    private String cantidad;

    @Getter @Setter
    private String precioCompra;

    @Getter @Setter
    private String proveedor;

    @Getter @Setter
    private String categoria;

    @Getter @Setter
    private String exito;


    public Errores() {
    }


}
