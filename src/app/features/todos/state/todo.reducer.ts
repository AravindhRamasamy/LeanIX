import { createReducer, on } from '@ngrx/store';
import { Todo } from './todo.models';
import * as TodoActions from './todo.actions';

export interface TodoState {
  todos: Todo[];
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  error: null,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
  })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TodoActions.createTodo, (state, { todo }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        ...todo,
        id: Date.now().toString(),
        title: todo.title || '', 
        description: todo.description || '', 
        status: 'pending' as 'pending', 
      },
    ],
  })),
  on(TodoActions.updateTodo, (state, { id, changes }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id
        ? { ...todo, ...changes, status: changes.status as 'pending' | 'completed' }
        : todo
    ),
  })),
  on(TodoActions.deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }))
);
