import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from '../services/weather.service';
import { Countries, Weather } from '../weather.model'; 
import { CommonModule } from '@angular/common';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService],
})
export class WeatherComponent implements OnInit {
  weatherData: Weather | null = null;
  lat: number = 23.684994; // Default latitude
  lon: number = 90.356331; // Default longitude
  selectedCountry: string = ''; // Variable for selected country
  errorMessage: string | null = null;

  countries: Countries[] = [];

  constructor(private weatherService: WeatherService, private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.getWeather();

    // Fetch country data
    this.countriesService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        // Set default lat and lon based on the first country in the list
        if (this.countries.length > 0) {
          this.lat = this.countries[0].latitude;
          this.lon = this.countries[0].longitude;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load countries';
      },
    });
  }

  // Fetch weather data
  getWeather(): void {
    this.weatherService.getWeather(this.lat, this.lon).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'Failed to fetch weather data';
      },
    });
  }

  // Handle user search
  onSearch(): void {
    this.getWeather();
  }

  // Handle country selection and update lat/lon
  onCountrySelect(event: Event): void {
    const selectedCountryKey = (event.target as HTMLSelectElement).value;
    const selectedCountry = this.countries.find(country => country.key === selectedCountryKey);
    if (selectedCountry) {
      this.lat = selectedCountry.latitude;
      this.lon = selectedCountry.longitude;
      this.getWeather(); // Fetch weather based on updated lat/lon
    } else {
      this.errorMessage = 'Country not found';
    }
  }
  
}
