import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.models';

export const setSelectedGame = createAction(
  '[Cart] Set Selected Game',
  props<{ game: Record<string, any> | null }>()
);

export const addItemToCart = createAction(
  '[Cart] Add Item To Cart',
  props<{ item: CartItem }>()
);

export const removeItemFromCart = createAction(
  '[Cart] Remove Item From Cart',
  props<{ itemId: number }>()
);
