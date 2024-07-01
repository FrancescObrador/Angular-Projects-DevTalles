import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styles: ``
})
export class IncrementatorComponent implements OnInit {
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }
  
  @Input('value') progress: number = 10
  @Input() btnClass: string = 'btn-primary'

  @Output() outputValue: EventEmitter<number> = new EventEmitter()

  get getPercent(){
    return `${this.progress}%`
  }

  changeValue(value: number) : void {

    if(this.progress >= 100 && value >= 0){
      this.progress = 100
      this.outputValue.emit(100)
      return
    }
    
    if(this.progress <= 0 && value < 0 ){
      this.progress = 0
      this.outputValue.emit(0)
      return
    }

    this.progress += value
    this.outputValue.emit(this.progress)
  }

  onChange(value: number){

    if(value >= 100){
      this.progress = 100;
    } else if (value <= 0){
      this.progress = 0
    } else {
      this.progress = value
    }

    this.outputValue.emit(this.progress)
  }
}
