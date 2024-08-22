import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipTableComponent } from './ownership-table.component';

describe('OwnershipTableComponent', () => {
  let component: OwnershipTableComponent;
  let fixture: ComponentFixture<OwnershipTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnershipTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnershipTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
