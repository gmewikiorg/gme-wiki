import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrsFullTimelineComponent } from './drs-full-timeline.component';

describe('DrsFullTimelineComponent', () => {
  let component: DrsFullTimelineComponent;
  let fixture: ComponentFixture<DrsFullTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrsFullTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrsFullTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
