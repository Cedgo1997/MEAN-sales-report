import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Sales } from 'src/app/models/sales.model';

// LOAD
export const loadSale = createAction(
  '[Sales Details Component] Load Sale',
  props<{ id: string }>()
);
export const loadSaleSuccess = createAction(
  '[Sales Details Component] Load Sale Success',
  props<{ sale: Sales }>()
);
export const loadSaleFail = createAction(
  '[Sales Details Component] Load Sale Fail',
  props<{ payload: any }>()
);

// CREATE

export const createSale = createAction(
  '[Add Sales Component] Create Sale',
  props<{ sale: Sales }>()
);
export const createSaleSuccess = createAction(
  '[Add Sales Component] Create Sale Success',
  props<{ sale: Sales }>()
);
export const createSaleFail = createAction(
  '[Add Sales Component] Create Sale Fail',
  props<{ payload: any }>()
);

// UPDATE

export const updateSale = createAction(
  '[Edit Sales Component] Update Sale',
  props<{ sale: Sales }>()
);
export const updateSaleSuccess = createAction(
  '[Edit Sales Component] Update Sale Success',
  props<{ sale: Update<Sales> }>()
);
export const updateSaleFail = createAction(
  '[Edit Sales Component] Update Sale Fail',
  props<{ payload: any }>()
);

// DELETE

export const deleteSale = createAction(
  '[Sales Details Component] Delete Sale',
  props<{ id: string }>()
);
export const deleteSaleSuccess = createAction(
  '[Sales Details Component] Delete Sale Success',
  props<{ id: string }>()
);
export const deleteSaleFail = createAction(
  '[Sales Details Component] Delete Sale Fail',
  props<{ payload: any }>()
);
