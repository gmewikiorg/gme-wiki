import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrsComponent } from './drs.component';

describe('DrsComponent', () => {
  let component: DrsComponent;
  let fixture: ComponentFixture<DrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
