import { SearchState } from './search/search.models';
import { FieldsState } from './app/app.models';
import { CartState } from './cart/cart.models';

export interface AppState {
  search: SearchState;
  fields: FieldsState;
  cart: CartState;
}
