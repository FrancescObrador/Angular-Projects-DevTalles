import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSubscription?: Subscription
  
  @Input()
  public placeholder: string = ''
  @Input()
  public initialValue: string = ''
  
  @Output()
  public onDebounce = new EventEmitter<string>()
  
  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer.
    pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm)
  }
}
