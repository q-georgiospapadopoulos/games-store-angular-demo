import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.scss',
})
export class SearchButtonComponent {}
