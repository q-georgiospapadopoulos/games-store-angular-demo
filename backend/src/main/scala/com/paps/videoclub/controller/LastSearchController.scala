package com.paps.videoclub.controller

import org.springframework.web.bind.annotation._
import org.springframework.beans.factory.annotation.Autowired
import com.paps.videoclub.repository.LastSearchRepository
import com.paps.videoclub.model.LastSearch
import java.util

@RestController
@RequestMapping(Array("/api/lastsearches"))
class LastSearchController @Autowired()(private val lastSearchRepo: LastSearchRepository) {

  /** GET /api/lastsearches/{userId} → fetch all searches of a user */
  @GetMapping(Array("/{userId}"))
  def getLastSearches(@PathVariable userId: String): util.List[LastSearch] = {
    lastSearchRepo.findByUserId(userId)
  }

  /** POST /api/lastsearches → add a new search */
  @PostMapping
  def addLastSearch(@RequestBody lastSearch: LastSearch): LastSearch = {
    lastSearchRepo.save(lastSearch)
  }

  /** DELETE /api/lastsearches/{userId}/{searchId} → delete a search */
  @DeleteMapping(Array("/{userId}/{searchId}"))
  def deleteLastSearch(@PathVariable userId: String, @PathVariable searchId: String): Unit = {
    lastSearchRepo.deleteByUserIdAndSearchId(userId, searchId)
  }
}
