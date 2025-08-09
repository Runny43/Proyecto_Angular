import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardAdmin } from './dasboard-admin';

describe('DasboardAdmin', () => {
  let component: DasboardAdmin;
  let fixture: ComponentFixture<DasboardAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
