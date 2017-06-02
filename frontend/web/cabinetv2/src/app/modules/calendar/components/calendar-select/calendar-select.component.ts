import {Component, OnInit, Input} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";

@Component({
  selector: 'app-calendar-select',
  templateUrl: './calendar-select.component.html',
  styleUrls: ['./calendar-select.component.css']
})
export class CalendarSelectComponent implements OnInit {

  @Input() prop: string;
  value: number;

  constructor(
    private calendarService: CalendarService
  ) {

  }

  changeValue(dir: number) {
    this.calendarService.set(this.prop, this.value + dir)
  }

  ngOnInit() {

    this.value = this.calendarService.getDefault(this.prop);

    this.calendarService[`${this.prop}$`].subscribe(propValue => {
      console.log('prop: ', propValue);
      this.value = propValue;
    });
  }

}
