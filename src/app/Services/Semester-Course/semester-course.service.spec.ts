import { TestBed } from '@angular/core/testing';

import { SemesterCourseService } from './semester-course.service';

describe('SemesterCourseService', () => {
  let service: SemesterCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemesterCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
