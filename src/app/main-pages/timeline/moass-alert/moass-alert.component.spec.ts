import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoassAlertComponent } from './moass-alert.component';

describe('MoassAlertComponent', () => {
  let component: MoassAlertComponent;
  let fixture: ComponentFixture<MoassAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoassAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoassAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
