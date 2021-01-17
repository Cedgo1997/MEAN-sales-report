import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { SalesApiService } from './../../services/sales-api.service';
import * as fromSalesActions from './../actions/sales.actions';

@Injectable()
export class SalesEffects {
  loadSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSalesActions.loadSales),
      mergeMap(() =>
        this.salesApiService.getSales().pipe(
          map((sales) => {
            console.log(sales);
            return fromSalesActions.loadSalesSuccess({ sales });
          }),
          catchError((err) => {
            console.log(err);
            return of(fromSalesActions.loadSalesFail({ payload: err }));
          })
        )
      )
    )
  );
  createSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSalesActions.createSale),
      mergeMap((action) =>
        this.salesApiService.addSales(action.sale).pipe(
          map((sale) => {
            console.log(sale);
            return fromSalesActions.createSaleSuccess({ sale });
          }),
          catchError((err) => {
            console.log(err);
            return of(fromSalesActions.createSaleFail({ payload: err }));
          })
        )
      )
    )
  );
  updateSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSalesActions.updateSale),
      mergeMap((action) =>
        this.salesApiService.editSales(action.id, action.sale).pipe(
          map((sale) => {
            console.log(sale);
            return fromSalesActions.updateSaleSuccess({ sale });
          }),
          catchError((err) => {
            console.log(err);
            return of(fromSalesActions.updateSaleFail({ payload: err }));
          })
        )
      )
    )
  );
  deleteSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSalesActions.deleteSale),
      mergeMap((action) =>
        this.salesApiService.deleteSales(action.id).pipe(
          map(() => {
            console.log(action.id);
            return fromSalesActions.deleteSaleSuccess({ id: action.id });
          }),
          catchError((err) => {
            console.log(err);
            return of(fromSalesActions.deleteSaleFail({ payload: err }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private salesApiService: SalesApiService
  ) {}
}
