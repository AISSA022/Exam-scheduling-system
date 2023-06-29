import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenCourseReportComponent } from './studen-course-report.component';

describe('StudenCourseReportComponent', () => {
  let component: StudenCourseReportComponent;
  let fixture: ComponentFixture<StudenCourseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudenCourseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudenCourseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
