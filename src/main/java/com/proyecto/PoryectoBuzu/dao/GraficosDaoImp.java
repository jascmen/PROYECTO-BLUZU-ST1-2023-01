package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Repository
@Transactional
public class GraficosDaoImp implements GraficosDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ProductosDao productosDao;

    @Autowired
    private CategProductoDao categProductoDao;

    @Autowired
    private VentasDao ventasDao;

    @Autowired
    private DetalleVentaDao detalleVentaDao;


    LocalDate fechaActual = LocalDate.now();
    int yearActual = fechaActual.getYear();
    int mesActual = fechaActual.getMonthValue();


    @Override
    public List<ProductoMasVendido> getProductosVendidos(LocalDate startDate, LocalDate endDate) {
        List<Ventas> listaVentas = ventasDao.getVentas();
        List<Ventas> ventasCompletadas = new ArrayList<>();

        for (Ventas venta : listaVentas) {
            LocalDate fechaVenta = venta.getFecha_venta();

            if ((fechaVenta.isAfter(startDate) || fechaVenta.equals(startDate)) && (fechaVenta.isBefore(endDate) || fechaVenta.equals(endDate))) {
                ventasCompletadas.add(venta);
            }
        }

        List<ProductoMasVendido> productosMasVendidos = new ArrayList<>();

        for (Ventas venta : ventasCompletadas) {
            List<DetalleVenta> itemsVenta = venta.getItemsVenta();
            for (DetalleVenta detalleVenta : itemsVenta) {
                String nombreProducto = detalleVenta.getProducto().getNom_prod();
                int cantidad = detalleVenta.getCantidad();

                // Verificar si el producto ya existe en la lista
                boolean productoExistente = false;
                for (ProductoMasVendido productoMasVendido : productosMasVendidos) {
                    if (productoMasVendido.getNombre().equals(nombreProducto)) {
                        productoMasVendido.setCantidad(productoMasVendido.getCantidad() + cantidad);
                        productoExistente = true;
                        break;
                    }
                }

                // Si el producto no existe, agregarlo a la lista
                if (!productoExistente) {
                    ProductoMasVendido productoMasVendido = new ProductoMasVendido(nombreProducto, cantidad);
                    productosMasVendidos.add(productoMasVendido);
                }
            }
        }

// Ordenar la lista de productosMasVendidos según la cantidad de ventas en orden descendente
        Collections.sort(productosMasVendidos, Comparator.comparingInt(ProductoMasVendido::getCantidad).reversed());

// Obtener los primeros 10 productos más vendidos
        List<ProductoMasVendido> top10Productos = productosMasVendidos.subList(0, Math.min(10, productosMasVendidos.size()));


        return top10Productos;
    }

    @Override
    public List<CategoriaVendida> getCategoriasVendidas(LocalDate startDate, LocalDate endDate) {

        List<Ventas> listaVentas = ventasDao.getVentas();
        List<Ventas> ventasCompletadas = new ArrayList<>();
        List<CategoriaVendida> categoriasVendidas = new ArrayList<>();

        for (Ventas venta : listaVentas) {
            LocalDate fechaVenta = venta.getFecha_venta();

            if ((fechaVenta.isAfter(startDate) || fechaVenta.equals(startDate)) && (fechaVenta.isBefore(endDate) || fechaVenta.equals(endDate))) {
                ventasCompletadas.add(venta);
            }
        }

        for (Ventas venta: ventasCompletadas){
            List<DetalleVenta> itemsVenta = venta.getItemsVenta();
            for (DetalleVenta detalleVenta : itemsVenta){
                String categoria = detalleVenta.getProducto().getCateg_prod();
                int cantidadVendida = detalleVenta.getCantidad();
                    // Verificar si la categoría ya existe en la lista de categorías vendidas
                    boolean categoriaExistente = false;
                    for (CategoriaVendida categoriaVendida : categoriasVendidas) {
                        if (categoriaVendida.getCategoria().equals(categoria)) {
                            // Si la categoría ya existe, sumar la cantidad vendida
                            categoriaVendida.setCantidad(categoriaVendida.getCantidad() + cantidadVendida);
                            categoriaExistente = true;
                            break;
                        }
                    }
                    // Si la categoría no existe, agregarla a la lista de categorías vendidas
                    if (!categoriaExistente) {
                        CategoriaVendida categoriaVendida = new CategoriaVendida(categoria, cantidadVendida);
                        categoriasVendidas.add(categoriaVendida);
                    }
            }
        }

        return categoriasVendidas;
    }

    @Override
    public List<VentasCompletadas> getVentasCompletadas(LocalDate startDate, LocalDate endDate) {
        long totalSemanas = ChronoUnit.WEEKS.between(startDate, endDate);
        long diasRestantes = ChronoUnit.DAYS.between(startDate, endDate) % 7;

        List<Ventas> listaVentas = ventasDao.getVentas();
        List<Ventas> ventasCompletadas = new ArrayList<>();
        List<VentasCompletadas> ventasCompletadasPorSemana = new ArrayList<>();

        for (Ventas venta : listaVentas) {
            LocalDate fechaVenta = venta.getFecha_venta();

            if ((fechaVenta.isAfter(startDate) || fechaVenta.equals(startDate)) && (fechaVenta.isBefore(endDate) || fechaVenta.equals(endDate))) {
                ventasCompletadas.add(venta);
            }
        }

        for (int i = 0; i < totalSemanas; i++) {
            LocalDate semanaInicio = startDate.plusWeeks(i);
            LocalDate semanaFin = semanaInicio.plusDays(6);

            double totalSemana = 0.0;

            for (Ventas venta : ventasCompletadas) {
                LocalDate fechaVenta = venta.getFecha_venta();

                if (!fechaVenta.isBefore(semanaInicio) && !fechaVenta.isAfter(semanaFin)) {
                    totalSemana += venta.getTotal_venta();
                }
            }

            VentasCompletadas ventasSemana = new VentasCompletadas("Semana " + (i + 1) + ": " + semanaInicio + " -- " + semanaFin, totalSemana);
            ventasCompletadasPorSemana.add(ventasSemana);
        }

        // Procesar días restantes
        if (diasRestantes > 0) {
            LocalDate ultimaSemanaInicio = startDate.plusWeeks(totalSemanas);
            LocalDate ultimaSemanaFin = endDate;

            double totalUltimaSemana = 0.0;

            for (Ventas venta : ventasCompletadas) {
                LocalDate fechaVenta = venta.getFecha_venta();

                if (!fechaVenta.isBefore(ultimaSemanaInicio) && !fechaVenta.isAfter(ultimaSemanaFin)) {
                    totalUltimaSemana += venta.getTotal_venta();
                }
            }

            VentasCompletadas ultimaSemana = new VentasCompletadas("Semana " + (totalSemanas + 1) + ": " + ultimaSemanaInicio + " -- " + ultimaSemanaFin, totalUltimaSemana);
            ventasCompletadasPorSemana.add(ultimaSemana);
        }

        return ventasCompletadasPorSemana;
    }


    @Override
    public List<CategoriaVendida> getVentasCategoriasTotal(LocalDate startDate, LocalDate endDate) {
        List<Ventas> listaVentas = ventasDao.getVentas();
        List<Ventas> ventasCompletadas = new ArrayList<>();
        List<CategoriaVendida> ventasCompletadasCategoria= new ArrayList<>();

        for (Ventas venta : listaVentas) {
            LocalDate fechaVenta = venta.getFecha_venta();

            if ((fechaVenta.isAfter(startDate) || fechaVenta.equals(startDate)) && (fechaVenta.isBefore(endDate) || fechaVenta.equals(endDate))) {
                ventasCompletadas.add(venta);
            }
        }


        for (Ventas venta: ventasCompletadas){
            List<DetalleVenta> itemsVenta = venta.getItemsVenta();

            for (DetalleVenta detalleVenta : itemsVenta){
                String categoria = detalleVenta.getProducto().getCateg_prod();
                double totalVendido = detalleVenta.getTotal();

                    // Verificar si la categoría ya existe en la lista de categorías vendidas
                    boolean categoriaExistente = false;
                    for (CategoriaVendida categoriaVendida : ventasCompletadasCategoria) {
                        if (categoriaVendida.getCategoria().equals(categoria)) {
                            // Si la categoría ya existe, sumar la cantidad vendida
                            categoriaVendida.setTotalVenta(categoriaVendida.getTotalVenta() + totalVendido);
                            categoriaExistente = true;
                            break;
                        }
                    }
                    // Si la categoría no existe, agregarla a la lista de categorías vendidas
                    if (!categoriaExistente) {
                        CategoriaVendida categoriaVendida = new CategoriaVendida(categoria, totalVendido);
                        ventasCompletadasCategoria.add(categoriaVendida);
                    }


            }
        }

        return ventasCompletadasCategoria;
    }






    private String obtenerNombreMes(int numeroMes) {
        LocalDate fecha = LocalDate.of(yearActual, numeroMes, 1);
        return fecha.getMonth().getDisplayName(TextStyle.FULL_STANDALONE, new Locale("es"));
    }


}
