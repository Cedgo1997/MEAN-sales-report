import { createReducer, on } from '@ngrx/store';
import { Sales } from 'src/app/models/sales.model';
import * as saleActions from './../actions/sale.actions';

// ENTITIES
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface saleState extends EntityState<Sales> {
  // additional entity state properties
  selectedSaleId: number | null;
  loading: boolean;
  loaded: boolean;
  error: any;
  sale: Sales;
}

export const saleAdapter: EntityAdapter<Sales> = createEntityAdapter<Sales>({
  selectId: (sale: Sales) => sale._id,
});

export const initialState: saleState = saleAdapter.getInitialState({
  selectedSaleId: null,
  loading: false,
  loaded: false,
  error: null,
  sale: null,
});

const _saleReducer = createReducer(
  initialState,
  // LOAD
  on(saleActions.loadSale, (state, { id }) => ({
    selectedSaleId: id,
    ...state,
    loading: true,
  })),
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
  }))
);

export function saleReducer(state, action) {
  return _saleReducer(state, action);
}
