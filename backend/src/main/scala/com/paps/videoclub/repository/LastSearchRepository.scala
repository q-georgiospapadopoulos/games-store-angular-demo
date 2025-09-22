package com.paps.videoclub.repository

import com.paps.videoclub.model.LastSearch
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Repository
import java.util

@Repository
trait LastSearchRepository extends ElasticsearchRepository[LastSearch, String] {

  // Find all last searches of a given user
  def findByUserId(userId: String): util.List[LastSearch]

  // Delete a specific last search by userId + searchId
  def deleteByUserIdAndSearchId(userId: String, searchId: String): Unit

  // Add or update a last search document
  def save(lastSearch: LastSearch): LastSearch
}
