import { createReducer, on } from '@ngrx/store';
import { Sales } from 'src/app/models/sales.model';
import * as salesActions from './../actions/sales.actions';
// ENTITIES
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

export const salesAdapter: EntityAdapter<Sales> = createEntityAdapter<Sales>();

export interface SalesState extends EntityState<Sales> {
  loading: boolean;
  loaded: boolean;
  error: any;
  sales: Sales[];
}

export const initialState: SalesState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  error: null,
  sales: [],
};

const _salesReducer = createReducer(
  initialState,

  on(salesActions.loadSales, (state) => ({ ...state, loading: true })),
  on(salesActions.loadSalesSuccess, (state, { sales }) =>
    salesAdapter.setAll(sales, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(salesActions.loadSalesFail, (state, { payload }) => ({
    ...state,
    entities: {},
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function salesReducer(state, action) {
  return _salesReducer(state, action);
}
