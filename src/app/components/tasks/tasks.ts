import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrls: ['../home/home.css', './tasks.css']
})

export class Tasks {


  isSortHidden = true;
  isFilterHidden = true;
  isTaskPanelHidden = true;
  isSelectUsersHidden = true;
  isSelectCategoriesHidden = true;
  isActionsHidden = true;

  taskForm = {
    deadline: this.getTomorrowDateString()
  };

  getTomorrowDateString(): string {
    const today = new Date();
    today.setDate(today.getDate() + 1);
  return today.toISOString().split('T')[0];
}

  toggleSort()
  {
    this.isSortHidden = !this.isSortHidden;
    this.isFilterHidden = true;
  }
  toggleFilter()
  {
    this.isFilterHidden = !this.isFilterHidden;
    this.isSortHidden = true;
  }
  toggleTaskPanel()
  {
    this.isTaskPanelHidden = !this.isTaskPanelHidden;
    this.isSortHidden = true;
    this.isFilterHidden = true;
  }
  toggleSelectUsers()
  {
    this.isSelectUsersHidden = !this.isSelectUsersHidden;
  }
  toggleSelectCategories()
  {
    this.isSelectCategoriesHidden = !this.isSelectCategoriesHidden;
  }
  toggleActions()
  {
    this.isActionsHidden = !this.isActionsHidden;
  }

  toggleCheckbox(event: MouseEvent): void
  {
    const target = event.currentTarget as HTMLElement;
    const checkbox = target.querySelector('input[type="checkbox"]') as HTMLInputElement;

    if(checkbox)
      checkbox.checked = !checkbox.checked;
    
    event.preventDefault();
  }

}
