import { Component } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
  selectedField: string = '';
  suggestions: string[] = [];
  fields: string[] = ['title', 'genre', 'platform', 'developer', 'publisher'];

  search(event: any) {
    this.suggestions = this.fields.filter((field) =>
      field.toLowerCase().includes(event.query.toLowerCase())
    );
  }
}
