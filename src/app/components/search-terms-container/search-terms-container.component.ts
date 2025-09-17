import { Component } from '@angular/core';
import { SearchTermComponent } from '../search-term/search-term.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-terms-container',
  standalone: true,
  imports: [SearchTermComponent, CommonModule],
  templateUrl: './search-terms-container.component.html',
  styleUrl: './search-terms-container.component.scss',
})
export class SearchTermsContainerComponent {
  searchTerms: any[] = [{}]; // Start with one search term

  addSearchTerm() {
    this.searchTerms.push({});
  }

  removeSearchTerm(index: number) {
    if (this.searchTerms.length > 1) {
      this.searchTerms.splice(index, 1);
    }
  }

  onActionClick(index: number) {
    if (index === 0) {
      // First item has plus icon - add new search term
      this.addSearchTerm();
    } else {
      // Other items have delete icon - remove search term
      this.removeSearchTerm(index);
    }
  }
}
