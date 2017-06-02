import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarOffsetComponent } from './calendar-offset.component';

describe('CalendarOffsetComponent', () => {
  let component: CalendarOffsetComponent;
  let fixture: ComponentFixture<CalendarOffsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarOffsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
