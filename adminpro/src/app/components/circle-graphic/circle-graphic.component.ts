import { Component, Input, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';

import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-circle-graphic',
  templateUrl: './circle-graphic.component.html',
  styles: ``
})
export class CircleGraphicComponent implements OnInit {

  @Input() title: string = 'title';
  @Input() segments: string[] = ['1', '2', '3'];

  chartsCount: number = 0

  //public chart: Chart | undefined;

  ngOnInit(): void {
    this.generateChart();
  }

  generateChart() {
    const data = {
      labels: this.segments,

      datasets: [{
        labels: this.segments as any[],
        data: [350, 450, 100],
        backgroundColor: [
            '#6857E6',
            '#009EEE',
            '#F02059'
        ],

        hoverOffset: 4
      }]
    };

    
    const generatedId = uuid()
    const d1 = document.getElementsByClassName('chart')[this.chartsCount]
    this.chartsCount += 1
    console.log(this.chartsCount)
    d1.innerHTML = `<canvas id="${generatedId}"></canvas>`

    let chart = new Chart(generatedId, { // Use a random ID for each chart
      type: 'pie' as ChartType,
      data
    })
    console.log(chart)
  }
}