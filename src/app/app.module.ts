import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { SlickModule } from 'ngx-slick';
import { SelectModule } from 'angular2-select';
import { CalendarModule } from 'primeng/components/calendar/calendar'; // required in multiple modules!!
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular/main';


import { AppComponent }        from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { AGGridComponent }      from './agGrid/agGrid.component';
import { WeekCalendarComponent, KeysPipe } from './week-calendar/week-calendar.component';
import { DatePickerCustomComponent } from './custom-datepicker/datepicker-custom.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SelectModule,
    CalendarModule,
    BrowserAnimationsModule,
    SlickModule.forRoot(),
    AppRoutingModule,
    AgGridModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    AGGridComponent,
    WeekCalendarComponent,
    DatePickerCustomComponent,
    KeysPipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }