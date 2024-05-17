import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public countries: Country[] = []
  public isLoading: boolean = false
  public initialValue: string = ''

  constructor(private countriesService: CountriesService){}
  
  ngOnInit(): void {
    const cached = this.countriesService.cacheStore.byCountry
    this.countries = cached.countries
    this.initialValue = cached.term
  }
  
  searchByCountry(term: string): void {
    this.isLoading = true
    this.countriesService.searchContry(term)
    .subscribe(queriedCountries => {
      this.countries = queriedCountries
      this.isLoading = false
    })
  }
  
}
