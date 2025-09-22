package com.paps.videoclub.model

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import scala.beans.BeanProperty

@Document(indexName = "last-searches")
class LastSearch {

  @Id
  @BeanProperty
  var searchId: String = _

  @BeanProperty
  var userId: String = _

  @BeanProperty
  var query: String = _

  @BeanProperty
  var timestamp: Long = _
}
