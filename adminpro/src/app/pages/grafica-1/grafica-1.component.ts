import { Component } from '@angular/core';

@Component({
  selector: 'app-doughnut',
  templateUrl: './grafica-1.component.html',
  styles: ``
})
export class Grafica1Component{
  
  title: string = 'Sales'
  public labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
}
