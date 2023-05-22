package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.CategoriaProd;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Repository
@Transactional
public class CategProductDaoImp  implements  CategProductoDao {




    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<CategoriaProd> getCategoriasProductos() {
        String query = "From CategoriaProd";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id_categ_prod) {
        CategoriaProd categoriaProd = entityManager.find(CategoriaProd.class, id_categ_prod);
        entityManager.remove(categoriaProd);
    }

    @Override
    public void registrarCate(CategoriaProd categProd) {
        entityManager.merge(categProd);

    }


    @Override
    public void editarCategProduct(Long idCategProd, CategoriaProd categProd) {
        // Obtener el proveedor existente de la base de datos usando el idCategProd
        CategoriaProd categProdExists = entityManager.find(CategoriaProd.class, idCategProd);

        // Actualizar los datos de la categoria existente con los valores de la categoria recibida
        categProdExists.setName_categ_prod(categProd.getName_categ_prod());
        categProdExists.setDescrip_categ_pro(categProd.getDescrip_categ_pro());
        categProdExists.setRutimg_categ_prd(categProd.getRutimg_categ_prd());

        registrarCate(categProdExists);
    }

    /*
    public static void crearCarpeta(Long id_Categoria) {
        String carpetaNombre = String.valueOf(id_Categoria);
        String ruta = "src/main/resources/static/images/Categorias/" + carpetaNombre;
        File carpeta = new File(ruta);
        carpeta.mkdirs();
        String nuevaruta = "images/Categorias/" + carpetaNombre;

    }
    */

    @Override
    public CategoriaProd obtenerDatosCategProd(Long idCategProd) {
        CategoriaProd categoria = entityManager.find(CategoriaProd.class, idCategProd);
        return categoria;
    }


}
