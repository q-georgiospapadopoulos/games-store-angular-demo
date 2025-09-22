package com.paps.videoclub.service

import org.springframework.stereotype.Service
import org.springframework.beans.factory.annotation.Autowired
import com.paps.videoclub.query.EsQueryBuilder
import org.slf4j.{Logger, LoggerFactory}
import scala.collection.JavaConverters._
import co.elastic.clients.elasticsearch.ElasticsearchClient
import java.io.StringReader

@Service
class GameService @Autowired()(private val client: ElasticsearchClient) {

  private val logger: Logger = LoggerFactory.getLogger(classOf[GameService])

  /**
    * Run a search query built from a JSON query object.
    * Schema-agnostic: returns List[Map[String, Any]]
    */
  def search(queryJson: String): List[Map[String, Any]] = {
    EsQueryBuilder.build(queryJson) match {
      case Right(esQuery) =>
        logger.info(s"Generated ES query: $esQuery")

        val response = client.search(
          _.index("games")
            .withJson(new StringReader(esQuery))
            .size(1000), // default 1000 results
          classOf[java.util.Map[String, Any]]
        )

        response.hits().hits().asScala.toList.map { hit =>
          Option(hit.source()).map(_.asScala.toMap).getOrElse(Map.empty)
        }

      case Left(error) =>
        throw new IllegalArgumentException(s"Invalid query JSON: $error")
    }
  }

  /**
    * Fetch all field names from the mappings of the "games" index.
    */
  def getMappings(): Map[String, Any] = {
    val response = client.indices().getMapping(_.index("games"))

    val mappings = response.result().get("games").mappings().properties()

    val fieldNames: Seq[String] = mappings.keySet().asScala.toSeq
    Map(
      "fieldCount" -> fieldNames.size,
      "fields" -> fieldNames.asJava
    )
  }
}
