import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.models';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const getSelectedGame = createSelector(
  selectCartState,
  (cart) => cart.selectedGame
);

export const getCartItems = createSelector(
  selectCartState,
  (cart) => cart.items
);
