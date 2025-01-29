import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from './state/todo.models';
import { environment  } from './../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.post<any>(this.apiUrl, {
      query: `
        query {
          todos {
            id
            title
            description
            status
          }
        }
      `,
    }).pipe(map((response) => response.data.todos));
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<any>(this.apiUrl, {
      query: `
        mutation {
          createTodo(title: "${todo.title}", description: "${todo.description}", status: "${todo.status}") {
            id
            title
            description
            status
          }
        }
      `,
    }).pipe(map((response) => response.data.createTodo));
  }

  updateTodo(id: string, changes: Partial<Todo>): Observable<Todo> {
    return this.http.post<any>(this.apiUrl, {
      query: `
        mutation {
          updateTodo(id: "${id}", title: "${changes.title}", description: "${changes.description}", status: "${changes.status}") {
            id
            title
            description
            status
          }
        }
      `,
    }).pipe(map((response) => response.data.updateTodo));
  }

  deleteTodo(id: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl, {
      query: `
        mutation {
          deleteTodo(id: "${id}")
        }
      `,
    }).pipe(map((response) => response.data.deleteTodo));
  }
}
