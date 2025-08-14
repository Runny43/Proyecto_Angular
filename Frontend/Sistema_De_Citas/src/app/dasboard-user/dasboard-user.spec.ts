import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserComponent } from './dasboard-user';

describe('DasboardUser', () => {
  let component: DashboardUserComponent;
  let fixture: ComponentFixture<DashboardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
