import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart.models';
import * as CartActions from './cart.actions';

const initialState: CartState = {
  selectedGame: null,
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.setSelectedGame, (state, { game }) => ({
    ...state,
    selectedGame: game,
  })),
  on(CartActions.addItemToCart, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
  })),
  on(CartActions.removeItemFromCart, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== itemId),
  }))
);
