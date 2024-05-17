import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'product-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy{
  
  @Input()
  public price: number = 0
  public interval$? : Subscription
  
  ngOnInit(): void {
    console.log("priceComponent: init")
    this.interval$ = interval(1000).subscribe(value => console.log(value))
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("priceComponent: changes")
  }
  ngOnDestroy(): void {
    console.log("priceComponent: destroy")
    this.interval$?.unsubscribe()
  }

}
