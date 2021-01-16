import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
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
          map((sales) => fromSalesActions.loadSalesSuccess({ sales })),
          catchError((err) =>
            of(fromSalesActions.loadSalesFail({ payload: err }))
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
