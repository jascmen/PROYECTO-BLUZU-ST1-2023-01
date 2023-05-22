package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.CategoriaEmpDao;
import com.proyecto.PoryectoBuzu.models.CategoriaEmp;
import com.proyecto.PoryectoBuzu.models.CategoriaProd;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoriaEmpController {

    @Autowired
    private CategoriaEmpDao categoriaEmpDao;
    @RequestMapping(value = "api/categoriasEmpleados", method = RequestMethod.GET)
    public List<CategoriaEmp> getCategoriasEmp(){
        return  categoriaEmpDao.getCategoriasEmp();
    }
}
