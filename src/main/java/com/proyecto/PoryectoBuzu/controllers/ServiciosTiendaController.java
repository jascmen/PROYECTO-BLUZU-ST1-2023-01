package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.ServiciosTiendaDao;
import com.proyecto.PoryectoBuzu.models.ServiciosTienda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public void registrarServicioTienda(@RequestParam("servicioImagen") MultipartFile imagen,
                                        @RequestParam("nombre") String nombre_servicio,
                                        @RequestParam("descripcion") String descripcion){


        if (!imagen.isEmpty()) {
            String folderServicio = "images//Servicios//";
            String nuevoNombreImagen = nombre_servicio.replaceAll(" ","")+ ".jpg";

            try {

                byte[] bytesImg = imagen.getBytes();

                Path rutaCompleta = Paths.get(folderServicio +"//"+nuevoNombreImagen);
                Files.write(rutaCompleta, bytesImg);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

            ServiciosTienda servicio = new ServiciosTienda();
            servicio.setName_servicio(nombre_servicio);
            servicio.setDescrip_servicio(descripcion);
            servicio.setImg_servicio(nuevoNombreImagen);

            serviciosTiendaDao.registrarServicio(servicio);
        }


    }

    @RequestMapping(value = "api/servicios/{id}", method = RequestMethod.PUT)
        public void editarServicioTienda(@PathVariable("id") Long id,
                                         @RequestParam("servicioImagen") MultipartFile imagen,
                                         @RequestParam("nombre") String nombre_servicio,
                                         @RequestParam("descripcion") String descripcion){

        ServiciosTienda servicioExistente = serviciosTiendaDao.obtenerDatosServicio(id);

        String nombreImagen = servicioExistente.getImg_servicio();
        String rutaExistente = "images//Servicios//";

        String rutaImagen = rutaExistente + "//" + nombreImagen;
        File archivoImagen = new File(rutaImagen);
        archivoImagen.delete();


        if (imagen != null && !imagen.isEmpty()) {

            String nuevoNombreImagen = nombre_servicio.replaceAll(" ", "") + ".jpg";

            try {
                Path rutaCompleta = Paths.get(rutaExistente+"//"+nuevoNombreImagen);
                byte[] bytesImg = imagen.getBytes();
                Files.write(rutaCompleta, bytesImg);
                servicioExistente.setImg_servicio(nuevoNombreImagen);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }


        servicioExistente.setName_servicio(nombre_servicio);
        servicioExistente.setDescrip_servicio(descripcion);
        serviciosTiendaDao.editarServicio(id, servicioExistente);
    }

    @RequestMapping(value = "api/servicios/{id_servicio}", method = RequestMethod.GET)
    public ServiciosTienda obtenerDatosServicio(@PathVariable Long id_servicio){
        return serviciosTiendaDao.obtenerDatosServicio(id_servicio);
    }

}
