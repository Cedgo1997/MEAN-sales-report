import { createReducer, on } from '@ngrx/store';
import { Sales } from 'src/app/models/sales.model';
import * as salesActions from './../actions/sales.actions';

export interface SalesState {
  loading: boolean;
  loaded: boolean;
  error: any;
  sales: Sales[];
}

export const initialState: SalesState = {
  loading: false,
  loaded: false,
  error: null,
  sales: [],
};

const _counterReducer = createReducer(
  initialState,

  on(salesActions.loadSales, (state) => ({ ...state, loading: true })),
  on(salesActions.loadSalesSuccess, (state, { sales }) => ({
    ...state,
    loading: false,
    loaded: true,
    sales,
  })),
  on(salesActions.loadSalesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
