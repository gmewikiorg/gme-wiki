import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrsTimelineComponent } from './drs-timeline.component';

describe('DrsTimelineComponent', () => {
  let component: DrsTimelineComponent;
  let fixture: ComponentFixture<DrsTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrsTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
