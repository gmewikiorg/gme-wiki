import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGuideComponent } from './summary-guide.component';

describe('SummaryGuideComponent', () => {
  let component: SummaryGuideComponent;
  let fixture: ComponentFixture<SummaryGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
