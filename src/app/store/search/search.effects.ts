import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchActions from './search.actions';
import { GamesService } from '../../services/games.service';
import { Store } from '@ngrx/store';
import { selectBuiltQuery } from './search.selectors';
import { catchError, map, mergeMap, of, withLatestFrom, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class SearchEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private api = inject(GamesService);
  private router = inject(Router);

  submit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.submitSearch),
      withLatestFrom(this.store.select(selectBuiltQuery)),
      mergeMap(([, query]) =>
        this.api.search(query).pipe(
          map((results) => SearchActions.submitSearchSuccess({ results })),
          catchError((err) =>
            of(
              SearchActions.submitSearchFailure({
                error: err?.message ?? 'Search failed',
              })
            )
          )
        )
      )
    )
  );

  navigateOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SearchActions.submitSearchSuccess),
        tap(() => this.router.navigate(['/results']))
      ),
    { dispatch: false }
  );
}
