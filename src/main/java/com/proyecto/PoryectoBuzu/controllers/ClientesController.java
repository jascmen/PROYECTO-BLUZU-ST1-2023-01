package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.ClienteDao;
import com.proyecto.PoryectoBuzu.dao.SendMail;
import com.proyecto.PoryectoBuzu.models.Clientes;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientesController {

    @Autowired
    private ClienteDao clienteDao;

    SendMail sendamail = new SendMail();

    @RequestMapping(value = "api/clientes", method = RequestMethod.POST)
    public void registrarCLiente(@RequestBody Clientes cliente){

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, cliente.getPassword());
        cliente.setPassword(hash);

        clienteDao.registrarCLiente(cliente);

        sendamail.enviarCorreo(cliente.getEmail());
    }


}


