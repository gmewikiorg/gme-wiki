import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperstonkComponent } from './superstonk.component';

describe('SuperstonkComponent', () => {
  let component: SuperstonkComponent;
  let fixture: ComponentFixture<SuperstonkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperstonkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperstonkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
