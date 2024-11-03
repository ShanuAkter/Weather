import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from '../weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = '9fc5c3d159bc435bc4d4334a1f70d0c4'; // Your OpenWeatherMap API key

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<Weather> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<Weather>(url);
  }
}

