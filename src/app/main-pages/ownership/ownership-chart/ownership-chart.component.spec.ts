import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipChartComponent } from './ownership-chart.component';

describe('OwnershipChartComponent', () => {
  let component: OwnershipChartComponent;
  let fixture: ComponentFixture<OwnershipChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnershipChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnershipChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
