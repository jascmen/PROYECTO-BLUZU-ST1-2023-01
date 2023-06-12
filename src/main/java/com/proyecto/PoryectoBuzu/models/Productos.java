package com.proyecto.PoryectoBuzu.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "vendemos")
@ToString
@EqualsAndHashCode
public class Productos {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Getter
        @Setter
        @Column( name = "id_prod")
        private Long idProd;


        @Getter @Setter @Column( name = "sku_prod")
        private String sku_prod;

        @Getter @Setter @Column( name = "nom_prod")
        private String nom_prod;

        @Getter @Setter @Column( name = "descrp_prod")
        private String descrp_prod;

        @Getter @Setter @Column( name = "cantidad_prod")
        private  int cantidad_prod;

        @Getter @Setter @Column( name = "categ_prod")
        private String categ_prod;

        @Getter @Setter @Column( name = "compra")
        private double compra;

        @Getter @Setter @Column( name = "venta")
        private double venta;

        @Getter @Setter @Column( name = "descuento")
        private double descuento;

        @Getter @Setter @Column( name = "proveedor")
        private String proveedor;

        @Getter @Setter @Column( name = "img_prod")
        private String img_prod;

        @Getter @Setter @Column ( name = "resumen_prod")
        private String resumen_product;

}
