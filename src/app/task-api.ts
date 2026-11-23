import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class TaskApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080';

  listTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/listTasks`);
  }

  createTask(title: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/createTask`, { title });
  }
}
