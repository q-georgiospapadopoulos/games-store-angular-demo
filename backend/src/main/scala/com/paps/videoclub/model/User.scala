package com.paps.videoclub.model

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import scala.beans.BeanProperty

@Document(indexName = "users")
class User {

  @Id
  @BeanProperty
  var userId: String = _

  @BeanProperty
  var fullName: String = _

  @BeanProperty
  var email: String = _

  @BeanProperty
  var password: String = _
}
