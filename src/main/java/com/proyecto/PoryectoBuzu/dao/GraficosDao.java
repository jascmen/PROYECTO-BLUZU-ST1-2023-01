package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.CategoriaVendida;
import com.proyecto.PoryectoBuzu.models.ProductoMasVendido;
import com.proyecto.PoryectoBuzu.models.VentasCompletadas;

import java.time.LocalDate;
import java.util.List;


public interface GraficosDao {

    List<ProductoMasVendido> getProductosVendidos(LocalDate startDate, LocalDate endDate);

    List<CategoriaVendida> getCategoriasVendidas(LocalDate startDate, LocalDate endDate);

    List<VentasCompletadas> getVentasCompletadas(LocalDate startDate, LocalDate endDate);

    List<CategoriaVendida> getVentasCategoriasTotal(LocalDate startDate, LocalDate endDate);
}
