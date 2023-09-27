import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PunchClockPage } from './punch-clock.page';

describe('PunchClockPage', () => {
  let component: PunchClockPage;
  let fixture: ComponentFixture<PunchClockPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PunchClockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
