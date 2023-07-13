package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.GraficosDao;
import com.proyecto.PoryectoBuzu.formatDocuments.DocumentGenerator;
import com.proyecto.PoryectoBuzu.models.CategoriaVendida;
import com.proyecto.PoryectoBuzu.models.ProductoMasVendido;
import com.proyecto.PoryectoBuzu.models.VentasCompletadas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
public class GraficosController {

    @Autowired
    private GraficosDao graficosDao ;

    @RequestMapping(value = "api/tablavendidos", method = RequestMethod.GET)
    public List<ProductoMasVendido> getMasVendidos(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        // Utiliza startDate y endDate para obtener los datos según el rango de fechas seleccionado

        // Ejemplo de cómo podrías utilizar los valores de fecha
        return graficosDao.getProductosVendidos(startDate, endDate);
    }


    @RequestMapping(value = "api/graficopastel", method = RequestMethod.GET)
    public List<CategoriaVendida>getCategoriasVendidas(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){

        return graficosDao.getCategoriasVendidas(startDate, endDate);
    }

    @RequestMapping(value = "api/graficolineal", method = RequestMethod.GET)
    public List<VentasCompletadas>getVentasCompletadas(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){

        return graficosDao.getVentasCompletadas(startDate, endDate);
    }

    @RequestMapping(value = "api/graficobarras" , method = RequestMethod.GET)
    public List<CategoriaVendida>getCategoriasVendidasMes(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){

        return graficosDao.getVentasCategoriasTotal(startDate, endDate);
    }

    @RequestMapping(value = "api/reporteTablasPDF" , method = RequestMethod.GET)
    public ResponseEntity<byte[]>generarTablaPDF(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) throws IOException {
        List<ProductoMasVendido> productosVendidos = graficosDao.getProductosVendidos(startDate, endDate);
        DocumentGenerator document = new DocumentGenerator();
        byte[] pdfBytes = document.generarPDFTabla(productosVendidos);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("inline", "reporte.pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "api/reporteTablasExcel" , method = RequestMethod.GET)
    public ResponseEntity<byte[]>generarTablaExcel(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) throws IOException {
        List<ProductoMasVendido> productosVendidos = graficosDao.getProductosVendidos(startDate, endDate);
        DocumentGenerator document = new DocumentGenerator();
        byte[] excelBytes = document.generarExcelTabla(productosVendidos);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "reporte.xlsx");

        return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "api/reportePastelPDF" , method = RequestMethod.GET)
    public ResponseEntity<byte[]>generarPastelPDF(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) throws IOException {
        List<CategoriaVendida> categoriasVendidas = graficosDao.getCategoriasVendidas(startDate, endDate);
        DocumentGenerator document = new DocumentGenerator();
        byte[] pdfBytes = document.generarPdfPastel(categoriasVendidas);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("inline", "reporte.pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "api/reportePastelExcel" , method = RequestMethod.GET)
    public ResponseEntity<byte[]>generarPastelExcel(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) throws Exception {
        List<CategoriaVendida> categoriasVendidas = graficosDao.getCategoriasVendidas(startDate, endDate);
        DocumentGenerator document = new DocumentGenerator();
        byte[] excelBytes = document.generarExcelPastel(categoriasVendidas);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "reporte.xlsx");

        return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "api/reporteBarrasPDF" , method = RequestMethod.GET)
    public ResponseEntity<byte[]>generarBarrasPDF(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) throws IOException {
        List<CategoriaVendida> categoriasVendidas = graficosDao.getVentasCategoriasTotal(startDate, endDate);
        DocumentGenerator document = new DocumentGenerator();
        byte[] pdfBytes = document.generarPdfBarras(categoriasVendidas);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("inline", "reporte.pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "api/reporteBarrasExcel" , method = RequestMethod.GET)
    public ResponseEntity<byte[]>generarBarrasExcel(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) throws Exception {
        List<CategoriaVendida> categoriasVendidas = graficosDao.getVentasCategoriasTotal(startDate, endDate);
        DocumentGenerator document = new DocumentGenerator();
        byte[] excelBytes = document.generarExcelBarras(categoriasVendidas);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "reporte.xlsx");

        return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "api/reporteLineasPDF" , method = RequestMethod.GET)
    public ResponseEntity<byte[]>generarLineasPDF(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) throws IOException {
        List<VentasCompletadas> ventasCompletadas = graficosDao.getVentasCompletadas(startDate, endDate);
        DocumentGenerator document = new DocumentGenerator();
        byte[] pdfBytes = document.generarPdfLineas(ventasCompletadas);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("inline", "reporte.pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "api/reporteLineasExcel" , method = RequestMethod.GET)
    public ResponseEntity<byte[]>generarLineasExcel(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) throws Exception {
        List<VentasCompletadas> ventasCompletadas = graficosDao.getVentasCompletadas(startDate, endDate);
        DocumentGenerator document = new DocumentGenerator();
        byte[] excelBytes = document.generarExcelLineas(ventasCompletadas);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "reporte.xlsx");

        return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);
    }

}
