package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.ProductosDao;

import com.proyecto.PoryectoBuzu.models.Errores;
import com.proyecto.PoryectoBuzu.models.Productos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class ProductosController {




    @Autowired
    private ProductosDao productoDao;

    @RequestMapping(value = "api/productos", method = RequestMethod.GET)
    public List<Productos> getProductos(){
        return productoDao.getProductos();
    }

    @RequestMapping(value = "api/productosNombre/{nombre}", method = RequestMethod.GET)
    public List<Productos> getProductosPorNombre(@PathVariable String nombre){
        return productoDao.getProductosPorNombre(nombre);
    }


    @RequestMapping(value = "api/productos", method = RequestMethod.POST)
    public Errores registrarEmpleado(@RequestParam("productoImagen") MultipartFile imagen,
                                            @RequestParam("sku") String sku,
                                            @RequestParam("nombre") String nombre,
                                            @RequestParam("descripcion") String descripcion,
                                            @RequestParam("cantidad") int cantidad,
                                            @RequestParam("categoria") String categoria,
                                            @RequestParam("precioCompra") double precioCompra,
                                            @RequestParam("descuento") double descuento,
                                            @RequestParam("proveedor") String proveedor,
                                            @RequestParam("resumen_prod") String resumen){

        Errores errores = new Errores();


        if (sku == null) {
            errores.setCodigoSKU("El código SKU es incorrecto");
        }
        if ("FAIL".equals(productoDao.verificarCodigo(sku.toUpperCase()))) {
            errores.setCodigoSKU("El código SKU ya se encuentra registrado");
        }

        errores.setImagen(imagen.isEmpty() ? "Debe seleccionar una imagen" : null);
        errores.setNombre(nombre.isEmpty() ? "Debe ingresar un nombre válido" : null);
        errores.setDescripcion(descripcion.isEmpty() ? "Debe ingresar una descripción válida" : null);
        errores.setCategoria(categoria.isEmpty() ? "Debe ingresar una categoría válida" : null);
        errores.setResumen(resumen.isEmpty() ? "Debe ingresar un resumen válido" : null);
        errores.setProveedor(proveedor.isEmpty() ? "Debe ingresar un proveedor válido" : null);
        errores.setCantidad(cantidad <= 0 ? "La cantidad debe ser mayor que 0" : null);
        errores.setDescuento(descuento <= 0 ? "El descuento debe ser mayor que 0" : (descuento > 90 ? "El descuento no puede superar el 90%" : null));

        if (!productoDao.verificarVacio(errores)) {
            return errores;
        } else {

            String rutaAbsoluta = "images//Productos//";
            String nuevoNombreImagen = sku.toString().replaceAll(" ","") + ".jpg";

            try {
                byte[] bytesImg = imagen.getBytes();
                Path rutacompleta = Paths.get(rutaAbsoluta + "//"+ nuevoNombreImagen);
                Files.write(rutacompleta, bytesImg);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

            double precioVenta = precioCompra -  (precioCompra*descuento/100);

            // Crear un objeto Empleado con los demás datos del formulario
            Productos producto = new Productos();
            producto.setNom_prod(nombre);
            producto.setSku_prod(sku.toUpperCase());
            producto.setDescrp_prod(descripcion);
            producto.setCantidad_prod(cantidad);
            producto.setCateg_prod(categoria);
            producto.setCompra(precioCompra);
            producto.setVenta(precioVenta);
            producto.setDescuento(descuento);
            producto.setProveedor(proveedor);
            producto.setImg_prod(nuevoNombreImagen);
            producto.setResumen_product(resumen);

            productoDao.registrarProducto(producto);
            errores.setExito("OK");

            return errores;
        }


    }

    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.PUT)
    public Errores editarEmpleado(   @PathVariable("id") Long id,
                                 @RequestParam("productoImagen") MultipartFile imagen,
                                  @RequestParam("nombre") String nombre,
                                  @RequestParam("descripcion") String descripcion,
                                  @RequestParam("categoria") String categoria,
                                  @RequestParam("precioCompra") double precioCompra,
                                  @RequestParam("descuento") double descuento,
                                  @RequestParam("proveedor") String proveedor,
                                  @RequestParam("resumen_prod") String resumen) {


        Errores errores = new Errores();

        errores.setImagen(imagen.isEmpty() ? "Debe seleccionar una imagen" : null);
        errores.setNombre(nombre.isEmpty() ? "Debe ingresar un nombre válido" : null);
        errores.setDescripcion(descripcion.isEmpty() ? "Debe ingresar una descripción válida" : null);
        errores.setCategoria(categoria.isEmpty() ? "Debe ingresar una categoría válida" : null);
        errores.setResumen(resumen.isEmpty() ? "Debe ingresar un resumen válido" : null);
        errores.setProveedor(proveedor.isEmpty() ? "Debe ingresar un proveedor válido" : null);
        errores.setDescuento(descuento <= 0 ? "El descuento debe ser mayor que 0" : (descuento > 90 ? "El descuento no puede superar el 90%" : null));


        if (!productoDao.verificarVacio(errores)) {
            return errores;
        } else {

            Productos productoExistente = productoDao.obtenerDatosProducto(id);

            String nombreImagen = productoExistente.getImg_prod();

            String rutaExistente = "images//Productos//";
            String rutaImagen = rutaExistente + "//" + nombreImagen;
            File archivoImagen = new File(rutaImagen);
            archivoImagen.delete();

                String nuevoNombreImagen = productoExistente.getSku_prod() + ".jpg";

                try {
                    byte[] bytesImg = imagen.getBytes();
                    Path rutacompleta = Paths.get(rutaExistente + "//" + nuevoNombreImagen);
                    Files.write(rutacompleta, bytesImg);
                    productoExistente.setImg_prod(nuevoNombreImagen);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }


                double precioVenta = precioCompra - (precioCompra * descuento / 100);

                productoExistente.setNom_prod(nombre);
                productoExistente.setDescrp_prod(descripcion);
                productoExistente.setCateg_prod(categoria);
                productoExistente.setCompra(precioCompra);
                productoExistente.setVenta(precioVenta);
                productoExistente.setDescuento(descuento);
                productoExistente.setProveedor(proveedor);
                productoExistente.setResumen_product(resumen);

                productoDao.editarProducto(productoExistente);
                errores.setExito("OK");

                return errores;

        }
    }


        @RequestMapping(value = "api/productos/{idProd}", method = RequestMethod.GET)
    public Productos obtenetrDatosProductps(@PathVariable Long idProd){
        return productoDao.obtenerDatosProducto(idProd);
        }

    @RequestMapping(value = "api/productos/{idProd}", method = RequestMethod.DELETE)
    public void eliminarProducto(@PathVariable Long idProd){

         productoDao.eliminarProducto(idProd);
    }

    }



