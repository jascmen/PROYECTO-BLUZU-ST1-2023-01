package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.CategProductoDao;
import com.proyecto.PoryectoBuzu.models.CategoriaProd;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class CategoriaProductoController {

    @Autowired
    private CategProductoDao categProdctDao;

    @RequestMapping(value = "api/categorias", method = RequestMethod.GET)
    public List<CategoriaProd> getCategoriasProductos() {
        return categProdctDao.getCategoriasProductos();
    }

    @RequestMapping(value = "api/categorias/{id_categ_prod}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable Long id_categ_prod){
        categProdctDao.eliminar(id_categ_prod);
    }

    @RequestMapping(value = "api/categorias", method = RequestMethod.POST)
    public void registrarCategProd(@RequestBody CategoriaProd categoria){
        categProdctDao.registrarCate(categoria);
    }



    @RequestMapping(value = "api/categorias/{id_categ_prod}", method = RequestMethod.PUT)
    public void editarCategProd(@PathVariable Long id_categ_prod, @RequestBody CategoriaProd categoriaProd){
        categProdctDao.editarCategProduct(id_categ_prod, categoriaProd);
    }

    @RequestMapping(value = "api/categorias/{id_categ_prod}", method = RequestMethod.GET)
    public CategoriaProd obtenerCategProd(@PathVariable Long id_categ_prod){
        return categProdctDao.obtenerDatosCategProd(id_categ_prod);
    }

}
