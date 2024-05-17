import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = []
  public isLoading: boolean = false
  public initialValue: string = ''

  constructor(private countriesService: CountriesService){}
  
  ngOnInit(): void {
    const cached = this.countriesService.cacheStore.byCapital
    this.countries = cached.countries
    this.initialValue = cached.term
  }
  
  searchByCapital(term: string): void {
    this.isLoading = true
    this.countriesService.searchCapital(term)
    .subscribe(queriedCountries => {
      this.countries = queriedCountries
      this.isLoading = false
    })
  }
}
