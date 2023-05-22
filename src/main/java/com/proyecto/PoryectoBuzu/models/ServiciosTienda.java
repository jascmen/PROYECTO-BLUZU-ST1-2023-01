package com.proyecto.PoryectoBuzu.models;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "servicios")
@ToString @EqualsAndHashCode
public class ServiciosTienda {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column( name = "id_servicio")
    private Long id_servicio;

    @Getter @Setter @Column( name = "nom_serv")
    private String name_servicio;

    @Getter @Setter @Column( name = "dscrp_serv")
    private String descrip_servicio;

    @Getter @Setter @Column( name = "img_serv")
    private String img_servicio;

}
