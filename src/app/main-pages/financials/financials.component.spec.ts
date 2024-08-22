import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsComponent } from './financials.component';

describe('FinancialsComponent', () => {
  let component: FinancialsComponent;
  let fixture: ComponentFixture<FinancialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
