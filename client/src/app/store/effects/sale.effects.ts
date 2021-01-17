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

  constructor(
    private actions$: Actions,
    private salesApiService: SalesApiService
  ) {}
}
