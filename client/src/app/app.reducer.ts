import { ActionReducerMap, ReducerObservable } from '@ngrx/store';
import * as sale from './store/reducers/sale.reducer';
import * as sales from './store/reducers/sales.reducer';

export interface AppState {
  sale: sale.saleState;
  sales: sales.salesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  sale: sale.saleReducer,
  sales: sales.salesReducer,
};
