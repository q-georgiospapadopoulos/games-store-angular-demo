import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { PanelModule } from 'primeng/panel';

import { ListTabComponent } from '../results-tabs/list-tab/list-tab.component';
import { TableTabComponent } from '../results-tabs/table-tab/table-tab.component';
import { GridTabComponent } from '../results-tabs/grid-tab/grid-tab.component';
import { selectResults } from '../../store/search/search.selectors';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-results-container',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    CardModule,
    TabsModule,
    ListTabComponent,
    TableTabComponent,
    GridTabComponent,
    DividerModule,
  ],
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.scss',
})
export class ResultsContainerComponent implements OnInit {
  results: any[] = [];
  constructor(private store: Store) {}

  tabs = ['table', 'list', 'grid'];
  initialTab = this.tabs[0];

  ngOnInit(): void {
    this.store
      .select(selectResults)
      .pipe(
        tap((results) => {
          console.log('Results updated:', results);
        })
      )
      .subscribe((results) => {
        this.results = [...results];
      });
  }
}
