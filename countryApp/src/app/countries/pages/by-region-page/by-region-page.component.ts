import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = []
  public isLoading: boolean = false

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public selectedRegion?: Region

  constructor(private countriesService: CountriesService){}
  
  ngOnInit(): void {
    const cached = this.countriesService.cacheStore.byRegion
    this.countries = cached.countries
    this.selectedRegion = cached.region
  }
  
  searchByRegion(region: Region): void {
    this.isLoading = true
    this.selectedRegion = region
    this.countriesService.searchRegion(region)
    .subscribe(queriedCountries => {
      this.countries = queriedCountries
      this.isLoading = false
    })
  }
}
