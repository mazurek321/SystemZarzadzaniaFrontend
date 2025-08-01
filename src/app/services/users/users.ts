  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TaskDto } from '../tasks/taskservice';

  export interface UserDto
  {
    id: string,
    name: string,
    lastname: string,
    email: string,
    phone: string,
    isActive: boolean,
    lastActive: string,
    role: string,
    expiresAt: string,
    createdAt: string,
    updatedAt: string,
    tasks: TaskDto[]
  }

  export interface UserUpdateDto {
    name: string;
    lastname: string;
    email: string;
    phone: string;
  }

  export interface PagedResult<T> {
    items: T[];
    totalCount: number;
  }

  @Injectable({
    providedIn: 'root'
  })
  export class UsersService {

    private userUrl = "http://localhost:5259/api/user";

    private currentUserSubject = new BehaviorSubject<UserDto | null> (null);
    currentUser$ =this.currentUserSubject.asObservable(); 

    constructor(private http: HttpClient){}

    getCurrentUsersData() : Observable<UserDto>
    {
      return this.http.get<UserDto>(this.userUrl).pipe(
        tap(user => this.currentUserSubject.next(user))
      );
    } 

    getMe():UserDto | null
    {
      return this.currentUserSubject.value;
    }

    clearCurrentsUserData()
    {
      this.currentUserSubject.next(null);
    }

    getUser(id: string): Observable<UserDto>
    {
      return this.http.get<UserDto>(`${this.userUrl}?userId=${id}`);
    }

    browseUsers(pageNumber = 1, pageSize = 25): Observable<PagedResult<UserDto>> {
      return this.http.get<PagedResult<UserDto>>(`${this.userUrl}/browse?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    updateUser(userUpdate: UserUpdateDto) : Observable<UserDto>
    {
      return this.http.put<UserDto>(`${this.userUrl}`, userUpdate);
    }
    
  }
