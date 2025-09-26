import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { SelectItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { loadFields } from '../../../store/app/app.actions';
import { selectFields } from '../../../store/app/app.selectors';
import { FormsModule } from '@angular/forms';
import { setSelectedGame } from '../../../store/cart/cart.actions';
import { getSelectedGame } from '../../../store/cart/cart.selectors';

@Component({
  selector: 'app-grid-tab',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    PaginatorModule,
    SelectModule,
    FormsModule,
  ],
  templateUrl: './grid-tab.component.html',
  styleUrl: './grid-tab.component.scss',
})
export class GridTabComponent {
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
      this.sortOptions.unshift({
        label: 'Descending',
        value: '!' + this.sortField,
      });
    });
    this.store.select(getSelectedGame).subscribe((game) => {
      this.selectedGame = game;
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

  onSelectGame(game: any) {
    if (this.selectedGame && this.selectedGame.rank === game.rank) {
      this.selectedGame = null;
      this.store.dispatch(setSelectedGame({ game: null }));
      return;
    }
    this.selectedGame = game;
    this.store.dispatch(setSelectedGame({ game }));
  }
}
