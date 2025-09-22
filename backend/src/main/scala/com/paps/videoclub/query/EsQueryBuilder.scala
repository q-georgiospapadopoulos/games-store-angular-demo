package com.paps.videoclub.query

import io.circe._, io.circe.parser._, io.circe.syntax._

object EsQueryBuilder {

  def build(queryJson: String): Either[Error, String] = {
    parse(queryJson).map { json =>
      val cursor = json.hcursor

      val conditions = cursor.downField("conditions").focus.get.asArray.get

      val clauses = conditions.map { cond =>
        val c = cond.hcursor
        val field = c.get[String]("field").getOrElse("")
        val operator = c.get[String]("operator").getOrElse("")
        val value = c.get[String]("value").getOrElse("")

        operator.toLowerCase match {
          case "equals" | "is" =>
            Json.obj("term" -> Json.obj(field -> Json.fromString(value)))

          case "startswith" =>
            Json.obj("wildcard" -> Json.obj(field -> Json.fromString(value.toLowerCase + "*")))

          case "contains" =>
            Json.obj("match" -> Json.obj(field -> Json.fromString(value)))

          case "greater than" =>
            Json.obj("range" -> Json.obj(field -> Json.obj("gt" -> Json.fromDoubleOrNull(value.toDouble))))

          case "less than" =>
            Json.obj("range" -> Json.obj(field -> Json.obj("lt" -> Json.fromDoubleOrNull(value.toDouble))))

          case _ =>
            Json.obj("match_all" -> Json.obj())
        }
      }

      // ✅ Wrap in top-level "query" and add "size"
      Json.obj(
        "size" -> Json.fromInt(1000),
        "query" -> clauses.head
      ).noSpaces
    }
  }
}
