import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FieldsActions from './app.actions';
import { GamesService } from '../../services/games.service';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFields } from './app.selectors';

@Injectable()
export class FieldsEffects {
  private actions$ = inject(Actions);
  private api = inject(GamesService);
  private store = inject(Store);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FieldsActions.loadFields),
      withLatestFrom(this.store.select(selectFields)),
      filter(([, fields]) => !fields?.length),
      switchMap(() =>
        this.api.getFields().pipe(
          map((fields) =>
            FieldsActions.loadFieldsSuccess({ fields: fields?.fields })
          ),
          catchError((err) =>
            of(
              FieldsActions.loadFieldsFailure({
                error: err?.message ?? 'Failed to load fields',
              })
            )
          )
        )
      )
    )
  );
}
