import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityLabel'
})
export class PriorityLabelPipe implements PipeTransform {

  transform(value: number): string {
    switch(value)
    {
      case 0: return 'Low';
      case 1: return 'Medium';
      case 2: return 'High';
      default: return "Unknown";
    }
  }

}
