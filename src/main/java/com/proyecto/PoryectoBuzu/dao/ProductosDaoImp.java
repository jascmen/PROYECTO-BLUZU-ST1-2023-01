package com.proyecto.PoryectoBuzu.dao;


import com.proyecto.PoryectoBuzu.models.Errores;
import com.proyecto.PoryectoBuzu.models.Productos;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;

@Repository
@Transactional
public class ProductosDaoImp implements  ProductosDao{

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<Productos> getProductos() {
        String query ="From Productos";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<Productos> getProductosPorNombre(String nombre) {
        String query = "FROM Productos p WHERE p.nom_prod LIKE CONCAT('%', :nombre, '%')";
        return entityManager.createQuery(query)
                .setParameter("nombre", nombre)
                .getResultList();
    }


    @Override
    public void eliminarProducto(Long id_producto) {
        Productos producto = entityManager.find(Productos.class, id_producto);

        String nombreImagen = producto.getImg_prod();

        String rutaAbsoluta = "images//Productos//";
        String rutaImagen = rutaAbsoluta + "//" + nombreImagen;
        File archivoImagen = new File(rutaImagen);
        archivoImagen.delete();

        entityManager.remove(producto);

    }

    @Override
    public void registrarProducto(Productos producto) {
        entityManager.merge(producto);
    }

    @Override
    public void editarProducto(Productos producto) {
        registrarProducto(producto);

    }

    @Override
    public Productos obtenerDatosProducto(Long id_producto) {
        Productos producto = entityManager.find(Productos.class, id_producto);
        return producto;
    }


    @Override
    public String verificarCodigo(String sku) {
        List<Productos> productos = entityManager.createQuery("FROM Productos").getResultList();

        for (Productos producto : productos) {
            if (sku.equals(producto.getSku_prod())) {
                return "FAIL";
            }
        }

        return "OK";
    }


    @Override
    public Boolean verificarVacio(Errores errores) {
        if (errores.getNombre() != null && !errores.getNombre().isEmpty()) {
            return false;
        }
        if (errores.getApellido() != null && !errores.getApellido().isEmpty()) {
            return false;
        }
        if (errores.getEmail() != null && !errores.getEmail().isEmpty()) {
            return false;
        }
        if (errores.getCodigoSKU() != null) {
            return false;
        }
        if (errores.getImagen() != null) {
            return false;
        }
        if (errores.getDescripcion() != null && !errores.getDescripcion().isEmpty()) {
            return false;
        }
        if (errores.getResumen() != null && !errores.getResumen().isEmpty()) {
            return false;
        }
        if (errores.getDescuento() != null) {
            return false;
        }
        if (errores.getCantidad() != null) {
            return false;
        }
        if (errores.getPrecioCompra() != null) {
            return false;
        }
        if (errores.getProveedor() != null && !errores.getProveedor().isEmpty()) {
            return false;
        }
        if (errores.getCategoria() != null && !errores.getCategoria().isEmpty()) {
            return false;
        }
        return true;
    }
}
