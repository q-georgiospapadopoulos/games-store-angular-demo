import { Component } from '@angular/core';
import { SearchTermsContainerComponent } from '../search-terms-container/search-terms-container.component';
import { SearchButtonComponent } from '../search-button/search-button.component';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [SearchTermsContainerComponent, SearchButtonComponent],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.scss',
})
export class SearchContainerComponent {}
