import { Component, OnDestroy, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SalesApiService } from './../../services/sales-api.service';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Sales } from 'src/app/models/sales.model';
import { Chart } from 'src/app/models/chart.model';
import { Subscription } from 'rxjs';

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
  data: Sales[] = [];
  isLoadingResults = true;
  salesSubs: Subscription;

  constructor(private api: SalesApiService) {
    this.getSales();

    this.socket.on(
      'update-data',
      function (data: any) {
        this.getSales();
      }.bind(this)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.salesSubs.unsubscribe();
  }

  // Getting data from API

  getSales() {
    this.salesSubs = this.api.getSales().subscribe(
      (res: any) => {
        this.data = res;
        console.log(this.data);
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.pieChartColors = [];
        this.data.forEach((ch, idx) => {
          this.pieChartLabels.push(ch.itemName);
          this.pieChartData.push(ch.totalPrice);
          console.log(idx);
          setTimeout(() => {
            this.pieChartColors[0].backgroundColor.push(
              `rgba(${0 + idx * 10}, ${255 - idx * 20}, ${0 + idx * 10}, 0.3)`
            );
          });
        });
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
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
}
