import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-result-chart',
  templateUrl: './result-chart.component.html',
  styleUrls: ['./result-chart.component.css']
})
export class ResultChartComponent implements AfterViewInit {
  @ViewChild('doughnutCanvas', { static: false }) doughnutCanvas: ElementRef;
  private doughnutChart: any;
  @Input() rightAnswers: number;
  @Input() wrongAnswers: number;

  constructor() { }

  ngAfterViewInit() {
    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Right Answers', 'Wrong Answers'],
        datasets: [{
          label: 'Answers Ratio',
          data: [this.rightAnswers, this.wrongAnswers],
          backgroundColor: [
            'rgba(66, 102, 245, 0.2)',
            'rgba(245, 66, 144, 0.2)'            
          ],
          hoverBackgroundColor: [
            '#4266F5',
            '#F54290'            
          ]
        }]
      }
    });
  }
}
