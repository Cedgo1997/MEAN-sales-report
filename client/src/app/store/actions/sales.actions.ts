import { createAction, props } from '@ngrx/store';
import { Sales } from 'src/app/models/sales.model';

export const loadSales = createAction('[Sales Component] Load Sales');
export const loadSalesSuccess = createAction(
  '[Sales Component] Load Sales Success',
  props<{ sales: Sales[] }>()
);
export const loadSalesFail = createAction(
  '[Sales Component] Load Sales Fail',
  props<{ payload: any }>()
);
