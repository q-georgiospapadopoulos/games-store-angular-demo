import { Component, Input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setKeyword } from '../../store/search/search.actions';
import { selectSearchTermAt } from '../../store/search/search.selectors';
import { SearchTerm } from '../../store/search/search.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-keyword',
  standalone: true,
  imports: [InputTextModule, FormsModule, CommonModule],
  templateUrl: './search-keyword.component.html',
  styleUrl: './search-keyword.component.scss',
})
export class SearchKeywordComponent implements OnInit {
  keyword: string | number = '';
  @Input() index!: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectSearchTermAt(this.index))
      .subscribe((term: SearchTerm) => {
        if (term) {
          this.keyword = term.keyword;
        }
      });
  }

  storeKeywordToStore(index: number, keyword: string | number) {
    this.store.dispatch(setKeyword({ index, keyword }));
  }
}
