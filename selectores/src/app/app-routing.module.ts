import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesModule } from './countries/countries.module';
import { reduce } from 'rxjs';

const routes: Routes = [

  {
    path: 'selector',
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: '**',
    redirectTo: 'selector'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
