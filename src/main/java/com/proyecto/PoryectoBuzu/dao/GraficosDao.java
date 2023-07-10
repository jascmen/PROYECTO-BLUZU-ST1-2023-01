package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.CategoriaVendida;
import com.proyecto.PoryectoBuzu.models.ProductoMasVendido;
import com.proyecto.PoryectoBuzu.models.ProductosVendidosMesActual;
import com.proyecto.PoryectoBuzu.models.VentasCompletadas;
import java.util.List;


public interface GraficosDao {

    List<ProductoMasVendido> getProductosVendidos();

    List<CategoriaVendida> getCategoriasVendidas();

    List<VentasCompletadas> getVentasCompletadas();

    List<ProductosVendidosMesActual> getVentasMesActual();
}
