import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'product-product-page',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  
  public isProductVisible: boolean = false
  public currentPrice = 10
  
  ngOnInit(): void {
    console.log("Init")
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("on change")
  }
  ngDoCheck(): void {
    console.log("do check")
  }
  ngAfterContentInit(): void {
    console.log("after content init")
  }
  ngAfterContentChecked(): void {
    console.log("after content checked")
  }
  ngAfterViewInit(): void {
    console.log("after view init")
  }
  ngAfterViewChecked(): void {
    console.log("after view checked")
  }
  ngOnDestroy(): void {
    console.log("on destroy")
  }

  increasePrice(){
    this.currentPrice++
  }


}
