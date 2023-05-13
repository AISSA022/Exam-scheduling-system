import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltePeriodComponent } from './delte-period.component';

describe('DeltePeriodComponent', () => {
  let component: DeltePeriodComponent;
  let fixture: ComponentFixture<DeltePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeltePeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeltePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
