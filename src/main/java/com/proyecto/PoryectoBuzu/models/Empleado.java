package com.proyecto.PoryectoBuzu.models;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "categoria_empleados")
@ToString @EqualsAndHashCode
public class Empleado {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column( name = "id_empleado")
    private Long id_empleado;

    @Getter @Setter @Column( name = "nombre_empl")
    private String nombre_empleado;

    @Getter @Setter @Column( name = "apellido_empl")
    private String apellidos_empleado;

    @Getter @Setter @Column( name = "dni_empl")
    private Integer dni_empleado;

    @Getter @Setter @Column( name = "correo_empl")
    private String email_empleado;

    @Getter @Setter @Column( name = "celular_empl")
    private Integer celular_empleado;

    @Getter @Setter @Column( name = "cat_empl")
    private int categoria_empleado;

    @Getter @Setter @Column (name = "img_empl" )
    private String img_empleado;
}
