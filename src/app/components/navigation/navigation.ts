import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule] ,
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation {
  isHidden = false;

  @Output() hiddenChange = new EventEmitter<boolean>();

  toggleMenu()
  {
    this.isHidden =!this.isHidden;
    this.hiddenChange.emit(this.isHidden);
  }
}
