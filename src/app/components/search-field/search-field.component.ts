import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectFields } from '../../store/app/app.selectors';
import { loadFields } from '../../store/app/app.actions';
import { setField } from '../../store/search/search.actions';
import { selectSearchTermAt } from '../../store/search/search.selectors';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent implements OnInit {
  selectedField: string = '';
  @Input() index!: number; // i-th row
  suggestions: string[] = [];
  filteredSuggestions: string[] = [];

  constructor(private store: Store) {
    this.store.dispatch(loadFields());
  }

  ngOnInit() {
    this.store.select(selectFields).subscribe((fields) => {
      this.suggestions = fields;
      this.filteredSuggestions = fields;
    });
    this.store
      .select(selectSearchTermAt(this.index))
      .pipe(take(1))
      .subscribe((term) => {
        if (term) {
          this.selectedField = term.field;
        }
      });
  }

  search(event: any) {
    const query = event.query.toLowerCase();
    if (query) {
      this.filteredSuggestions = this.suggestions.filter((field) =>
        field.toLowerCase().includes(query)
      );
    } else {
      // Show all suggestions when no query
      this.filteredSuggestions = [...this.suggestions];
    }
  }

  storeFieldToStore(event: { value: any }) {
    this.store.dispatch(setField({ index: this.index, field: event.value }));
  }

  clearField() {
    this.selectedField = '';
    this.store.dispatch(setField({ index: this.index, field: '' }));
  }
}
