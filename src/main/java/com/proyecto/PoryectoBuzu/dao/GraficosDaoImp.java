package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

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
    public List<ProductoMasVendido> getProductosVendidos() {
        String query = "SELECT d.producto.idProd, SUM(d.cantidad) "
                + "FROM DetalleVenta d  "
                + "GROUP BY d.producto.idProd "
                + "ORDER BY SUM(d.cantidad) DESC";

        List<Object[]> temporal = entityManager.createQuery(query).setMaxResults(10).getResultList();
        //List<ProductoMasVendido> listaTemporal = new ArrayList<>();
        List<ProductoMasVendido> productosMasVendidos = new ArrayList<>();

        /*
        for (Object[] result : temporal) {
            int id = ((Long) result[0]).intValue();
            int cantidad = ((Long) result[1]).intValue();

            ProductoMasVendido productoMasVendido = new ProductoMasVendido(id, cantidad);
            listaTemporal.add(productoMasVendido);
        }

         */


        for (Object[] result : temporal) {
            int idProducto =  ((Long) result[0]).intValue();
            int cantidadVendida = ((Long) result[1]).intValue();



            Productos producto = new Productos();
            producto = productosDao.obtenerDatosProducto((long) idProducto);

                String nombreProducto = producto.getNom_prod();

                ProductoMasVendido productoMasVendido = new ProductoMasVendido(nombreProducto, cantidadVendida);
                productosMasVendidos.add(productoMasVendido);

        }
        return productosMasVendidos;
    }

    @Override
    public List<CategoriaVendida> getCategoriasVendidas() {
        String query = "SELECT d.producto.idProd, SUM(d.cantidad) "
                + "FROM DetalleVenta d "
                + "GROUP BY d.producto.idProd "
                + "ORDER BY SUM(d.cantidad) DESC";
        List<Object[]> temporal = entityManager.createQuery(query).getResultList();
        List<CategoriaVendida> categoriasVendidas = new ArrayList<>();

        List<CategoriaProd> categorias = categProductoDao.getCategoriasProductos();



        for (Object[] result : temporal) {
            int idProducto =  ((Long) result[0]).intValue();
            int cantidadVendida = ((Long) result[1]).intValue();

            Productos producto = new Productos();
            producto = productosDao.obtenerDatosProducto((long) idProducto);

            String categoria = producto.getCateg_prod();

            // Buscar la categoría en la lista de categorías
            for (CategoriaProd categoriaProd : categorias) {
                if (categoriaProd.getName_categ_prod().equals(categoria)) {
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
                    break;
                }
            }


        }

        return categoriasVendidas;
    }

    @Override
    public List<VentasCompletadas> getVentasCompletadas() {
        List<Ventas> listaVentas = ventasDao.getVentas();
        List<VentasCompletadas> ventasCompletadas = new ArrayList<>();


        // Filtrar y agrupar las ventas por mes y sumar las cantidades
        Map<Integer, Double> ventasPorMes = listaVentas.stream()
                .filter(venta -> {
                    // Obtener la fecha de venta y extraer el año
                    LocalDate fechaVenta = venta.getFecha_venta();
                    int yearVenta = fechaVenta.getYear();

                    // Filtrar las ventas que corresponden al año actual
                    return yearVenta == yearActual;
                })
                .collect(Collectors.groupingBy(venta -> {
                    // Obtener el número del mes
                    LocalDate fechaVenta = venta.getFecha_venta();
                    return fechaVenta.getMonthValue();
                }, Collectors.summingDouble(Ventas::getTotal_venta)));

        // Recorrer los meses del año actual y crear objetos VentasCompletadas
        for (int mes = 1; mes <= 12; mes++) {
            String nombreMes = obtenerNombreMes(mes);
            Double cantidad = ventasPorMes.getOrDefault(mes, 0.0);
            VentasCompletadas ventaCompleta = new VentasCompletadas(nombreMes, cantidad);
            ventasCompletadas.add(ventaCompleta);
        }

        return ventasCompletadas;
    }


    @Override
    public List<ProductosVendidosMesActual> getVentasMesActual() {
        List<Ventas> ventas = ventasDao.getVentas();
        Map<String, ProductosVendidosMesActual> mapaProductos = new HashMap<>();

        for (Ventas venta : ventas) {
            if (venta.getFecha_venta().getYear() == yearActual && venta.getFecha_venta().getMonthValue() == mesActual) {
                List<DetalleVenta> itemsVenta = venta.getItemsVenta();
                for (DetalleVenta detalleVenta : itemsVenta) {
                    String nombreProducto = detalleVenta.getProducto().getNom_prod();
                    double cantidad = detalleVenta.getCantidad();
                    double totalVenta = detalleVenta.getTotal();

                    if (mapaProductos.containsKey(nombreProducto)) {
                        ProductosVendidosMesActual producto = mapaProductos.get(nombreProducto);
                        producto.setCantidad(producto.getCantidad() + cantidad);
                        producto.setTotalVenta(producto.getTotalVenta() + totalVenta);
                    } else {
                        ProductosVendidosMesActual productoExistente = mapaProductos.get(nombreProducto);
                        if (productoExistente != null) {
                            productoExistente.setCantidad(productoExistente.getCantidad() + cantidad);
                            productoExistente.setTotalVenta(productoExistente.getTotalVenta() + totalVenta);
                        } else {
                            ProductosVendidosMesActual producto = new ProductosVendidosMesActual();
                            producto.setNombre(nombreProducto);
                            producto.setCantidad(cantidad);
                            producto.setTotalVenta(totalVenta);
                            mapaProductos.put(nombreProducto, producto);
                        }
                    }
                }
            }
        }

        return new ArrayList<>(mapaProductos.values());
    }






    private String obtenerNombreMes(int numeroMes) {
        LocalDate fecha = LocalDate.of(yearActual, numeroMes, 1);
        return fecha.getMonth().getDisplayName(TextStyle.FULL_STANDALONE, new Locale("es"));
    }


}
