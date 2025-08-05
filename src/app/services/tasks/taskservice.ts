import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../users/users';
import { PagedResult } from '../../shared/paged-results';

export interface TaskDto {
  id: string;
  title: string;
  description: string;
  deadline: string;       
  startDate: string;
  endDate: string;
  priority: number;
  status: string;
  createdBy: string;
  lastUpdate: string;
  updatedBy: string;
  users: string[];         
  categories: number[];  
  createdByUser?: UserDto;
}

@Injectable({
  providedIn: 'root'
})
export class Taskservice {
  
  private readonly apiUrl = 'http://localhost:5259/api/UserTasks';

  constructor(private http: HttpClient) {}

  getTask(taskId: string): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.apiUrl}?taskId=${taskId}`);
  }

  browseTasks(pageNumber = 1, pageSize = 25, userId?: string, categories?: number[]): Observable<PagedResult<TaskDto>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (userId) {
      params = params.set('userId', userId);  
    }

    if (categories && categories.length) {
      categories.forEach(cat => {
        params = params.append('categories', cat.toString());
      });
    }

    return this.http.get<PagedResult<TaskDto>>(`${this.apiUrl}/browse`, { params });
  }

  createTask(task: Partial<TaskDto>): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.apiUrl, task);
  }

  updateTask(id: string, task: Partial<TaskDto>): Observable<TaskDto> {
    return this.http.put<TaskDto>(`${this.apiUrl}?id=${id}`, task);
  }

  startTask(id: string): Observable<TaskDto>
  {
    return this.http.put<TaskDto>(`${this.apiUrl}/start?taskId=${id}`, {});
  }
  
  endTask(id: string): Observable<TaskDto>
  {
    return this.http.put<TaskDto>(`${this.apiUrl}/done?taskId=${id}`, {});
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
  
}
