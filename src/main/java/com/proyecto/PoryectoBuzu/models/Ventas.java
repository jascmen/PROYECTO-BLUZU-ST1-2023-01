package com.proyecto.PoryectoBuzu.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table (name = "ventas")
@ToString
@EqualsAndHashCode
public class Ventas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column( name = "id_venta")
    private Long id_venta;

    @Temporal(TemporalType.TIMESTAMP)
    @Getter @Setter @Column ( name = "fecha_venta")
    private LocalDateTime fecha_venta;

    @Getter @Setter @Column ( name = "dni_cliente")
    private String dni_cliente;

    @Getter @Setter @Column ( name = "email_cliente")
    private String email_cliente;

    @Getter @Setter @Column ( name = "celular_cliente")
    private String celular_cliente;

    @Getter @Setter @Column ( name = "datos_cliente")
    private String datos_cliente;

    @Getter @Setter @Column ( name = "total_venta")
    private Double total_venta;

    @Getter @Setter @Column ( name = "estado")
    private String estado;

    @Getter @Setter @Column ( name = "descripcion")
    private String descripcion;

    @Getter @Setter @Column ( name = "tipo_pago")
    private String tipo_pago;


    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "venta_id")
    @Getter @Setter
    @JsonIgnore
    private List<DetalleVenta> itemsVenta;

    public Ventas() {
        this.itemsVenta = new ArrayList<DetalleVenta>();
    }

    public void addItemVenta(DetalleVenta item){
        this.itemsVenta.add(item);
    }

    public Double getTotal(){
        double  total = 0;

        int size = itemsVenta.size();

        for (int i =0; i <size; i++){
            total += itemsVenta.get(i).getTotal();
        }
        return total;

    }


}
