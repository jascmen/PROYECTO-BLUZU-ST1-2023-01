package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.ProveedorDao;
import com.proyecto.PoryectoBuzu.models.Proveedor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProveedorController {

    @Autowired
    private ProveedorDao proveedorDao;

    @RequestMapping(value = "api/proveedores", method = RequestMethod.GET)
    public List<Proveedor> getProveedores() {
        return proveedorDao.getProveedores();
    }

    @RequestMapping(value = "api/proveedores/{id_proveedor}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable Long id_proveedor){
       proveedorDao.eliminar(id_proveedor);
    }

    @RequestMapping(value = "api/proveedores", method = RequestMethod.POST)
    public void registrarProveedor(@RequestBody Proveedor proveedor) {
         proveedorDao.registrarProveedor(proveedor);
    }
}
