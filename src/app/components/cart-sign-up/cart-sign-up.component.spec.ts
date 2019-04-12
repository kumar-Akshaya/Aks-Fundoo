import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSignUpComponent } from './cart-sign-up.component';

describe('CartSignUpComponent', () => {
  let component: CartSignUpComponent;
  let fixture: ComponentFixture<CartSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
