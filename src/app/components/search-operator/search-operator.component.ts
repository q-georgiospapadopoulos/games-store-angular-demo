import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setOperator } from '../../store/search/search.actions';
import { SearchOperator } from '../../store/search/search.models';
import { selectSearchTermAt } from '../../store/search/search.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-search-operator',
  standalone: true,
  imports: [SelectModule, FormsModule],
  templateUrl: './search-operator.component.html',
  styleUrl: './search-operator.component.scss',
})
export class SearchOperatorComponent implements OnInit {
  @Input() index!: number;
  selectedOperator: SearchOperator = '';
  operators: Array<{ label: string; value: SearchOperator }> = [
    { label: 'is', value: 'is' },
    { label: 'equals', value: 'equals' },
    { label: 'contains', value: 'contains' },
    { label: 'starts with', value: 'startsWith' },
    { label: 'ends with', value: 'endsWith' },
    { label: 'not equals', value: 'notEquals' },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectSearchTermAt(this.index))
      .pipe(take(1))
      .subscribe((term) => {
        if (term && term.operator) {
          this.selectedOperator = term.operator;
        } else {
          this.selectedOperator = '';
        }
      });
  }

  onOperatorChange() {
    this.store.dispatch(
      setOperator({
        index: this.index,
        operator: this.selectedOperator,
      })
    );
  }

  onClear() {
    this.selectedOperator = '';
    this.store.dispatch(setOperator({ index: this.index, operator: '' }));
  }
}
