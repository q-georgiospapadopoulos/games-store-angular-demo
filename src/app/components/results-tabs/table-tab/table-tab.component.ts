import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table-tab',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './table-tab.component.html',
  styleUrl: './table-tab.component.scss',
})
export class TableTabComponent {
  @Input() results: any[] = [];
  selectedGame: any;

  cols = [
    { field: 'name', header: 'Name' },
    { field: 'genre', header: 'Genre' },
    { field: 'platform', header: 'Platform' },
    { field: 'publisher', header: 'Publisher' },
    { field: 'year', header: 'Year' },
    { field: 'rank', header: 'Rank' },
    { field: 'global_sales', header: 'Global Sales' },
    { field: 'na_sales', header: 'NA Sales' },
    { field: 'eu_sales', header: 'EU Sales' },
    { field: 'jp_sales', header: 'JP Sales' },
    { field: 'other_sales', header: 'Other Sales' },
  ];
}
