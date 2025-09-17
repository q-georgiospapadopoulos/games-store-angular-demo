import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-keyword',
  standalone: true,
  imports: [InputTextModule, FormsModule],
  templateUrl: './search-keyword.component.html',
  styleUrl: './search-keyword.component.scss',
})
export class SearchKeywordComponent {
  keyword: string = '';
}
