import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TodoService } from '../todo.service';
import * as TodoActions from './todo.actions';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => of(TodoActions.loadTodosFailure({ error: error.message })))
        )
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createTodo),
      mergeMap((action) =>
        this.todoService.createTodo(action.todo).pipe(
          map((todo) => TodoActions.loadTodos()), // Reload todos after creation
          catchError((error) => of(TodoActions.loadTodosFailure({ error: error.message })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap((action) =>
        this.todoService.updateTodo(action.id, action.changes).pipe(
          map(() => TodoActions.loadTodos()), // Reload todos after update
          catchError((error) => of(TodoActions.loadTodosFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap((action) =>
        this.todoService.deleteTodo(action.id).pipe(
          map(() => TodoActions.loadTodos()), // Reload todos after deletion
          catchError((error) => of(TodoActions.loadTodosFailure({ error: error.message })))
        )
      )
    )
  );
}
