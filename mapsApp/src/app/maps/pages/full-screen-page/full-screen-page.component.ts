import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import maplibregl from 'maplibre-gl'

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'El elemento hmtl no fue encontrado'
    
    const map = new maplibregl.Map({
      container: this.divMap?.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: [3.09, 39.28], // starting position [lng, lat]
      zoom: 3 // starting zoom
    });

  }
}
