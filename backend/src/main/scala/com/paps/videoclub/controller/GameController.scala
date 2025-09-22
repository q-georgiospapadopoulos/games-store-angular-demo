package com.paps.videoclub.controller

import org.springframework.web.bind.annotation._
import org.springframework.beans.factory.annotation.Autowired
import com.paps.videoclub.service.GameService
import scala.collection.JavaConverters._
import java.util

@RestController
@RequestMapping(Array("/api"))
class GameController @Autowired()(private val gameService: GameService) {

  /** POST /api/search → runs a dynamic search */
  @PostMapping(Array("/search"))
  def search(@RequestBody queryJson: String): java.util.List[java.util.Map[String, Any]] = {
    val results: List[Map[String, Any]] = gameService.search(queryJson)
    results.map(_.asJava).asJava
  }

  /** GET /api/mappings → fetches index mappings (field names + count) */
  @GetMapping(Array("/mappings"))
  def getMappings(): java.util.Map[String, Any] = {
    gameService.getMappings().asJava
  }
}
