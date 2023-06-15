package com.proyecto.PoryectoBuzu.models;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "detalle_ventas")
@ToString
@EqualsAndHashCode
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id_detalle")
    private Long id;

    @Getter @Setter @Column(name = "cantidad")
    private int cantidad;

    @Getter @Setter @Column(name = "precio_unitario")
    private double precio;

    @Getter @Setter @Column(name = "total")
    private  double total;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto")
    @Getter @Setter
    private Productos producto;

    public double calcularImporte(){
        return (double) cantidad * producto.getVenta();
    }

}
