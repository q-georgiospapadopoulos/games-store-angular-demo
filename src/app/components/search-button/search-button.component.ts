import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { submitSearch } from '../../store/search/search.actions';

@Component({
  selector: 'app-search-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.scss',
})
export class SearchButtonComponent {
  constructor(private store: Store) {}

  onSearchClick() {
    this.store.dispatch(submitSearch());
  }
}
