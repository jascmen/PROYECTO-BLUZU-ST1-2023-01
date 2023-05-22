package com.proyecto.PoryectoBuzu.models;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "categoria_empleados")
@ToString @EqualsAndHashCode
public class CategoriaEmp {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column( name = "id_categ_empl")
    private Long id_categ_emp;

    @Getter @Setter @Column( name = "nom_categ_empl")
    private String nom_categ_emp;
}
