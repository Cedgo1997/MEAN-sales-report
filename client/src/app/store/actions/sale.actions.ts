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
