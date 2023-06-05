import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOfTheCourseComponent } from './student-of-the-course.component';

describe('StudentOfTheCourseComponent', () => {
  let component: StudentOfTheCourseComponent;
  let fixture: ComponentFixture<StudentOfTheCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentOfTheCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentOfTheCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
