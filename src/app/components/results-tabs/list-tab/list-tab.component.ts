import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-tab.component.html',
  styleUrl: './list-tab.component.scss',
})
export class ListTabComponent {
  @Input() results: any[] = [];
}
