import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Countries } from '../weather.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl = 'http://localhost:3000/countries';

  constructor(private http: HttpClient) {}

  // GET all countries
  getCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(this.apiUrl);
  }

  // GET a single country by key
  getCountry(key: string): Observable<Countries> {
    const url = `${this.apiUrl}/${key}`;
    return this.http.get<Countries>(url);
  }

  // POST a new country
  addCountry(country: Countries): Observable<Countries> {
    return this.http.post<Countries>(this.apiUrl, country, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // PUT to update an existing country
  updateCountry(country: Countries): Observable<Countries> {
    const url = `${this.apiUrl}/${country.key}`;
    return this.http.put<Countries>(url, country, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // DELETE a country
  deleteCountry(key: string): Observable<void> {
    const url = `${this.apiUrl}/${key}`;
    return this.http.delete<void>(url);
  }
}
