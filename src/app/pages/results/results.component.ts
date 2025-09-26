import { Component } from '@angular/core';
import { ResultsTitleComponent } from '../../components/results-title/results-title.component';
import { ResultsContainerComponent } from '../../components/results-container/results-container.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [ResultsTitleComponent, ResultsContainerComponent, RouterOutlet],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {}
