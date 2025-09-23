import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchTerm } from '../../store/search/search.models';
import {
  selectResults,
  selectSearchTerms,
} from '../../store/search/search.selectors';

@Component({
  selector: 'app-results-title',
  standalone: true,
  imports: [CommonModule, ChipModule],
  templateUrl: './results-title.component.html',
  styleUrl: './results-title.component.scss',
})
export class ResultsTitleComponent implements OnInit, AfterViewInit {
  @ViewChild('conditionsLine', { static: false })
  conditionsLineRef!: ElementRef;

  title: string = 'Games that meet the criteria:';
  conditions$: Observable<string> = new Observable();
  resultsCount$: Observable<number> = new Observable();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.conditions$ = this.store
      .select(selectSearchTerms)
      .pipe(
        map((conditions: SearchTerm[]) =>
          this.buildConditionsString(conditions)
        )
      );
    this.resultsCount$ = this.store
      .select(selectResults)
      .pipe(map((results) => results.length));
  }

  ngAfterViewInit(): void {
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
    const titleContent = element.closest('.title-content');

    if (!titleContent) return;

    element.style.fontSize = '1.2rem';

    element.offsetHeight;

    const availableWidth = titleContent.clientWidth - 40;

    if (element.scrollWidth > availableWidth) {
      let fontSize = 1.2;
      while (element.scrollWidth > availableWidth && fontSize > 0.8) {
        fontSize -= 0.05;
        element.style.fontSize = `${fontSize}rem`;
        element.offsetHeight;
      }
    }
  }
}
