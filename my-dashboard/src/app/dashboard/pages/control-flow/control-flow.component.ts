import { Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

type Grade = 'A'|'B'|'F'

@Component({
  selector: 'app-contro-flow',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './control-flow.component.html',
  styles: ``
})
export default class ControFlowComponent {

  public showContent = signal(false)
  public grade = signal<Grade>('B')
  public frameworks = signal(['Angular', 'React', 'Vue', 'Qwik', 'Svelte'])
  public frameworks2 = signal([])

  public toggleContent(){
    this.showContent.update(value => !value)
  }

}
