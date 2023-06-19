package com.proyecto.PoryectoBuzu.formatDocuments;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.proyecto.PoryectoBuzu.dao.VentasDao;
import com.proyecto.PoryectoBuzu.models.DetalleVenta;
import com.proyecto.PoryectoBuzu.models.Ventas;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.awt.*;
import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class DocumentGenerator {

    private VentasDao ventasDao;

    public byte[] generarPdf(Ventas venta) throws DocumentException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);

        document.open();

        PdfPTable table1 = new PdfPTable(1);
        table1.setSpacingAfter(20);

        PdfPCell cell = null;

        cell = new PdfPCell(new Phrase("Datos del cliente"));
        cell.setBackgroundColor(new Color(184, 218, 255));
        cell.setPadding(8f);
        table1.addCell(cell);

        table1.addCell("Nombre: " + venta.getDatos_cliente());
        table1.addCell("DNI: " + venta.getDni_cliente());
        table1.addCell("Email: " + venta.getEmail_cliente());

        PdfPTable table2 = new PdfPTable(1);
        table2.setSpacingAfter(20);

        cell = new PdfPCell(new Phrase("Datos de la venta"));
        cell.setBackgroundColor(new Color(195, 230, 203));
        cell.setPadding(8f);
        table2.addCell(cell);


        table2.addCell("Código de venta: " + venta.getId_venta());
        table2.addCell("Fecha: " + venta.getFecha_venta());
        table2.addCell("Descripción: " + venta.getDescripcion());
        table2.addCell("Tipo de pago: " + venta.getTipo_pago());

        document.add(table1);
        document.add(table2);

        PdfPTable table3 = new PdfPTable(5);
        table3.setWidths(new float[]{3.5f, 1, 1, 1, 1});
        table3.addCell("Código");
        table3.addCell("Nombre");
        table3.addCell("Cantidad");
        table3.addCell("Precio Unitario");
        table3.addCell("Subtotal");

        for (DetalleVenta item : venta.getItemsVenta()) {
            table3.addCell(item.getProducto().getSku_prod());
            table3.addCell(item.getProducto().getNom_prod());

            cell = new PdfPCell(new Phrase(String.valueOf(item.getCantidad())));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table3.addCell(cell);

            table3.addCell(String.valueOf(item.getProducto().getVenta()));
            table3.addCell(String.valueOf(item.calcularImporte()));
        }

        cell = new PdfPCell(new Phrase("Total"));
        cell.setColspan(3);
        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table3.addCell(cell);
        table3.addCell(String.valueOf(venta.getTotal()));

        document.add(table3);

        document.close();
        writer.close();

        return outputStream.toByteArray();
    }

    public byte[] generarExcel(Ventas venta) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Ventas");

        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFillForegroundColor(IndexedColors.PALE_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle greenStyle = workbook.createCellStyle();
        greenStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        greenStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle yellowStyle = workbook.createCellStyle();
        yellowStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
        yellowStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);


        Row row1 = sheet.createRow(0);
        Cell cell1 = row1.createCell(0);
        cell1.setCellValue("Datos del cliente");
        cell1.setCellStyle(headerStyle);

        Row row2 = sheet.createRow(1);
        row2.createCell(0).setCellValue("Nombre");
        row2.createCell(1).setCellValue(venta.getDatos_cliente());

        Row row3 = sheet.createRow(2);
        row3.createCell(0).setCellValue("DNI");
        row3.createCell(1).setCellValue(venta.getDni_cliente());

        Row row4 = sheet.createRow(3);
        row4.createCell(0).setCellValue("Email");
        row4.createCell(1).setCellValue(venta.getEmail_cliente());

        Row row5 = sheet.createRow(4);
        Cell cell2 = row5.createCell(0);
        cell2.setCellValue("Datos de la venta");
        cell2.setCellStyle(greenStyle);

        Row row6 = sheet.createRow(5);
        row6.createCell(0).setCellValue("Código de venta");
        row6.createCell(1).setCellValue(venta.getId_venta());

        Row row7 = sheet.createRow(6);
        row7.createCell(0).setCellValue("Fecha");
        row7.createCell(1).setCellValue(venta.getFecha_venta().toString());

        Row row8 = sheet.createRow(7);
        row8.createCell(0).setCellValue("Descripción");
        row8.createCell(1).setCellValue(venta.getDescripcion());

        Row row9 = sheet.createRow(8);
        row9.createCell(0).setCellValue("Tipo de pago");
        row9.createCell(1).setCellValue(venta.getTipo_pago());

        Row row10 = sheet.createRow(9);
        Cell cell3 = row10.createCell(0);
        cell3.setCellValue("Detalle de la venta");
        cell3.setCellStyle(yellowStyle);

        Row row11 = sheet.createRow(10);
        row11.createCell(0).setCellValue("Código");
        row11.createCell(1).setCellValue("Nombre");
        row11.createCell(2).setCellValue("Cantidad");
        row11.createCell(3).setCellValue("Precio Unitario");
        row11.createCell(4).setCellValue("Subtotal");

        int rowNum = 11;
        for (DetalleVenta item : venta.getItemsVenta()) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(item.getProducto().getSku_prod());
            row.createCell(1).setCellValue(item.getProducto().getNom_prod());
            row.createCell(2).setCellValue(item.getCantidad());
            row.createCell(3).setCellValue(item.getProducto().getVenta());
            row.createCell(4).setCellValue(item.calcularImporte());
        }

        Row rowTotal = sheet.createRow(rowNum);
        rowTotal.createCell(0).setCellValue("Total");
        rowTotal.createCell(4).setCellValue(venta.getTotal());

        for (int i = 0; i <= 4; i++) {
            sheet.autoSizeColumn(i);
        }

        workbook.write(outputStream);
        workbook.close();

        return outputStream.toByteArray();
    }


}
