import { Component, ElementRef, ViewChild } from '@angular/core';
import maplibregl, { LngLat, Map, Marker } from 'maplibre-gl';

interface MarkerAndColor {
  color: string
  marker: Marker
}

interface PlainMarker{
  color: string
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef

  public map?: Map
  public currentLngLat: LngLat = new LngLat(2.9, 39.53)
  public markers: MarkerAndColor[] = [] 
  
  ngAfterViewInit(): void {
    if(!this.divMap) throw 'El elemento hmtl no fue encontrado'
    
    this.map = new maplibregl.Map({
      container: this.divMap?.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 8 // starting zoom
    });

    this.loadFromLocalstorage()
  }

  createMarker(){

    if(!this.map) return 

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map?.getCenter()

    this.addMarker(lgnLat, color)
  }

  addMarker(lngLat: LngLat, color: string){
    if(!this.map) return

    const marker = new Marker({
      color: color,
      draggable: true
    })
    .setLngLat(lngLat)
    .addTo(this.map)
    
    this.markers.push({ marker, color })
    this.saveToLocalstorage()

    marker.on('dragend', ()=>{
      this.saveToLocalstorage()
    })
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove()
    this.markers.splice(index, 1)
    this.saveToLocalstorage()
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 8,
      center: marker.getLngLat()
    })
  }

  saveToLocalstorage(){
    const plainMarkers : PlainMarker[] = this.markers.map(({color, marker}) => {
      return {color, lngLat: marker.getLngLat().toArray()}
    } )
    console.log(plainMarkers)
    localStorage.setItem('markers', JSON.stringify(plainMarkers))
  }

  loadFromLocalstorage(){
    const plainMarkersString = localStorage.getItem('markers') ?? '[]'
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString)
    
    plainMarkers.forEach( ({color, lngLat}) => {
      const [lng, lat] = lngLat
      const coords = new LngLat(lng, lat)
      this.addMarker(coords, color)
    })

  }
}
