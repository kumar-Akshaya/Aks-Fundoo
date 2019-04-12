import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackServiceComponent } from './pack-service.component';

describe('PackServiceComponent', () => {
  let component: PackServiceComponent;
  let fixture: ComponentFixture<PackServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
