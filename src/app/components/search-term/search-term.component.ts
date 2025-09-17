import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { SearchOperatorComponent } from '../search-operator/search-operator.component';
import { SearchKeywordComponent } from '../search-keyword/search-keyword.component';
import { ActionButtonComponent } from '../action-button/action-button.component';

@Component({
  selector: 'app-search-term',
  standalone: true,
  imports: [
    SearchFieldComponent,
    SearchOperatorComponent,
    SearchKeywordComponent,
    ActionButtonComponent,
  ],
  templateUrl: './search-term.component.html',
  styleUrl: './search-term.component.scss',
})
export class SearchTermComponent {
  @Input() iconType: string = 'pi pi-trash';
  @Input() index: number = 0;
  @Output() actionClick = new EventEmitter<number>();

  onActionClick() {
    this.actionClick.emit(this.index);
  }
}
