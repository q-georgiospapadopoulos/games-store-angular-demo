import { Component } from '@angular/core';
import { SloganComponent } from '../../components/slogan/slogan.component';
import { SearchContainerComponent } from '../../components/search-container/search-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SloganComponent, SearchContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
