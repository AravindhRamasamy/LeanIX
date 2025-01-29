import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoPopupComponent } from './components/todo-popup/todo-popup.component';

import { todoReducer } from './state/todo.reducer';
import { TodoEffects } from './state/todo.effects';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: TodoListComponent },
    ]), 
    StoreModule.forFeature('todos', todoReducer), 
    EffectsModule.forFeature([TodoEffects]),
  ],
  exports: [
    TodoListComponent,
    TodoPopupComponent
  ],
})
export class TodosModule {}
