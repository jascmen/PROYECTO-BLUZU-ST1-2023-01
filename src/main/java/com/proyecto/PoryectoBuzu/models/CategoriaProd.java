package com.proyecto.PoryectoBuzu.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "categoria_productos")
@ToString @EqualsAndHashCode
public class CategoriaProd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id_categ_prod")
    private Long id_categ_prod;

    @Getter @Setter @Column(name = "nom_categ_prod")
    private String name_categ_prod;

    @Getter @Setter @Column(name = "img_cat_prd")
    private String rutimg_categ_prd;

    @Getter @Setter @Column(name = "descrp_categ_pro")
    private String descrip_categ_pro;

}
