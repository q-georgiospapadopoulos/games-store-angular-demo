package com.paps.videoclub.controller

import org.springframework.web.bind.annotation._
import org.springframework.beans.factory.annotation.Autowired
import com.paps.videoclub.repository.UserRepository
import com.paps.videoclub.model.User
import java.util.Optional

@RestController
@RequestMapping(Array("/api/users"))
class UserController @Autowired()(private val userRepo: UserRepository) {

  /** POST /api/users/login → authenticate by email + password */
  @PostMapping(Array("/login"))
  def login(@RequestBody loginRequest: Map[String, String]): User = {
    val email = loginRequest("email")
    val password = loginRequest("password")

    val user = userRepo.findByEmail(email)
    if (user != null && user.password == password) {
      user
    } else {
      throw new RuntimeException("Invalid credentials")
    }
  }

  /** POST /api/users → add a new user */
  @PostMapping
  def createUser(@RequestBody user: User): User = {
    userRepo.save(user)
  }
}
