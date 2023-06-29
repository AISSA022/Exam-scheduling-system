import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeConflictComponent } from './time-conflict.component';

describe('TimeConflictComponent', () => {
  let component: TimeConflictComponent;
  let fixture: ComponentFixture<TimeConflictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeConflictComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeConflictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
