package com.proyecto.PoryectoBuzu.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table (name = "clientes")
@ToString @EqualsAndHashCode
public class Clientes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id_cliente")
    private Long id_cliente;

    @Getter @Setter @Column(name = "nombre")
    private String nombre_cliente;

    @Getter @Setter @Column(name = "apellido")
    private String apellido_cliente;

    @Getter @Setter @Column(name = "dni")
    private int dni;

    @Getter @Setter @Column(name = "password")
    private String password;

    @Getter @Setter @Column(name = "correo")
    private String email;

    @Getter @Setter @Column(name = "rol")
    private String rol;
}
