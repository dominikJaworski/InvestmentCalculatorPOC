import { Component, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { LINE_CHART_COLORS } from '../models/chart.colors';
import { TableEntry } from '../models/TableEntry.model';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent {
  // lineChartData: ChartDataSets = {data: [], label: ''};
  lineChartData: number[] = [];
  lineChartLabels: Label[] = [];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: false,
    //maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      // {
      //   id: 'y-axis-0',
      //   position: 'left',
      // },
      // {
      //   id: 'y-axis-1',
      //   position: 'right',
      //   gridLines: {
      //     color: 'rgba(255,0,0,0.3)',
      //   },
      //   ticks: {
      //     fontColor: 'red',
      //   }
      // }
    },
    annotation: {
      annotations: [
        {
        },
      ],
    },
  };

  lineChartLegend = true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  private _loanTableOutput: TableEntry[] | null = null;

  get loanTableOutput(): TableEntry[] | null {
    return this._loanTableOutput;
  }

  @Input() set loanTableOutput(table: TableEntry[] | null) {
    this._loanTableOutput = table;

    if (table) {
      this.lineChartData = this.makeData(table);
      this.lineChartLabels = this.makeLabels(table);

      console.log(this.lineChartLabels);
      console.log(this.lineChartData);
    } else {
      this.lineChartData = []; // {data: [], label: ''};
      this.lineChartLabels = [];
    }
  }

  // @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {

  }

  makeLabels(table: TableEntry[]) {

    const monthLabelsForChart: string[] = [];

    for (let i = 0; i <= table.length; i++) {
      monthLabelsForChart.push('Month ' + i.toString());
    }

    return monthLabelsForChart;
  }

  makeData(table: TableEntry[]) {
    // const dataForChart: ChartDataSets = {data: [], label: 'accrued'};

    // if (table.length > 0) {
    //   dataForChart.data.push(table[0].startingBalance);
    //   for (const entry of table) {
    //     dataForChart.data.push(entry.endingBalance);
    //   }
    // } else {
    //   dataForChart.data.push(1000);
    // }

    // return dataForChart;

    const dataForChart: number[] = [];

    if (table.length > 0) {
      dataForChart.push(table[0].startingBalance);
      for (const entry of table) {
        dataForChart.push(entry.endingBalance);
      }
    }

    return dataForChart;

  }

}
