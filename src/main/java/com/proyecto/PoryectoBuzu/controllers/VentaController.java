package com.proyecto.PoryectoBuzu.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.PoryectoBuzu.dao.DetalleVentaDao;
import com.proyecto.PoryectoBuzu.dao.ProductosDao;
import com.proyecto.PoryectoBuzu.dao.VentasDao;
import com.proyecto.PoryectoBuzu.models.Detalle;
import com.proyecto.PoryectoBuzu.models.DetalleVenta;
import com.proyecto.PoryectoBuzu.models.Productos;
import com.proyecto.PoryectoBuzu.models.Ventas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class VentaController {


    @Autowired
    private VentasDao ventasDao;

    @Autowired
    private ProductosDao productosDao;

    @Autowired
    private DetalleVentaDao detalleVentaDao;

    @RequestMapping(value = "api/ventas", method = RequestMethod.GET)
    public List<Ventas> getVentas(){
        List<Ventas> ventas = ventasDao.getVentas();
        List<Ventas> nuevaLista = new ArrayList<>();

        for(int i =0; i< ventas.size(); i++){
            Ventas venta = ventas.get(i);
            Ventas temporal = new Ventas();
            temporal.setId_venta(venta.getId_venta());
            temporal.setDni_cliente(venta.getDni_cliente());
            temporal.setDatos_cliente(venta.getDatos_cliente());
            temporal.setTotal_venta(venta.getTotal());
            temporal.setFecha_venta(venta.getFecha_venta());
            nuevaLista.add(temporal);

        }

        return nuevaLista;
    }

    @RequestMapping(value = "api/ventas/{id_venta}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable Long id_venta){
        ventasDao.eliminarVenta(id_venta);
    }

    @RequestMapping(value = "api/ventas", method = RequestMethod.POST)
    public void registrarVenta(@RequestBody String requestBody) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> requestData = objectMapper.readValue(requestBody, new TypeReference<Map<String, Object>>() {
            });

            Ventas venta = objectMapper.convertValue(requestData.get("venta"), Ventas.class);
            Long[] productoIds = objectMapper.convertValue(requestData.get("productoIds"), Long[].class);
            int[] cantidades = objectMapper.convertValue(requestData.get("cantidades"), int[].class);

            for (int i = 0; i < productoIds.length; i++) {
                Productos producto = productosDao.obtenerDatosProducto(productoIds[i]);

                DetalleVenta itemVenta = new DetalleVenta();

                itemVenta.setCantidad(cantidades[i]);
                itemVenta.setProducto(producto);
                itemVenta.setPrecio(producto.getVenta());
                itemVenta.setTotal(itemVenta.calcularImporte());
                venta.addItemVenta(itemVenta);
            }

            venta.setTotal_venta(venta.getTotal());
            venta.setFecha_venta(LocalDateTime.now());
            venta.setEstado("PAGADO");
            ventasDao.registrarVenta(venta);

        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @RequestMapping(value = "api/ventas/{id_venta}", method = RequestMethod.GET)
    public Ventas obtenerDatosVenta(@PathVariable Long id_venta){
            Ventas venta = ventasDao.obtenerDatosVenta(id_venta);
        List<DetalleVenta> detallesVenta = venta.getItemsVenta();
            venta.setTotal_venta(venta.getTotal());
        return venta;
    }

    @RequestMapping(value = "api/detalleventas/{id_venta}", method = RequestMethod.GET)
    public List<Detalle>  obtenerDetalleVenta(@PathVariable Long id_venta){
        Ventas venta = ventasDao.obtenerDatosVenta(id_venta);
        List<DetalleVenta> detallesVenta = venta.getItemsVenta();
        List<Detalle> detalles = new ArrayList<>();
        for (int i = 0; i < detallesVenta.size(); i++) {

            Detalle detalle = new Detalle();
            detalle.setCodigo(detallesVenta.get(i).getProducto().getSku_prod());
            detalle.setPrecio(detallesVenta.get(i).getProducto().getVenta());
            detalle.setNombre(detallesVenta.get(i).getProducto().getNom_prod());
            detalle.setCantidad(detallesVenta.get(i).getCantidad());
            detalle.setSubtotal(detallesVenta.get(i).getTotal());
            detalles.add(detalle);
        }
        return detalles;
    }


}
