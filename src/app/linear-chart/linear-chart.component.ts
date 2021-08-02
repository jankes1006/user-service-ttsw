import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CommentService } from '../CommentService/comment.service';
import { OfferService } from '../OfferService/offer.service';
Chart.register(...registerables);

export class DataToChart {
  labels: any;
  data: any;

  constructor(labels: any, data: any) {
    this.labels = labels;
    this.data = data;
  }

  getLabels() {
    return this.labels;
  }

  getData() {
    return this.data;
  }
}

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.css']
})
export class LinearChartComponent implements OnInit {

  type: string;
  title: string;
  id: number;

  constructor(private offerSerivce: OfferService, private commentService: CommentService, private route: ActivatedRoute) {
    this.type = String(this.route.snapshot.paramMap.get('typeStatistic'));
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.title = String(this.route.snapshot.paramMap.get('title'));
  }

  tempLabels: any;
  tempData: any;
  tempResult: any;

  ngOnInit(): void {
    if(this.type=="showViewsOnHour"){
      this.offerSerivce.statisticViewOffer(this.id).subscribe(result => {
        this.tempResult = result;
        this.tempData = this.tempResult.data;
        this.tempLabels = this.tempResult.labels;
        this.visitedOnHour();
      })
    }else if (this.type=="showMarksUser"){
      this.commentService.getMarksUser(this.id).subscribe(result => {
        this.tempResult = result;
        this.tempData = this.tempResult.data;
        this.tempLabels = this.tempResult.labels;
        this.markUser();
      })
    }
  }

  visitedOnHour() {
    let dataToChart = new DataToChart(this.tempLabels, this.tempData);
    return new Chart("chartRun", {
      type: 'bar',
      data: {
        labels: dataToChart.getLabels(),
        datasets: [{
          label: "Liczba odwiedzin na godzine",
          data: dataToChart.getData(),
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  markUser(){
    let dataToChart = new DataToChart(this.tempLabels, this.tempData);
    return new Chart("chartRun",{
      type: "doughnut",
      data:{
        labels: dataToChart.getLabels(),
        datasets: [{
          label: 'Oceny użytkownika',
          data: dataToChart.getData(),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }
}
