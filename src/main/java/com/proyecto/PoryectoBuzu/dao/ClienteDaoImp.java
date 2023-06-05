package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.Clientes;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class ClienteDaoImp implements ClienteDao {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public void registrarCLiente(Clientes cliente) {
        entityManager.merge(cliente);

    }

    @Override
    public boolean verificarCredenciales(Clientes cliente){
        String query = "FROM Clientes WHERE email = :email";

        List<Clientes> lista = entityManager.createQuery(query)
                .setParameter("email", cliente.getEmail())
                .getResultList();

        if(lista.isEmpty()){
            return false;
        }
        String passwordHashed = lista.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        return argon2.verify(passwordHashed,cliente.getPassword());

    }
}
