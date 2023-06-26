package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Clientes;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class ClienteDaoImp implements ClienteDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private HttpServletRequest request;

    @Override
    public void registrarCLiente(Clientes cliente) {
        cliente.setRol("USER");
        entityManager.merge(cliente);

    }

    @Override
    public Clientes obtenerUsuarioPorCredenciales(Clientes cliente){
        String query = "FROM Clientes WHERE email = :email";

        List<Clientes> lista = entityManager.createQuery(query)
                .setParameter("email", cliente.getEmail())
                .getResultList();

        if(lista.isEmpty()){
            return null;
        }
        String passwordHashed = lista.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if( argon2.verify(passwordHashed,cliente.getPassword())){
            return lista.get(0);
        };
        return null;

    }

    @Override
    public boolean verificarCorreo(Clientes cliente) {
        String query = "FROM Clientes WHERE email = :email";

        List<Clientes> resultados = entityManager.createQuery(query, Clientes.class)
                .setParameter("email", cliente.getEmail())
                .getResultList();

        if (resultados.isEmpty()) {
            return true; // El correo no existe en la tabla
        } else {
            return false; // El correo ya existe en la tabla
        }
    }

    @Override
    public String obtenerRol(Long id) {
       Clientes cliente = entityManager.find(Clientes.class, id);
       return  cliente.getRol();
    }

    @Override
    public Clientes obtenerDatos(Long id) {
        Clientes cliente = entityManager.find(Clientes.class, id );
        return cliente;
    }
}
