import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from '@shared/title/title.component';
import {toSignal} from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title [title]="FullName()"></app-title>
    @if(user()){
      <section>
        <img [srcset]="user()?.avatar">

        <div>
          <p>{{user()?.email}}</p>
        </div>
      </section>
    } @else {
      <p>Cargando información</p>
    }
  `

})
export default class UserComponent {

  private route = inject(ActivatedRoute)
  private usersService = inject(UsersService)

 // public user = signal<User|undefined>(undefined)
 public user = toSignal(
  this.route.params.pipe(
    switchMap( ({id}) => this.usersService.getUserById(id))
  )
 )

 public FullName = computed(() => {
  if(!this.user()) return 'Información del usuario'
  return `Información del usuario:${this.user()?.first_name} ${this.user()?.last_name}`
 })

}
