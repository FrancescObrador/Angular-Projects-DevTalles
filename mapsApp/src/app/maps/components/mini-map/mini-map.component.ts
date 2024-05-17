import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import maplibregl, { LngLat, Marker } from 'maplibre-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {
  
  @ViewChild('map') divMap?: ElementRef
  
  @Input() lngLat?: [number, number]

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'El elemento hmtl no fue encontrado'
    if(!this.lngLat) throw 'Coordenadas no encontradas'
    
    const [lng, lat] = this.lngLat

    const coords = new LngLat(lng, lat)

    const map = new maplibregl.Map({
      container: this.divMap?.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: coords, // starting position [lng, lat]
      zoom: 4 // starting zoom
    });

    const marker = new Marker({
      color: '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16)),
      draggable: true
    })
    .setLngLat(coords)
    .addTo(map)
  }
}
