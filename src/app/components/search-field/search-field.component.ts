import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFields } from '../../store/app/app.selectors';
import { loadFields } from '../../store/app/app.actions';
import { setField } from '../../store/search/search.actions';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  searchField: string = '';
  selectedField: string = '';
  @Input() index!: number; // i-th row
  fields$: Observable<string[]>;
  suggestions: string[] = [];
  filteredSuggestions: string[] = [];
  private fieldsSubscription?: Subscription;

  constructor(private store: Store) {
    this.store.dispatch(loadFields());
    this.fields$ = this.store.select(selectFields);
  }

  ngOnInit() {
    this.fieldsSubscription = this.fields$.subscribe((fields) => {
      this.suggestions = fields;
      this.filteredSuggestions = fields; // Initialize filtered suggestions
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

  ngOnDestroy() {
    if (this.fieldsSubscription) {
      this.fieldsSubscription.unsubscribe();
    }
  }

  onBlurField() {
    this.store.dispatch(
      setField({ index: this.index, field: this.selectedField })
    );
  }
}
