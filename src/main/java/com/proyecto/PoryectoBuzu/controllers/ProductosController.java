package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.ProductosDao;

import com.proyecto.PoryectoBuzu.models.Productos;
import org.springframework.beans.factory.annotation.Autowired;
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


    @RequestMapping(value = "api/productos", method = RequestMethod.POST)
    public void registrarEmpleado(@RequestParam("productoImagen") MultipartFile imagen,
                                  @RequestParam("sku") String sku,
                                  @RequestParam("nombre") String nombre,
                                  @RequestParam("descripcion") String descripcion,
                                  @RequestParam("cantidad") int cantidad,
                                  @RequestParam("categoria") String categoria,
                                  @RequestParam("precioCompra") double precioCompra,
                                  @RequestParam("precioVenta") double precioVenta,
                                 @RequestParam("descuento") double descuento,
                                  @RequestParam("proveedor") String proveedor) {

        if(!imagen.isEmpty()){


            String rutaAbsoluta = "C://Productos//recursitos";
            String nuevoNombreImagen = nombre.replaceAll(" ","") + ".jpg";

            try {
                byte[] bytesImg = imagen.getBytes();
                Path rutacompleta = Paths.get(rutaAbsoluta + "//"+ nuevoNombreImagen);
                Files.write(rutacompleta, bytesImg);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

            // Crear un objeto Empleado con los demás datos del formulario
            Productos producto = new Productos();
            producto.setNom_prod(nombre);
            producto.setSku_prod(sku);
            producto.setDescrp_prod(descripcion);
            producto.setCantidad_prod(cantidad);
            producto.setCateg_prod(categoria);
            producto.setCompra(precioCompra);
            producto.setVenta(precioVenta);
            producto.setDescuento(descuento);
            producto.setProveedor(proveedor);
            producto.setImg_prod(nuevoNombreImagen);

            productoDao.registrarProducto(producto);

        }


    }

    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.PUT)
    public void editarEmpleado(   @PathVariable("id") Long id,
                                 @RequestParam("productoImagen") MultipartFile imagen,
                                  @RequestParam("sku") String sku,
                                  @RequestParam("nombre") String nombre,
                                  @RequestParam("descripcion") String descripcion,
                                  @RequestParam("cantidad") Integer cantidad,
                                  @RequestParam("categoria") String categoria,
                                  @RequestParam("precioCompra") double precioCompra,
                                  @RequestParam("precioVenta") double precioVenta,
                                  @RequestParam("descuento") double descuento,
                                  @RequestParam("proveedor") String proveedor) {

        Productos productoExistente = productoDao.obtenerDatosProducto(id);

        String nombreImagen = productoExistente.getImg_prod();

        String rutaExistente = "C://Productos//recursos";
        String rutaImagen = rutaExistente + "//" + nombreImagen;
        File archivoImagen = new File(rutaImagen);
        archivoImagen.delete();

        if(imagen != null && !imagen.isEmpty()) {
            // Procesar la nueva imagen solo si se proporciona una imagen válida
            String rutaAbsoluta = "C://Productos//recursos";
            String nuevoNombreImagen = nombre.replaceAll(" ", "")+ ".jpg";

            try {
                byte[] bytesImg = imagen.getBytes();
                Path rutacompleta = Paths.get(rutaAbsoluta + "//" + nuevoNombreImagen);
                Files.write(rutacompleta, bytesImg);
                productoExistente.setImg_prod(nuevoNombreImagen);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        productoExistente.setNom_prod(nombre);
        productoExistente.setSku_prod(sku);
        productoExistente.setDescrp_prod(descripcion);
        productoExistente.setCantidad_prod(cantidad);
        productoExistente.setCateg_prod(categoria);
        productoExistente.setCompra(precioCompra);
        productoExistente.setVenta(precioVenta);
        productoExistente.setDescuento(descuento);
        productoExistente.setProveedor(proveedor);

            productoDao.registrarProducto(productoExistente);

        }


        @RequestMapping(value = "api/productos/{id_empleado}", method = RequestMethod.GET)
    public Productos obtenetrDatosProductps(@PathVariable Long id_empleado){
        return productoDao.obtenerDatosProducto(id_empleado);
        }



    }



