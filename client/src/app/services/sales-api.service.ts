import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Chart } from '../models/chart.model';
import { Sales } from '../models/sales.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class SalesApiService {
  constructor(private http: HttpClient) {}

  // To handle errors easier
  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);
      return of(result as T);
    };
  }

  // READ

  getSales(): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${apiUrl}`).pipe(
      tap((sales) => console.log('fetched sales')),
      catchError(this.handleError<Sales[]>('getSales', []))
    );
  }

  getSalesById(id: string): Observable<Sales> {
    return this.http.get<Sales>(`${apiUrl}/${id}`).pipe(
      tap(() => console.log(`fetchd sales id=${id}`)),
      catchError(this.handleError<Sales>(`getSalesById id=${id}`))
    );
  }

  // CREATE

  addSales(sales: Sales): Observable<Sales> {
    return this.http.post<Sales>(apiUrl, sales, httpOptions).pipe(
      tap((sales: Sales) => console.log(`added sales id=${sales._id}`)),
      catchError(this.handleError<Sales>('addSales'))
    );
  }

  // UPDATE

  editSales(id: string, sales: Sales): Observable<any> {
    return this.http.put<Sales>(`${apiUrl}/${id}`, sales, httpOptions).pipe(
      tap(() => console.log(`sales edited w id=${id}`)),
      catchError(this.handleError<any>('updatedSales'))
    );
  }

  // DELETE

  deleteSales(id: string): Observable<Sales> {
    return this.http
      .delete<Sales>(`${apiUrl}/${id}`, httpOptions)
      .pipe(
        tap(
          () => console.log(`deleted sales id=${id}`),
          catchError(this.handleError<Sales>('deleteSales'))
        )
      );
  }

  getChart(): Observable<Chart> {
    return this.http.get<Chart>(`${apiUrl}/itemsales`).pipe(
      tap(() => console.log('fetched chart data')),
      catchError(this.handleError<Chart>('getChart data'))
    );
  }
}
