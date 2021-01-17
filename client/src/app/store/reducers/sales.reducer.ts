import { createReducer, on } from '@ngrx/store';
import { Sales } from 'src/app/models/sales.model';
import * as salesActions from './../actions/sales.actions';
// ENTITIES
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

export const salesAdapter: EntityAdapter<Sales> = createEntityAdapter<Sales>();

export interface salesState extends EntityState<Sales> {
  loading: boolean;
  loaded: boolean;
  error: any;
  sales: Sales[];
}

export const initialState: salesState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  error: null,
  sales: [],
};

const _salesReducer = createReducer(
  initialState,
  // LOAD ALL
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
  })),
  // CREATE
  on(salesActions.createSale, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(salesActions.createSaleSuccess, (state, { sale }) =>
    salesAdapter.addOne(sale, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(salesActions.createSaleFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  // UPDATE
  on(salesActions.updateSale, (state) => ({ ...state, loading: true })),
  on(salesActions.updateSaleSuccess, (state, { sale }) =>
    salesAdapter.updateOne(sale, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(salesActions.updateSaleFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  // DELETE
  on(salesActions.deleteSale, (state) => ({ ...state, loading: true })),
  on(salesActions.deleteSaleSuccess, (state, { id }) =>
    salesAdapter.removeOne(id, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(salesActions.deleteSaleFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function salesReducer(state, action) {
  return _salesReducer(state, action);
}
