import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskDto, Taskservice } from '../../services/tasks/taskservice';
import { UserDto, UsersService } from '../../services/users/users';
import { PriorityLabelPipe } from '../../pipes/priority-label-pipe';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule, PriorityLabelPipe],
  templateUrl: './tasks.html',
  styleUrls: ['../home/home.css', './tasks.css']
})
export class Tasks implements OnInit {
  user: UserDto | null = null;

  tasks: TaskDto[] = [];

  totalTasks = 0;
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  visiblePages: number[] = [];

  showMyTasks = true;

  isSortHidden = true;
  isFilterHidden = true;
  isTaskPanelHidden = true;
  isSelectUsersHidden = true;
  isSelectCategoriesHidden = true;
  isActionsHidden = true;

  visibleActionsTaskId: string | null = null;

  constructor(
    private taskService: Taskservice,
    private cd: ChangeDetectorRef,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersService.getCurrentUsersData().subscribe({
    next: (user) => {
      this.user = user;
      this.loadTasks(this.currentPage);
    },
    error: (err) => {
      console.error('Nie udało się pobrać danych użytkownika:', err);
    }
  });
  }

  taskForm = {
    deadline: this.getTomorrowDateString()
  };

  loadTasks(page: number) {
    this.currentPage = page;

    let query$;
    if (this.user != null && this.showMyTasks) {
      query$ = this.taskService.browseTasks(page, this.pageSize, this.user.id);
      console.log("Show my tasks.");
    } else {
      query$ = this.taskService.browseTasks(page, this.pageSize);
      console.log("Show all tasks.");
    }

    query$.subscribe({
      next: (data) => {
        this.tasks = data.items;
        this.totalTasks = data.totalCount;
        this.totalPages = Math.ceil(this.totalTasks / this.pageSize);
        this.updateVisiblePages();
        
        for (let task of this.tasks) {
          this.usersService.getUser(task.createdBy).subscribe({
            next: (user) => {
              task.createdByUser = user;
              this.cd.detectChanges();
            },
            error: (err) => {
              console.error('Błąd podczas pobierania użytkownika:', err);
            }
          });
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        console.error("Error fetching tasks: ", err);
        this.cd.detectChanges();
      },
    });
  }
  

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadTasks(page);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadTasks(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadTasks(this.currentPage - 1);
    }
  }

  updateVisiblePages() {
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

  getTomorrowDateString(): string {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  }

  setShowMyTasks(value: boolean) {
    this.showMyTasks = value;
    this.loadTasks(this.currentPage);
  }

  toggleSort() {
    this.isSortHidden = !this.isSortHidden;
    this.isFilterHidden = true;
  }

  toggleFilter() {
    this.isFilterHidden = !this.isFilterHidden;
    this.isSortHidden = true;
  }

  toggleTaskPanel() {
    this.isTaskPanelHidden = !this.isTaskPanelHidden;
    this.isSortHidden = true;
    this.isFilterHidden = true;
  }

  toggleSelectUsers() {
    this.isSelectUsersHidden = !this.isSelectUsersHidden;
  }

  toggleSelectCategories() {
    this.isSelectCategoriesHidden = !this.isSelectCategoriesHidden;
  }

  toggleActions(taskId: string) {
    this.visibleActionsTaskId = this.visibleActionsTaskId === taskId ? null : taskId;
  }

  toggleCheckbox(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const checkbox = target.querySelector('input[type="checkbox"]') as HTMLInputElement;

    if (checkbox)
      checkbox.checked = !checkbox.checked;

    event.preventDefault();
  }


  startTask(task: TaskDto) {
    this.taskService.startTask(task.id).subscribe({
      next: updatedTask => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.tasks = [...this.tasks];
          this.cd.detectChanges();
        }
      },
      error: err => {
        console.error('Błąd podczas uruchamiania zadania:', err);
      }
    });
  }

  endTask(task: TaskDto) {
    this.taskService.endTask(task.id).subscribe({
      next: updatedTask => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.tasks = [...this.tasks];
          this.cd.detectChanges();
        }
      },
      error: err => {
        console.error('Błąd podczas kończenia zadania:', err);
      }
    });
  }
}
