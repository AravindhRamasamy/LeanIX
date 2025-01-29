import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Todo } from '../../state/todo.models';

@Component({
  selector: 'app-todo-popup',
  templateUrl: './todo-popup.component.html',
  styleUrls: ['./todo-popup.component.scss'],
})
export class TodoPopupComponent implements OnChanges {
  @Input() mode: 'create' | 'edit' | 'view' = 'view';
  @Input() todo: Todo | null = null;
  @Output() save = new EventEmitter<Todo>();
  @Output() close = new EventEmitter<void>();

  title = '';
  description = '';
  status: 'pending' | 'completed' = 'pending';

  ngOnChanges(): void {
   
  if (this.todo && this.mode !== 'create') {
    this.title = this.todo.title || '';
    this.description = this.todo.description || '';
    this.status = this.todo.status || 'pending';
  } else if (this.mode === 'create') {
    this.title = '';
    this.description = '';
    this.status = 'pending';
  }
  }

  onSave(): void {
    if (this.title.trim()) {
      this.save.emit({
        id: this.todo?.id || '', 
        title: this.title,
        description: this.description,
        status: this.status, 
      });
      this.close.emit();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  isViewMode(): boolean {
    return this.mode === 'view';
  }

  isEditMode(): boolean {
    return this.mode === 'edit';
  }

  isCreateMode(): boolean {
    return this.mode === 'create';
  }
}
