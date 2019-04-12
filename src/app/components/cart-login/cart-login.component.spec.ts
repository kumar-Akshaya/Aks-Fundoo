import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLoginComponent } from './cart-login.component';

describe('CartLoginComponent', () => {
  let component: CartLoginComponent;
  let fixture: ComponentFixture<CartLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
