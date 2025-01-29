import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPopupComponent } from './todo-popup.component';

describe('TodoPopupComponent', () => {
  let component: TodoPopupComponent;
  let fixture: ComponentFixture<TodoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
