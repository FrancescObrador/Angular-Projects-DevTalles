import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent { 
  constructor(private gifsServie: GifsService){

  }

  get gifs(): Gif[]{
    return this.gifsServie.gifsList
  }
}
