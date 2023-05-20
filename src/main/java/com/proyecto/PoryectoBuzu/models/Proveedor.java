package com.proyecto.PoryectoBuzu.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "proveedor")
@ToString @EqualsAndHashCode
public class Proveedor {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id_proveedor")
    private Long id_proveedor;

    @Getter @Setter @Column(name = "nombre_prov")
    private String nombre_prov;

    @Getter @Setter @Column(name = "celular_prov")
    private Integer celular_prov;

    @Getter @Setter @Column(name = "correo_prov")
    private String correo_prov;

    @Getter @Setter @Column(name = "direccion_prov")
    private String direccion_prov;
}
