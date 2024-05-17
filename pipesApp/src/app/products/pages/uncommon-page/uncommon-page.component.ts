import { Component } from '@angular/core';
import { interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  public name: string = "John Doe"
  public gender:  'male'|'female'|'nb' = 'male'
  private currentState:number = 0

  public inivitationMap = {
    'male': 'invitarlo',
    'female': 'invitarla',
    'nb': 'invitarle'
  }

  changeClient():void{
    switch(this.currentState){
      case 0:
        this.name = 'Jane Doe'
        this.gender = 'female'
        this.currentState = 1
        break
      case 1: 
        this.name = 'June Doe'
        this.gender = 'nb'
        this.currentState = 2
        break
      case 2: 
        this.name = 'John Doe'
        this.gender = 'male'
        this.currentState = 0
        break
      default:
        this.name = 'John Doe'
        this.gender = 'male'
        this.currentState = 0
    }
  }

  public clients: string[] = ['Fernando', 'Fernanda', 'Melissa', 'Juan', 'Paco']
  public clientsMap = {
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos # cliente esperando',
    'other': 'tenemos # clientes esperando'
  }

  deleteClient(){
    this.clients.shift()
  }

  public person = {
    name: 'Fernando',
    age: 36,
    address:'Ottawa, Canada'
  }

  public myObservableTimer = interval(2000).pipe(
    tap( value => console.log(value))
  )

  public promiseValue = new Promise((res, rej)=> {
    setTimeout(() => {
        res('promesa resuelta')
    }, 3500);
  })
}
