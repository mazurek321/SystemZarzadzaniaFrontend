import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  browseTasks(pageNumber = 1, pageSize = 25, userId?: string, categories?: number[]): Observable<TaskDto[]> {
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

    return this.http.get<TaskDto[]>(`${this.apiUrl}/browse`, { params });
  }

  createTask(task: Partial<TaskDto>): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.apiUrl, task);
  }

  updateTask(id: string, task: Partial<TaskDto>): Observable<TaskDto> {
    return this.http.put<TaskDto>(`${this.apiUrl}?id=${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
  
}
