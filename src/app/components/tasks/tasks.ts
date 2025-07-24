import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
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
  }
  toggleFilter()
  {
    this.isFilterHidden = !this.isFilterHidden;
  }
  toggleTaskPanel()
  {
    this.isTaskPanelHidden = !this.isTaskPanelHidden;
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
}
