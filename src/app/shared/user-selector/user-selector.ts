import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDto, UsersService } from '../../services/users/users';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-selector',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-selector.html',
  styleUrl: './user-selector.css'
})
export class UserSelector implements OnInit{

  users: UserDto[] = [];
  totalUsers = 0;
  currentPage = 1;
  totalPages = 0;

  loading = false;
  error = false;

  search = '';

  @Input() pageSize: number = 10 ;
  @Input() styleMode: 'default' | 'taskSearch' = 'default';
  @Output() userSelected = new EventEmitter<UserDto>();
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() errorChange = new EventEmitter<boolean>();


  constructor(private usersService: UsersService, private cd: ChangeDetectorRef)
  {}

  ngOnInit()
  {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number)
  {
    this.loading = true;
    this.error = false;

    this.usersService.browseUsers(page, this.pageSize).subscribe({
            next: result => {
              this.users = result.items;
              this.totalUsers = result.totalCount;
              this.totalPages = Math.ceil(this.totalUsers / this.pageSize);
              this.updateVisiblePages();
              this.loading = false;
              this.loadingChange.emit(false);
              this.error = false;
              this.errorChange.emit(false);
              this.cd.detectChanges();
            },
            error: err => {
              console.error("Failed to load users.");
              this.loading = false;
              this.loadingChange.emit(false);
              this.error = true;
              this.errorChange.emit(true);
              this.cd.detectChanges();
            }
          });
  }

  onSearchChange()
  {
    this.currentPage=1;
    this.loadUsers(this.currentPage);
  }

   goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers(this.currentPage);
    }
  }

  
  nextPage() {
    if(this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage+1;
      this.loadUsers(this.currentPage);
    }
  }

  prevPage() {
    if(this.currentPage > 1) {
      this.currentPage = this.currentPage-1;
      this.loadUsers(this.currentPage);
    }
  }

  visiblePages: number[] = [];

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

  selectUser(user: UserDto) {
    this.userSelected.emit(user);
  }

}
