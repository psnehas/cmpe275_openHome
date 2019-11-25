package com.testproject.springsecurityjpamysql.dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import com.testproject.springsecurityjpamysql.model.UserProfile;

public class JPAUserProfileDao implements UserProfileDao {

	private EntityManagerFactory entityManagerFactory;
	
	public JPAUserProfileDao() {
		entityManagerFactory = Persistence.createEntityManagerFactory("UserProfile");
		
	}
	@Override
	public void insert(UserProfile user) {
		EntityManager mgr = entityManagerFactory.createEntityManager();
		EntityTransaction trx = mgr.getTransaction();
		
		try {
			trx.begin();
			mgr.merge(user);
			trx.commit();
		}
		catch(RuntimeException e)  {
			trx.rollback();
			throw e;
		}
		finally {
			mgr.close();
		}
		
	}

}
