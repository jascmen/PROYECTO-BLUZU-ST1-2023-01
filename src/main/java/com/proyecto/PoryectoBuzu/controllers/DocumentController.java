package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.VentasDao;
import com.proyecto.PoryectoBuzu.formatDocuments.DocumentGenerator;
import com.proyecto.PoryectoBuzu.models.Ventas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class DocumentController {

    @Autowired
    private VentasDao ventasDao;

    @RequestMapping(value = "api/reportePdf/{id_venta}", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> generarPdf(@PathVariable Long id_venta) throws IOException {
        Ventas venta = ventasDao.obtenerDatosVenta(id_venta);
        DocumentGenerator document = new DocumentGenerator();
        byte[] pdfBytes = document.generarPdf(venta);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("inline", "reporte.pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "api/reporteExcel/{id_venta}",method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<byte[]> generarExcel(@PathVariable Long id_venta) throws IOException {
        Ventas venta = ventasDao.obtenerDatosVenta(id_venta);
        DocumentGenerator document = new DocumentGenerator();
        byte[] excelBytes = document.generarExcel(venta);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "reporte.xlsx");

        return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);
    }


}
