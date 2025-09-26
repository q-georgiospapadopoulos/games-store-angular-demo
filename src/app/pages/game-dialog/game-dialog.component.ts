import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { Ripple, RippleModule } from 'primeng/ripple';
import { Store } from '@ngrx/store';
import { getSelectedGame } from '../../store/cart/cart.selectors';
import { setSelectedGame } from '../../store/cart/cart.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [
    CommonModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    AccordionModule,
    ChipModule,
    TagModule,
    RippleModule,
  ],
  templateUrl: './game-dialog.component.html',
  styleUrl: './game-dialog.component.scss',
})
export class GameDialogComponent implements OnInit, AfterViewInit {
  visible: boolean = false;
  selectedGame: any;
  @ViewChild('rippleDiv', { read: Ripple }) ripple!: Ripple;
  @ViewChild('rippleDiv') rippleDiv!: ElementRef<HTMLDivElement>;

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

  ngAfterViewInit() {
    this.triggerCornerRipples();
  }

  triggerCornerRipples() {
    const div = this.rippleDiv.nativeElement;
    const corners = [
      { x: 0, y: 0 }, // top-left
      { x: div.offsetWidth, y: 0 }, // top-right
      { x: div.offsetWidth, y: div.offsetHeight }, // bottom-right
      { x: 0, y: div.offsetHeight }, // bottom-left
    ];

    let i = 0;
    setInterval(() => {
      const { x, y } = corners[i % 4];
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: x + div.getBoundingClientRect().left,
        clientY: y + div.getBoundingClientRect().top,
      });
      div.dispatchEvent(event);
      i++;
    }, 1000);
  }

  onCloseDialog() {
    this.visible = false;
    this.store.dispatch(setSelectedGame({ game: null }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
