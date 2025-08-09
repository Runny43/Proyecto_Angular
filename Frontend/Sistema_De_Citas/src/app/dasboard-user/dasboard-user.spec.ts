import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardUser } from './dasboard-user';

describe('DasboardUser', () => {
  let component: DasboardUser;
  let fixture: ComponentFixture<DasboardUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
