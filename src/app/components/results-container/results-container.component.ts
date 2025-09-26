import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { PanelModule } from 'primeng/panel';

import { ListTabComponent } from '../results-tabs/list-tab/list-tab.component';
import { TableTabComponent } from '../results-tabs/table-tab/table-tab.component';
import { GridTabComponent } from '../results-tabs/grid-tab/grid-tab.component';
import { selectResults } from '../../store/search/search.selectors';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { DividerModule } from 'primeng/divider';
import { Button } from 'primeng/button';
import { Observable } from 'rxjs';
import { getSelectedGame } from '../../store/cart/cart.selectors';
import { ActivatedRoute, Router } from '@angular/router';
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
    Button,
  ],
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.scss',
})
export class ResultsContainerComponent implements OnInit {
  results: any[] = [];
  selectedGame$: Observable<any> = new Observable();
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  tabs = ['table', 'list', 'grid'];
  initialTab = this.tabs[0];

  ngOnInit(): void {
    this.store
      .select(selectResults)
      .pipe()
      .subscribe((results) => {
        this.results = [...results];
      });

    this.selectedGame$ = this.store.select(getSelectedGame);
  }

  onBuy(game: any) {
    if (game) {
      this.router.navigate(['dialog'], { relativeTo: this.route });
    }
  }
}
