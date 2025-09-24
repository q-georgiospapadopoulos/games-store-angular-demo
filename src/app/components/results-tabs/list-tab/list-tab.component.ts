import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { SelectItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { loadFields } from '../../../store/app/app.actions';
import { selectFields } from '../../../store/app/app.selectors';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-tab',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    PaginatorModule,
    SelectModule,
    FormsModule,
  ],
  templateUrl: './list-tab.component.html',
  styleUrl: './list-tab.component.scss',
})
export class ListTabComponent implements OnInit {
  @Input() results: any[] = [];
  selectedGame: any;
  sortField: string = '';
  sortOrder: number = 1;
  sortOptions!: SelectItem[];

  constructor(private store: Store) {
    this.store.dispatch(loadFields());
  }

  ngOnInit() {
    this.store.select(selectFields).subscribe((fields) => {
      this.sortOptions = fields.flatMap((field) => [
        { label: `${field} (Asc)`, value: field },
        { label: `${field} (Desc)`, value: '!' + field },
      ]);
      this.sortOptions.unshift({ label: 'No Sorting', value: '' });
    });
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
