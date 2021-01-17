import { Component, OnDestroy, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SalesApiService } from './../../services/sales-api.service';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Sales } from 'src/app/models/sales.model';
import { Chart } from 'src/app/models/chart.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { loadSales } from 'src/app/store/actions/sales.actions';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit, OnDestroy {
  socket = io('http://localhost:4000');
  chartData: Chart[] = [];

  // PIE CHART

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [{ backgroundColor: [] }];

  displayedColumns: string[] = ['itemId', 'itemName', 'totalPrice'];
  isLoadingResults = true;
  salesSubs: Subscription;
  data: Sales[] = [];

  constructor(private store: Store<AppState>) {
    this.getSales();

    this.socket.on(
      'update-data',
      function (data: any) {
        this.getSales();
      }.bind(this)
    );
  }

  ngOnInit(): void {
    this.store.select('sales').subscribe(({ sales }) => {
      this.data = sales;
      this.isLoadingResults = false;
    });
  }

  ngOnDestroy(): void {}

  getSales() {
    this.store.dispatch(loadSales());
  }
}
