import { SearchState } from './search/search.models';
import { FieldsState } from './app/app.models';

export interface AppState {
  search: SearchState;
  fields: FieldsState;
}
