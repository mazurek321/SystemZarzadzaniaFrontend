import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrls: ['../home/home.css', './tasks.css']
})
export class Tasks {
  isFilterHidden = true;
  isTaskPanelHidden = true;

  taskForm = {
    deadline: this.getTodayDateString()
  };

  getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }

  toggleFilter()
  {
    this.isFilterHidden = !this.isFilterHidden;
  }
  toggleTaskPanel()
  {
    this.isTaskPanelHidden = !this.isTaskPanelHidden;
  }
}
