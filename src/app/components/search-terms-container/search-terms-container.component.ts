import { Component, OnInit } from '@angular/core';
import { SearchTermComponent } from '../search-term/search-term.component';
import { CommonModule } from '@angular/common';
import { SearchTerm } from '../../store/search/search.models';
import {
  addRow,
  initWithOneRow,
  removeRow,
} from '../../store/search/search.actions';
import { Store } from '@ngrx/store';
import { selectSearchTerms } from '../../store/search/search.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-search-terms-container',
  standalone: true,
  imports: [SearchTermComponent, CommonModule],
  templateUrl: './search-terms-container.component.html',
  styleUrl: './search-terms-container.component.scss',
})
export class SearchTermsContainerComponent implements OnInit {
  searchTerms: SearchTerm[] = [];

  constructor(private store: Store) {
    console.log('Syncing termss');
    this.store
      .select(selectSearchTerms)
      .pipe(take(1))
      .subscribe((terms) => {
        this.searchTerms = terms;
      });
  }

  ngOnInit() {
    this.store.dispatch(initWithOneRow());
  }

  addSearchTerm() {
    this.store.dispatch(addRow());
    this.searchTerms = [
      ...this.searchTerms,
      { field: '', operator: '', keyword: '' },
    ];
  }

  removeSearchTerm(index: number) {
    if (this.searchTerms.length > 1) {
      this.store.dispatch(removeRow({ index }));
      this.searchTerms = this.searchTerms.filter((_, i) => i !== index);
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
