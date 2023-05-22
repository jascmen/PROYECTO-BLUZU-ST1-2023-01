package com.proyecto.PoryectoBuzu.dao;

import com.proyecto.PoryectoBuzu.models.CategoriaEmp;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class CategproaEmpDaoImp  implements  CategoriaEmpDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<CategoriaEmp> getCategoriasEmp() {
        String query = "From CategoriaEmp";
        return entityManager.createQuery(query).getResultList();
    }
}
