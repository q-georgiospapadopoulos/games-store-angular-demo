package com.paps.videoclub.model

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.{Document, Field, FieldType}
import scala.beans.BeanProperty

@Document(indexName = "games")
class Game {

  @Id
  @BeanProperty
  var id: String = _

  @BeanProperty
  @Field(name = "name", `type` = FieldType.Text)
  var name: String = _

  @BeanProperty
  @Field(name = "genre", `type` = FieldType.Text)
  var genre: String = _

  @BeanProperty
  @Field(name = "platform", `type` = FieldType.Text)
  var platform: String = _

  @BeanProperty
  @Field(name = "eu_sales", `type` = FieldType.Float)
  var euSales: java.lang.Double = _   // must be boxed type for nullable values

  @BeanProperty
  @Field(name = "na_sales", `type` = FieldType.Float)
  var naSales: java.lang.Double = _

  @BeanProperty
  @Field(name = "jp_sales", `type` = FieldType.Float)
  var jpSales: java.lang.Double = _

  @BeanProperty
  @Field(name = "other_sales", `type` = FieldType.Float)
  var otherSales: java.lang.Double = _

  @BeanProperty
  @Field(name = "global_sales", `type` = FieldType.Float)
  var globalSales: java.lang.Double = _

  @BeanProperty
  @Field(name = "publisher", `type` = FieldType.Text)
  var publisher: String = _

  @BeanProperty
  @Field(name = "rank", `type` = FieldType.Long)
  var rank: java.lang.Long = _

  @BeanProperty
  @Field(name = "year", `type` = FieldType.Long)
  var year: java.lang.Long = _
}
