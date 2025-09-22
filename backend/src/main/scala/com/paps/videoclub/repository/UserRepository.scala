package com.paps.videoclub.repository

import com.paps.videoclub.model.User
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Repository

@Repository
trait UserRepository extends ElasticsearchRepository[User, String] {

  // Lookup user by email (for login)
  def findByEmail(email: String): User

  // Add or update a user document (built-in save, just making it explicit)
  def save(user: User): User
}
