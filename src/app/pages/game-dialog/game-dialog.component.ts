import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { Store } from '@ngrx/store';
import { getSelectedGame } from '../../store/cart/cart.selectors';
import { setSelectedGame } from '../../store/cart/cart.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './game-dialog.component.html',
  styleUrl: './game-dialog.component.scss',
})
export class GameDialogComponent implements OnInit {
  visible: boolean = false;
  selectedGame: any;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.select(getSelectedGame).subscribe((game) => {
      this.visible = !!game;
      this.selectedGame = game;
    });
  }

  onCloseDialog() {
    this.visible = false;
    this.store.dispatch(setSelectedGame({ game: null }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
