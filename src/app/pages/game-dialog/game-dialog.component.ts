import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  PLATFORM_ID,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { Ripple, RippleModule } from 'primeng/ripple';
import { ChartModule } from 'primeng/chart';
import { Store } from '@ngrx/store';
import { getSelectedGame } from '../../store/cart/cart.selectors';
import { setSelectedGame } from '../../store/cart/cart.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { addItemToCart } from '../../store/cart/cart.actions';

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
    ChartModule,
  ],
  templateUrl: './game-dialog.component.html',
  styleUrl: './game-dialog.component.scss',
})
export class GameDialogComponent implements OnInit, AfterViewInit {
  visible: boolean = false;
  selectedGame: any;
  @ViewChild('rippleDiv', { read: Ripple }) ripple!: Ripple;
  @ViewChild('rippleDiv') rippleDiv!: ElementRef<HTMLDivElement>;

  // Chart properties
  chartData: any;
  chartOptions: any;
  platformId = inject(PLATFORM_ID);

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.select(getSelectedGame).subscribe((game) => {
      this.visible = !!game;
      this.selectedGame = game;
      if (game) {
        this.initChart();
      }
    });
  }

  initChart() {
    if (isPlatformBrowser(this.platformId) && this.selectedGame) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      const hexToRgb = (hex: string) => {
        const match = hex.replace('#', '').match(/.{1,2}/g);
        if (!match) return [0, 0, 0];
        return match.map((x) => parseInt(x, 16));
      };

      const lighten = (
        hex: string,
        alpha: number = 0.6,
        factor: number = 60
      ) => {
        const [r, g, b] = hexToRgb(hex);
        return `rgba(${Math.min(255, r + factor)},${Math.min(
          255,
          g + factor
        )},${Math.min(255, b + factor)},${alpha})`;
      };

      const darken = (hex: string, alpha: number = 1, factor: number = 60) => {
        const [r, g, b] = hexToRgb(hex);
        return `rgba(${Math.max(0, r - factor)},${Math.max(
          0,
          g - factor
        )},${Math.max(0, b - factor)},${alpha})`;
      };

      const baseColors = ['#a07cac', '#6bb700', '#f5a62333', '#6b6b6b'];

      this.chartData = {
        labels: ['North America', 'Europe', 'Japan', 'Other'],
        datasets: [
          {
            data: [
              this.selectedGame.na_sales,
              this.selectedGame.eu_sales,
              this.selectedGame.jp_sales,
              this.selectedGame.other_sales,
            ],
            backgroundColor: baseColors.map((c) => lighten(c, 0.5, 30)),
            hoverBackgroundColor: baseColors.map((c) => darken(c, 0.9, 20)),
          },
        ],
      };

      this.chartOptions = {
        cutout: '20%',
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
            title: {
              display: true,
              text:
                'Total Sales: ' + (this.selectedGame.global_sales + ' million'),
              color: textColor,
              font: { size: 18 },
            },
          },
        },
      };

      this.cd.markForCheck();
    }
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

  onAddToCart() {
    this.store.dispatch(
      addItemToCart({
        item: { id: this.selectedGame.rank, ...this.selectedGame },
      })
    );
    this.onCloseDialog();
  }
}
