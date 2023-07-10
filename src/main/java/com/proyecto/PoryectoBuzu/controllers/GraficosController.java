package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.GraficosDao;
import com.proyecto.PoryectoBuzu.models.CategoriaVendida;
import com.proyecto.PoryectoBuzu.models.ProductoMasVendido;
import com.proyecto.PoryectoBuzu.models.ProductosVendidosMesActual;
import com.proyecto.PoryectoBuzu.models.VentasCompletadas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GraficosController {

    @Autowired
    private GraficosDao graficosDao ;

    @RequestMapping(value = "api/tablavendidos", method = RequestMethod.GET)
    public List<ProductoMasVendido>getMasVendidos(){

        return graficosDao.getProductosVendidos();
    }

    @RequestMapping(value = "api/graficopastel", method = RequestMethod.GET)
    public List<CategoriaVendida>getCategoriasVendidas(){

        return graficosDao.getCategoriasVendidas();
    }

    @RequestMapping(value = "api/graficolineal", method = RequestMethod.GET)
    public List<VentasCompletadas>getVentasCompletadas(){

        return graficosDao.getVentasCompletadas();
    }

    @RequestMapping(value = "api/graficobarras" , method = RequestMethod.GET)
    public List<ProductosVendidosMesActual>getCategoriasVendidasMes(){

        return graficosDao.getVentasMesActual();
    }
}
