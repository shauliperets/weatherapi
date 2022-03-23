import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  items: any;
  temp: any;

  json: any;

  location: any;
  current: any;
  forecast: any;

  currentTemp: any;
  condition: any;
  image: any;
  text: any;
  today: any;
  tomorrow: any;
  afterTomorrow: any;
  dateArray: any;
  todayDate = new Date();
  tomorrowDate = new Date();
  afterTomorrowDate = new Date();

  todayTemp: any;
  tomorrowTemp: any;
  afterTomorrowTemp: any;

  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thusday',
    'Friday',
    'Saturday',
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(
        'http://api.weatherapi.com/v1/forecast.json?key=29cba40d62a246d4801162853222702&q=kfar saba&days=3&aqi=no&alerts=no'
      )
      .subscribe((data) => {
        console.log('data', data);

        this.location = Object.values(data)[0];
        this.current = Object.values(data)[1];
        this.forecast = Object.values(data)[2];

        this.currentTemp = this.current['temp_c'];
        this.condition = this.current['condition'];
        this.image = this.current['condition']['icon'];
        this.text = this.current['condition']['text'];
        this.today = this.forecast['forecastday'][0]['date'];
        this.tomorrow = this.forecast['forecastday'][1]['date'];
        this.afterTomorrow = this.forecast['forecastday'][2]['date'];

        this.dateArray = this.today.split('-');
        this.todayDate = new Date(
          Number(this.dateArray[2]),
          Number(this.dateArray[1]),
          Number(this.dateArray[0])
        );

        this.dateArray = this.tomorrow.split('-');
        this.tomorrowDate = new Date(
          Number(this.dateArray[2]),
          Number(this.dateArray[1]),
          Number(this.dateArray[0])
        );

        this.dateArray = this.afterTomorrow.split('-');
        this.afterTomorrowDate = new Date(
          Number(this.dateArray[2]),
          Number(this.dateArray[1]),
          Number(this.dateArray[0])
        );

        this.todayTemp = {
          max: String(this.forecast['forecastday'][0]['day']['maxtemp_c']),
          min: String(this.forecast['forecastday'][0]['day']['mintemp_c']),
        };

        this.tomorrowTemp = {
          max: String(this.forecast['forecastday'][1]['day']['maxtemp_c']),
          min: String(this.forecast['forecastday'][1]['day']['mintemp_c']),
        };

        this.afterTomorrowTemp = {
          max: String(this.forecast['forecastday'][2]['day']['maxtemp_c']),
          min: String(this.forecast['forecastday'][2]['day']['mintemp_c']),
        };
      });
  }
}
