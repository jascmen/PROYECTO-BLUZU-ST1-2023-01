package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.ServiciosTiendaDao;
import com.proyecto.PoryectoBuzu.models.ServiciosTienda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ServiciosTiendaController {

    @Autowired
    private ServiciosTiendaDao serviciosTiendaDao;

    @RequestMapping(value = "api/servicios", method = RequestMethod.GET)
    public List<ServiciosTienda> getServiciosTienda(){
        return serviciosTiendaDao.getServiciosTienda();
    }

    @RequestMapping(value = "api/servicios/{id_servicio}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable Long id_servicio){
        serviciosTiendaDao.eliminar(id_servicio);
    }

    @RequestMapping(value = "api/servicios", method = RequestMethod.POST)
    public void registrarServicioTienda(@RequestBody ServiciosTienda servicioTienda){
        serviciosTiendaDao.registrarServicio(servicioTienda);
    }

    @RequestMapping(value = "api/servicios/{id_servicio}", method = RequestMethod.PUT)
        public void editarServicioTienda(@PathVariable Long id_servicio, @RequestBody ServiciosTienda servicioTienda){
        serviciosTiendaDao.editarServicio(id_servicio, servicioTienda);
    }

    @RequestMapping(value = "api/servicios/{id_servicio}", method = RequestMethod.GET)
    public ServiciosTienda obtenerDatosServicio(@PathVariable Long id_servicio){
        return serviciosTiendaDao.obtenerDatosServicio(id_servicio);
    }

}
