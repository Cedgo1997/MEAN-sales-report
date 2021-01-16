import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { SalesApiService } from './../../services/sales-api.service';
import * as fromSaleActions from './../actions/sale.actions';

@Injectable()
export class SaleEffects {
  loadSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSaleActions.loadSale),
      mergeMap((action) =>
        this.salesApiService.getSalesById(action.id).pipe(
          map((sale) => fromSaleActions.loadSaleSuccess({ sale })),
          catchError((err) =>
            of(fromSaleActions.loadSaleFail({ payload: err }))
          )
        )
      )
    )
  );
  createSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSaleActions.createSale),
      mergeMap((action) =>
        this.salesApiService.addSales(action.sale).pipe(
          map((sale) => {
            console.log(sale);
            return fromSaleActions.loadSaleSuccess({ sale });
          }),
          catchError((err) => {
            console.log(err);
            return of(fromSaleActions.loadSaleFail({ payload: err }));
          })
        )
      )
    )
  );
  updateSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSaleActions.updateSale),
      mergeMap((action) =>
        this.salesApiService.editSales(action.id, action.sale).pipe(
          map((sale) => {
            console.log(sale);
            return fromSaleActions.updateSaleSuccess({ sale });
          }),
          catchError((err) => {
            console.log(err);
            return of(fromSaleActions.updateSaleFail({ payload: err }));
          })
        )
      )
    )
  );
  deleteSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSaleActions.deleteSale),
      mergeMap((action) =>
        this.salesApiService.deleteSales(action.id).pipe(
          map(() => {
            console.log(action.id);
            return fromSaleActions.deleteSaleSuccess({ id: action.id });
          }),
          catchError((err) => {
            console.log(err);
            return of(fromSaleActions.loadSaleFail({ payload: err }));
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
