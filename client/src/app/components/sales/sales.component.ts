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
    this.salesSubs = this.store.select('sales').subscribe(({ sales }) => {
      this.data = sales;
      const backgrounds = [];
      this.data.forEach((sale, idx) => {
        this.pieChartLabels.push(sale.itemName);
        this.pieChartData.push(sale.totalPrice);
        backgrounds.push(
          `rgba(${0 + sale.itemQty * 15}, ${155 - sale.itemQty * 5}, ${0 + sale.itemQty * 30}, 0.3)`
        );
        this.pieChartColors = [
          {
            backgroundColor: backgrounds,
          },
        ];
      });
      this.isLoadingResults = false;
    });
  }

  /* getChartData() {
    this.api.getChart().subscribe(
      (res: any) => {
        console.log(res);
        this.chartData = res;
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.pieChartColors = [];
        const backgrounds = [];
        this.chartData.forEach((ch, idx) => {
          this.pieChartLabels.push(ch._id.itemName);
          this.pieChartData.push(ch.totalPrice);
          backgrounds.push(
            `rgba(${0 + idx * 10}, ${255 - idx * 20}, ${0 + idx * 10}, 0.3)`
          );
        });
        this.pieChartColors = [
          {
            backgroundColor: backgrounds,
          },
        ];
      },
      (err) => {
        console.log(err);
      }
    );
  } */

  ngOnDestroy(): void {
    this.salesSubs.unsubscribe();
  }

  getSales() {
    this.store.dispatch(loadSales());
  }
}
