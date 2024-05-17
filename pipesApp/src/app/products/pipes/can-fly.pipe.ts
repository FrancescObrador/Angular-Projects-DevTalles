
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'canFly'
})

export class CanFlyPipe implements PipeTransform {
    transform(value: boolean, ...args: any[]): any {
        return (value) ? 'SI' : 'NO'
    }
}