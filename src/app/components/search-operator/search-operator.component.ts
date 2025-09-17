import { Component } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-operator',
  standalone: true,
  imports: [SelectModule, FormsModule],
  templateUrl: './search-operator.component.html',
  styleUrl: './search-operator.component.scss',
})
export class SearchOperatorComponent {
  selectedOperator: any;
  operators = [
    { label: 'is', value: 'is' },
    { label: 'equals', value: 'equals' },
    { label: 'contains', value: 'contains' },
    { label: 'starts with', value: 'startsWith' },
    { label: 'ends with', value: 'endsWith' },
    { label: 'not equals', value: 'notEquals' },
  ];

  constructor() {
    this.selectedOperator = this.operators[0]; // Default to "is"
  }
}
