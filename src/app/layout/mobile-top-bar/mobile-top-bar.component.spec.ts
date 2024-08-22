import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTopBarComponent } from './mobile-top-bar.component';

describe('MobileTopBarComponent', () => {
  let component: MobileTopBarComponent;
  let fixture: ComponentFixture<MobileTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileTopBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
