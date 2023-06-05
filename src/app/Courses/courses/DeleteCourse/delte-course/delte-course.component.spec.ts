import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelteCourseComponent } from './delte-course.component';

describe('DelteCourseComponent', () => {
  let component: DelteCourseComponent;
  let fixture: ComponentFixture<DelteCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelteCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelteCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
