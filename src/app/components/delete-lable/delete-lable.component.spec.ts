import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLableComponent } from './delete-lable.component';

describe('DeleteLableComponent', () => {
  let component: DeleteLableComponent;
  let fixture: ComponentFixture<DeleteLableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
