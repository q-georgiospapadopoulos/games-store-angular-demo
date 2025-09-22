import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchTerm } from '../../store/search/search.models';
import { selectSearchTerms } from '../../store/search/search.selectors';

@Component({
  selector: 'app-results-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-title.component.html',
  styleUrl: './results-title.component.scss',
})
export class ResultsTitleComponent implements OnInit, AfterViewInit {
  @ViewChild('conditionsLine', { static: false })
  conditionsLineRef!: ElementRef;

  title: string = 'Games that meet the criteria:';
  conditions$: Observable<string> = new Observable();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.conditions$ = this.store
      .select(selectSearchTerms)
      .pipe(
        map((conditions: SearchTerm[]) =>
          this.buildConditionsString(conditions)
        )
      );
  }

  ngAfterViewInit(): void {
    // Subscribe to conditions changes to adjust font size
    this.conditions$.subscribe(() => {
      setTimeout(() => this.adjustFontSize(), 0);
    });
  }

  private buildConditionsString(conditions: SearchTerm[]): string {
    if (!conditions || conditions.length === 0) {
      return 'No search criteria specified';
    }

    const validConditions = conditions.filter(
      (condition) => condition.field && condition.operator && condition.keyword
    );

    if (validConditions.length === 0) {
      return 'No search criteria specified';
    }

    return validConditions
      .map(
        (condition) =>
          `${condition.field} ${condition.operator} ${condition.keyword}`
      )
      .join(' AND ');
  }

  private adjustFontSize(): void {
    if (!this.conditionsLineRef) return;

    const element = this.conditionsLineRef.nativeElement;
    const container = element.parentElement;

    if (!container) return;

    element.style.fontSize = '1.2rem';

    if (element.scrollWidth > container.clientWidth) {
      let fontSize = 1.2;
      while (element.scrollWidth > container.clientWidth && fontSize > 0.8) {
        fontSize -= 0.1;
        element.style.fontSize = `${fontSize}rem`;
      }
    }
  }
}
