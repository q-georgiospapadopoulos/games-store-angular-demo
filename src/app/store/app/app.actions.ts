import { createAction, props } from '@ngrx/store';

export const loadFields = createAction('[Fields] Load');
export const loadFieldsSuccess = createAction(
  '[Fields] Load Success',
  props<{ fields: string[] }>()
);
export const loadFieldsFailure = createAction(
  '[Fields] Load Failure',
  props<{ error: string }>()
);
