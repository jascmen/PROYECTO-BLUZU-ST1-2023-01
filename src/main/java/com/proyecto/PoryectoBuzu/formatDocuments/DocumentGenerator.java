package com.proyecto.PoryectoBuzu.formatDocuments;


import com.aspose.cells.*;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.pdf.*;
import com.proyecto.PoryectoBuzu.dao.VentasDao;
import com.proyecto.PoryectoBuzu.models.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.CategoryAxis;
import org.jfree.chart.labels.StandardCategoryItemLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PiePlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.BarRenderer;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.general.DefaultPieDataset;


import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Random;

import static com.lowagie.text.Font.BOLD;


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

    public byte[] generarPDFTabla(List<ProductoMasVendido> listaVenta) throws DocumentException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);

        document.open();

        // Crear tabla
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);

        // Agregar título
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BOLD);
        PdfPCell cellTitle = new PdfPCell(new Phrase("Productos Top con más ventas", titleFont));
        cellTitle.setBackgroundColor(new Color(145, 199, 242)); // azulito
        cellTitle.setHorizontalAlignment(Element.ALIGN_CENTER);
        cellTitle.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cellTitle.setPadding(10);
        cellTitle.setColspan(2);
        table.addCell(cellTitle);

        // Agregar encabezados de columna
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
        PdfPCell cellNombre = new PdfPCell(new Phrase("Nombre", headerFont));
        PdfPCell cellCantidad = new PdfPCell(new Phrase("Cantidad", headerFont));
        cellNombre.setBackgroundColor(new Color(195, 230, 203)); // Color verde claro
        cellNombre.setHorizontalAlignment(Element.ALIGN_CENTER);
        cellNombre.setPadding(5);
        cellCantidad.setBackgroundColor(new Color(195, 230, 203)); // Color verde claro
        cellCantidad.setHorizontalAlignment(Element.ALIGN_CENTER);
        cellCantidad.setPadding(5);
        table.addCell(cellNombre);
        table.addCell(cellCantidad);

        // Agregar filas de datos
        Font dataFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
        dataFont.setColor(Color.BLACK);

        for (ProductoMasVendido producto : listaVenta) {
            PdfPCell cellProducto = new PdfPCell(new Phrase(producto.getNombre(), dataFont));
            PdfPCell cellCantidadVendida = new PdfPCell(new Phrase(String.valueOf(producto.getCantidad()), dataFont));
            cellProducto.setHorizontalAlignment(Element.ALIGN_CENTER);
            cellProducto.setPadding(5);
            cellCantidadVendida.setHorizontalAlignment(Element.ALIGN_CENTER);
            cellCantidadVendida.setPadding(5);
            table.addCell(cellProducto);
            table.addCell(cellCantidadVendida);
        }

        // Agregar tabla al documento
        document.add(table);

        document.close();
        writer.close();

        return outputStream.toByteArray();
    }


    public byte[] generarExcelTabla(List<ProductoMasVendido> listaVenta) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Productos Top");

        // Establecer estilo para el título
        CellStyle titleStyle = workbook.createCellStyle();
        titleStyle.setFillForegroundColor(IndexedColors.LIGHT_TURQUOISE.getIndex());
        titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        titleStyle.setAlignment(HorizontalAlignment.CENTER);
        titleStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        XSSFFont titleFont = ((XSSFWorkbook) workbook).createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 16);
        titleStyle.setFont(titleFont);

        // Establecer estilo para los encabezados de columna
        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        XSSFFont headerFont = ((XSSFWorkbook) workbook).createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 12);
        headerStyle.setFont(headerFont);

        // Establecer estilo para los datos
        CellStyle dataStyle = workbook.createCellStyle();
        dataStyle.setAlignment(HorizontalAlignment.CENTER);
        XSSFFont dataFont = ((XSSFWorkbook) workbook).createFont();
        dataFont.setFontHeightInPoints((short) 12);
        dataStyle.setFont(dataFont);

        // Crear fila para el título
        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("Productos Top con más ventas");
        titleCell.setCellStyle(titleStyle);
        titleRow.setHeight((short) -1); // Ajuste automático de altura de fila

        // Combinar celdas para el título
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));

        // Crear fila para los encabezados de columna
        Row headerRow = sheet.createRow(1);
        Cell nombreHeaderCell = headerRow.createCell(0);
        nombreHeaderCell.setCellValue("Nombre");
        nombreHeaderCell.setCellStyle(headerStyle);
        Cell cantidadHeaderCell = headerRow.createCell(1);
        cantidadHeaderCell.setCellValue("Cantidad");
        cantidadHeaderCell.setCellStyle(headerStyle);

        // Agregar filas de datos
        int rowIndex = 2;
        for (ProductoMasVendido producto : listaVenta) {
            Row dataRow = sheet.createRow(rowIndex++);
            Cell nombreCell = dataRow.createCell(0);
            nombreCell.setCellValue(producto.getNombre());
            nombreCell.setCellStyle(dataStyle);
            Cell cantidadCell = dataRow.createCell(1);
            cantidadCell.setCellValue(producto.getCantidad());
            cantidadCell.setCellStyle(dataStyle);
        }

        // Autoajustar el ancho de las columnas
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);

        // Guardar el libro de trabajo en un flujo de bytes
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream.toByteArray();
    }

    public byte[] generarPdfPastel(List<CategoriaVendida> listaVenta) throws IOException, DocumentException {
        Document document = new Document();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);

        document.open();

        // Título
        Paragraph title = new Paragraph("Productos Vendidos Según Categoría", new Font(Font.HELVETICA, 16, Font.BOLD));
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        // Crear dataset para el gráfico de pastel
        DefaultPieDataset dataset = new DefaultPieDataset();
        for (CategoriaVendida categoria : listaVenta) {
            dataset.setValue(categoria.getCategoria() + " (" + categoria.getCantidad() + ")", categoria.getCantidad());
        }

        // Crear gráfico de pastel
        JFreeChart chart = ChartFactory.createPieChart("Cantidad por categoría", dataset, false, false, false);
        PiePlot plot = (PiePlot) chart.getPlot();

        // Configurar colores aleatorios para cada porción
        Random random = new Random();
        for (Object key : dataset.getKeys()) {
            Color color = new Color(random.nextInt(256), random.nextInt(256), random.nextInt(256));
            plot.setSectionPaint((Comparable) key, color);
        }

        // Convertir gráfico a imagen y agregarla al PDF
        int width = 500; // Ancho de la imagen del gráfico
        int height = 300; // Alto de la imagen del gráfico
        ByteArrayOutputStream chartOutputStream = new ByteArrayOutputStream();
        ChartUtilities.writeChartAsPNG(chartOutputStream, chart, width, height);

        Image chartImage = Image.getInstance(chartOutputStream.toByteArray());
        document.add(chartImage);

        document.close();
        writer.close();

        return outputStream.toByteArray();
    }

    public byte[] generarExcelPastel(List<CategoriaVendida> listaVenta) throws Exception {
        // Crear un nuevo Workbook
        com.aspose.cells.Workbook workbook = new com.aspose.cells.Workbook(FileFormatType.XLSX);

        // Obtener la referencia de la primera hoja de cálculo
        Worksheet worksheet = workbook.getWorksheets().get(0);

        // Agregar los datos de categoría y valor a las celdas
        for (int i = 0; i < listaVenta.size(); i++) {
            CategoriaVendida categoria = listaVenta.get(i);
            worksheet.getCells().get(i + 1, 0).putValue(categoria.getCategoria());
            worksheet.getCells().get(i + 1, 1).putValue(categoria.getCantidad());
        }

        // Calcular la suma total de las cantidades
        double totalCantidad = 0;
        for (CategoriaVendida categoria : listaVenta) {
            totalCantidad += categoria.getCantidad();
        }

        // Agregar un gráfico de pastel a la hoja de cálculo
        int chartIndex = worksheet.getCharts().add(ChartType.PIE, 5, 0, 15, 5);

        // Acceder a la instancia del gráfico recién agregado
        Chart chart = worksheet.getCharts().get(chartIndex);

        // Crear una serie de datos para el gráfico de pastel
        SeriesCollection series = chart.getNSeries();
        series.add("B2:B" + (listaVenta.size() + 1), true);
        series.setCategoryData("A2:A" + (listaVenta.size() + 1));


        // Guardar el archivo Excel en un flujo de bytes
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.save(outputStream, SaveFormat.XLSX);
        workbook.dispose();

        return outputStream.toByteArray();
    }

    public byte[] generarPdfBarras(List<CategoriaVendida> listaVenta) throws IOException, DocumentException {
        Document document = new Document(PageSize.A4.rotate());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);
        document.open();

        // Crear el dataset con los valores de las barras
        DefaultCategoryDataset dataset = new DefaultCategoryDataset();
        for (CategoriaVendida categoria : listaVenta) {
            dataset.addValue(categoria.getTotalVenta(), "Cantidad Vendida", categoria.getCategoria());
        }

        // Crear el gráfico de barras
        JFreeChart chart = ChartFactory.createBarChart(
                "Gráfico de Barras: Cantidades Vendidas por categorías",  // Título del gráfico
                "Categorías",         // Etiqueta del eje X
                "Total",              // Etiqueta del eje Y
                dataset,              // Datos del gráfico
                PlotOrientation.VERTICAL,
                true,
                true,
                false
        );

        // Personalizar la apariencia del gráfico
        chart.setBackgroundPaint(new Color(255, 255, 255));  // Fondo blanco
        chart.getTitle().setPaint(new Color(0, 0, 0));        // Título en negro

        CategoryPlot plot = chart.getCategoryPlot();
        BarRenderer renderer = (BarRenderer) plot.getRenderer();
        renderer.setItemLabelGenerator(new StandardCategoryItemLabelGenerator()); // Mostrar etiquetas de los valores
        renderer.setItemLabelsVisible(true); // Hacer que las etiquetas sean visibles

        CategoryAxis domainAxis = plot.getDomainAxis();
        domainAxis.setCategoryMargin(0.05); // Ajustar el margen entre categorías
        domainAxis.setUpperMargin(0.1);

        // Convertir el gráfico a una imagen y agregarlo al PDF
        ByteArrayOutputStream chartOutputStream = new ByteArrayOutputStream();
        ChartUtilities.writeChartAsPNG(chartOutputStream, chart, 800, 450);
        com.lowagie.text.Image chartImage = com.lowagie.text.Image.getInstance(chartOutputStream.toByteArray());
        chartImage.setWidthPercentage(document.getPageSize().getWidth() - document.leftMargin() - document.rightMargin());
        document.add(chartImage);

        document.close();
        writer.close();

        return outputStream.toByteArray();
    }



    public byte[] generarExcelBarras(List<CategoriaVendida> listaVenta) throws Exception {
        com.aspose.cells.Workbook workbook = new com.aspose.cells.Workbook();
        Worksheet sheet = workbook.getWorksheets().get(0);

        Cells cells = sheet.getCells();
        cells.get("A1").putValue("Categoría");
        cells.get("B1").putValue("Total");

        for (int i = 0; i < listaVenta.size(); i++) {
            CategoriaVendida categoria = listaVenta.get(i);
            cells.get(i + 1, 0).putValue(categoria.getCategoria());
            cells.get(i + 1, 1).putValue(categoria.getTotalVenta());
        }

        ChartCollection charts = sheet.getCharts();
        int chartIndex = charts.add(ChartType.COLUMN, 3, 1, 20, 10);
        Chart chart = charts.get(chartIndex);

        int dataStartRow = 1;
        int dataEndRow = listaVenta.size();
        String categoryDataRange = "A2:A" + (dataEndRow + 1);
        String valueDataRange = "B2:B" + (dataEndRow + 1);

        SeriesCollection seriesCollection = chart.getNSeries();
        seriesCollection.add(valueDataRange, true);
        seriesCollection.setCategoryData(categoryDataRange);

        chart.getTitle().setText("Gráfico de Barras: Ventas por categorías");

        // Guardar el archivo de Excel en un ByteArrayOutputStream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.save(outputStream, SaveFormat.XLSX);
        workbook.dispose();

        return outputStream.toByteArray();
    }

    public byte[] generarPdfLineas(List<VentasCompletadas> ventasCompletadas) throws IOException, DocumentException {
        Document document = new Document(PageSize.A4.rotate());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);
        document.open();

        // Crear el dataset con los valores de las ventas completadas
        DefaultCategoryDataset dataset = new DefaultCategoryDataset();
        for (VentasCompletadas venta : ventasCompletadas) {
            dataset.addValue(venta.getCantidad(), "Total Ventas", venta.getSemana());
        }

        // Crear el gráfico de líneas
        JFreeChart chart = ChartFactory.createLineChart(
                "Gráfico de Líneas: Ventas Completadas por Categoría", // Título del gráfico
                "Semana", // Etiqueta del eje X
                "Cantidad", // Etiqueta del eje Y
                dataset, // Datos del gráfico
                PlotOrientation.VERTICAL,
                true,
                true,
                false
        );

        // Personalizar la apariencia del gráfico
        chart.setBackgroundPaint(new Color(255, 255, 255)); // Fondo blanco
        chart.getTitle().setPaint(new Color(0, 0, 0)); // Título en negro

        // Convertir el gráfico a una imagen y agregarlo al PDF
        ByteArrayOutputStream chartOutputStream = new ByteArrayOutputStream();
        ChartUtilities.writeChartAsPNG(chartOutputStream, chart, 800, 450);
        com.lowagie.text.Image chartImage = com.lowagie.text.Image.getInstance(chartOutputStream.toByteArray());
        chartImage.setWidthPercentage(document.getPageSize().getWidth() - document.leftMargin() - document.rightMargin());
        document.add(chartImage);

        // Crear la tabla y agregar el contenido
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);

        // Agregar el contenido a la tabla
        for (VentasCompletadas venta : ventasCompletadas) {
            table.addCell("Semana: " + venta.getSemana());
            table.addCell("Cantidad: " + venta.getCantidad());
        }

        // Agregar la tabla al documento
        document.add(table);

        document.close();
        writer.close();

        return outputStream.toByteArray();
    }

    public byte[] generarExcelLineas(List<VentasCompletadas> ventasCompletadas) throws Exception {
        com.aspose.cells.Workbook workbook = new com.aspose.cells.Workbook();
        Worksheet sheet = workbook.getWorksheets().get(0);

        Cells cells = sheet.getCells();
        cells.get("A1").putValue("Semana");
        cells.get("B1").putValue("Cantidad");

        for (int i = 0; i < ventasCompletadas.size(); i++) {
            VentasCompletadas venta = ventasCompletadas.get(i);
            cells.get(i + 1, 0).putValue(venta.getSemana());
            cells.get(i + 1, 1).putValue(venta.getCantidad());
        }

        // Crear el gráfico de líneas
        int chartIndex = sheet.getCharts().add(ChartType.LINE, 0, 3, 20, 15);
        Chart chart = sheet.getCharts().get(chartIndex);

        int dataStartRow = 1;
        int dataEndRow = ventasCompletadas.size() + 1;

        // Establecer los datos de valores
        String valueDataRange = "B" + dataStartRow + ":B" + dataEndRow;
        chart.getNSeries().add(valueDataRange, true);

        // Establecer los datos de categoría
        String categoryDataRange = "A" + dataStartRow + ":A" + dataEndRow;
        chart.getNSeries().setCategoryData(categoryDataRange);

        // Ajustar las etiquetas del eje X
        chart.getCategoryAxis().setTickLabelSpacing(1);
        chart.getCategoryAxis().setTickLabelPosition(TickLabelPositionType.LOW);

        // Cambiar el nombre de la serie
        chart.getNSeries().get(0).setName("Ventas");

        chart.getTitle().setText("Gráfico de Líneas: Ventas Completadas por Categoría");

        // Guardar el archivo de Excel en un ByteArrayOutputStream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.save(outputStream, SaveFormat.XLSX);
        workbook.dispose();

        return outputStream.toByteArray();
    }

}
