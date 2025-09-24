import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-tab.component.html',
  styleUrl: './grid-tab.component.scss',
})
export class GridTabComponent {
  @Input() results: any[] = [];
}
