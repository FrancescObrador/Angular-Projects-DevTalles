import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-loading-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  onLogin(): void {
    this.authService.login('francesc@gmail.com', '123')
    .subscribe(() => {
      this.router.navigate(['/'])
    })
  }

}
