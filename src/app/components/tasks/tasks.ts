import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDto, Taskservice } from '../../services/tasks/taskservice';
import { UserDto } from '../../services/users/users';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrls: ['../home/home.css', './tasks.css']
})

export class Tasks implements OnInit{
  user: UserDto | null = null;

  tasks: TaskDto[] = []; 
  pagedTasks: TaskDto[] = []; 

  showMyTasks = true;

  currentPage = 1;
  itemsPerPage = 5;

  isSortHidden = true;
  isFilterHidden = true;
  isTaskPanelHidden = true;
  isSelectUsersHidden = true;
  isSelectCategoriesHidden = true;
  isActionsHidden = true;

  constructor(
    private taskService: Taskservice,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit()
  {
    this.loadTasks();
  }

  taskForm = {
    deadline: this.getTomorrowDateString()
  };

  loadTasks() {
    let query$;

    if(this.user != null && this.showMyTasks) query$ = this.taskService.browseTasks(this.currentPage, this.itemsPerPage, this.user.id);
    else query$ = this.taskService.browseTasks(this.currentPage, this.itemsPerPage);
    query$.subscribe({
      next: (data=>{
        this.tasks = data;
        this.updatePagedTasks();
        this.cd.detectChanges();
      }),
      error: (err=>{
        console.log("Error fetching tasks: ", err);
        this.cd.detectChanges();
      })
    });
  }

  updatePagedTasks() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedTasks = this.tasks.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedTasks();
  }


  getTomorrowDateString(): string {
    const today = new Date();
    today.setDate(today.getDate() + 1);
  return today.toISOString().split('T')[0];
}

  setShowTasks(value: boolean)
  {
    this.showMyTasks = value;
    this.loadTasks();
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
