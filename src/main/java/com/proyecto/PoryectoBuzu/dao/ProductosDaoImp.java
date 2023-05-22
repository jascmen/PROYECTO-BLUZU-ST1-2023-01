package com.proyecto.PoryectoBuzu.dao;


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
    public void eliminarProducto(Long id_producto) {
        Productos producto = entityManager.find(Productos.class, id_producto);

        String nombreImagen = producto.getImg_prod();

        String rutaAbsoluta = "C://Productos//recursitos";
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
}
