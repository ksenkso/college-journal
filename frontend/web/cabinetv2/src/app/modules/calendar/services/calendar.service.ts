import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Subject, Observable, BehaviorSubject} from "rxjs";

@Injectable()
export class CalendarService {

  private date: Date = new Date();
  private day: Subject<number> = new Subject<number>();
  private month: BehaviorSubject<number> = new BehaviorSubject<number>(this.date.getMonth());
  private year: BehaviorSubject<number> = new BehaviorSubject<number>(this.date.getFullYear());
  private offset: Subject<number> = new Subject<number>();
  private dayCount: Subject<number> = new Subject<number>();

  day$ = this.day.asObservable();
  month$ = this.month.asObservable();
  year$ = this.year.asObservable();
  offset$ = this.offset.asObservable();
  dayCount$ = this.dayCount.asObservable();

  constructor(private http: Http) {

    this.day.next(this.date.getDate());
    this.month.next(this.date.getMonth());
    this.year.next(this.date.getFullYear());

    this.offset.next(this.getOffset(this.date.getFullYear(), this.date.getMonth()));
    this.dayCount.next(this.getDaysCount(this.date.getFullYear(), this.date.getMonth()));

  }

  private getDaysCount(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }

  private getOffset(year: number, month: number): number {

    return 7 - (7 - (new Date(year, month, 1)).getDay())

  }


  getDefault(prop: string): number {
    switch (prop) {
      case 'day': {
        return this.date.getDate();
      }
      case 'month': {
        return this.date.getMonth();
      }
      case 'year': {
        return this.date.getFullYear();
      }
    }
  }

  set(key, value) {
    switch (key) {
      case 'day': {
        this.setDay(value);break;
      }
      case 'month': {
        if (value >= 11) {
          this.setYear(this.year.getValue()+1);
          this.setMonth(0);
          return;
        }
        if (value <= 0) {
          this.setYear(this.year.getValue()-1);
          this.setMonth(11);
          return;
        }
        this.setMonth(value);
        break;
      }
      case 'year': {
        this.setYear(value);break;
      }
    }
  }

  private setDay(day: number): void {
    this.day.next(day);
  }

  private setMonth(month: number): void {
    this.dayCount.next(this.getDaysCount(this.year.getValue(), month));
    this.month.next(month);
  }

  private setYear(year: number): void {
    this.dayCount.next(this.getDaysCount(year, this.month.getValue()));
    this.year.next(year);
  }

}
