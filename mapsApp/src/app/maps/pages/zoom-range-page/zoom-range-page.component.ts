import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import maplibregl, { LngLat } from 'maplibre-gl';


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{
  
  @ViewChild('map') divMap?: ElementRef
  
  public zoom: number = 8
  public map?: maplibregl.Map
  public currentLngLat: LngLat = new LngLat(2.9, 39.53)
  
  ngAfterViewInit(): void {
    if(!this.divMap) throw 'El elemento hmtl no fue encontrado'
    
    this.map = new maplibregl.Map({
      container: this.divMap?.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom // starting zoom
    });

    this.mapListeners()
  }

  ngOnDestroy(): void {
    this.map?.remove()
  }

  mapListeners(){
    if(!this.map) throw "Map do not exist"

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom()
    })

    this.map.on('zoomend', (ev) => {
      if(this.map!.getZoom() < 15.01) return
      this.map!.zoomTo(15)
    })

    this.map.on('move', ()=> {
      this.currentLngLat = this.map!.getCenter()
      console.log(this.currentLngLat)
    } )
  }

  zoomIn(){
    this.map?.zoomIn()
  }

  zoomOut(){
    this.map?.zoomOut()
  }

  zoomChanged(value: string){
    this.zoom = Number(value)
    this.map?.zoomTo(this.zoom)
  }

}
