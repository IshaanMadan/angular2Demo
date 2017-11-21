import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AGGridComponent }      from './agGrid/agGrid.component';
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';


const routes: Routes = [
  { path: 'ag-grid', component: AGGridComponent },
  { path: 'week-carousel', component: WeekCalendarComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

