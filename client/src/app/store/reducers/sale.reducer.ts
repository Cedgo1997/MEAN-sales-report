import { createReducer, on } from '@ngrx/store';
import { Sales } from 'src/app/models/sales.model';
import * as saleActions from './../actions/sale.actions';

// ENTITIES
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';

export interface User {
  id: string;
  name: string;
}

export interface saleState extends EntityState<Sales> {
  // additional entity state properties
  selectedUserId: number | null;
  loading: boolean;
  loaded: boolean;
  error: any;
  sale: Sales;
}

export const saleAdapter: EntityAdapter<Sales> = createEntityAdapter<Sales>();

export const initialState: saleState = saleAdapter.getInitialState({
  ids: [],
  entities: {},
  selectedUserId: null,
  loading: false,
  loaded: false,
  error: null,
  sale: null,
});

const _saleReducer = createReducer(
  initialState,

  // LOAD
  /* on(saleActions.loadSale, (state) => ({ ...state, loading: true })), */
  on(saleActions.loadSaleSuccess, (state, { sale }) =>
    saleAdapter.setOne(sale, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(saleActions.loadSaleFail, (state, { payload }) => ({
    ...state,
    entities: {},
    loading: false,
    loaded: false,
    error: payload,
  })),

  // CREATE
  on(saleActions.createSale, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(saleActions.createSaleSuccess, (state, { sale }) =>
    saleAdapter.addOne(sale, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(saleActions.createSaleFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  // UPDATE
  on(saleActions.updateSale, (state) => ({ ...state, loading: true })),
  on(saleActions.updateSaleSuccess, (state, { sale }) =>
    saleAdapter.updateOne(sale, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(saleActions.updateSaleFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  // DELETE
  on(saleActions.deleteSale, (state) => ({ ...state, loading: true })),
  on(saleActions.deleteSaleSuccess, (state, { id }) =>
    saleAdapter.removeOne(id, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(saleActions.deleteSaleFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function saleReducer(state, action) {
  return _saleReducer(state, action);
}
