package com.proyecto.PoryectoBuzu.controllers;

import com.proyecto.PoryectoBuzu.dao.ClienteDao;
import com.proyecto.PoryectoBuzu.models.Clientes;
import com.proyecto.PoryectoBuzu.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
public class AuthController {

    private Set<String> invalidTokens = new HashSet<>();

    @Autowired
    private ClienteDao clienteDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Clientes cliente) {
        Clientes clienteLogueado = clienteDao.obtenerUsuarioPorCredenciales(cliente);
        if (clienteLogueado != null) {
            String tokenJWT = jwtUtil.create(String.valueOf(clienteLogueado.getId_cliente()), clienteLogueado.getEmail());
            return tokenJWT; // Llamar al método adminPage con el token
        }
        return "FAIL";
    }

    @RequestMapping(value = "api/dashboard/{token}", method = RequestMethod.GET)
    public String adminPage(@PathVariable String token) {

        if (jwtUtil.validateToken(token)) {
            Long id = Long.valueOf(jwtUtil.getKey(token));

            if (clienteDao.obtenerRol(id).equals("ADMIN") ) {
                return "dashboard";
            }
        }

        return "FAIL";

    }


    @RequestMapping(value = "api/usuarios/{token}", method = RequestMethod.GET)
    public Clientes obtenerDatos(@PathVariable String token) {

        if (jwtUtil.validateToken(token)) {
            Long id = Long.valueOf(jwtUtil.getKey(token));

            return clienteDao.obtenerDatos(id);

        } else {
            Clientes cliente = new Clientes();
            return  cliente;
        }

    }

}
