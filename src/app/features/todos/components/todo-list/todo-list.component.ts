import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../../todo.service';
import { Todo } from '../../state/todo.models'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> = new Observable<Todo[]>(); 
  paginatedTodos: Todo[] = []; 
  currentPage = 1; // Active page
  itemsPerPage = 10; // Max items per page
  popupMode: 'create' | 'edit' | 'view' | null = null; 
  selectedTodo: Todo | null = null; 
  filter: string = 'all'; // Filter for status ('all', 'completed', 'pending')

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos(); // Fetch todos on component initialization
  }

  loadTodos(): void {
    this.todos$ = this.todoService.getTodos();
    this.applyFilter(); // Initialize filtering and pagination
  }

  applyFilter(): void {
    this.todos$.subscribe((todos) => {
      const filteredTodos = this.filter === 'all' 
        ? todos 
        : todos.filter(todo => todo.status === this.filter);
      this.paginatedTodos = this.paginate(filteredTodos, this.currentPage, this.itemsPerPage);
    });
  }

  paginate(array: Todo[], page: number, itemsPerPage: number): Todo[] {
    const startIndex = (page - 1) * itemsPerPage;
    return array.slice(startIndex, startIndex + itemsPerPage);
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.applyFilter();
  }

  openPopup(mode: 'create' | 'edit' | 'view', todo: Todo | null = null): void {
    this.popupMode = mode;
    this.selectedTodo = todo;
  }

  closePopup(): void {
    this.popupMode = null;
    this.selectedTodo = null;
    this.applyFilter(); // Refresh the list after changes
  }

  saveTodo(updatedTodo: Todo): void {
    if (this.popupMode === 'create') {
      this.todoService.createTodo(updatedTodo).subscribe(() => this.loadTodos());
    } else if (this.popupMode === 'edit') {
      const { id, ...changes } = updatedTodo;
      this.todoService.updateTodo(id, changes).subscribe(() => this.loadTodos());
    }
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}
