import { Component, ViewChild, PipeTransform, Pipe, EventEmitter, Output, Input } from '@angular/core';
import { getISOWeeksInYear, startOfISOYear, endOfISOYear, addWeeks, startOfWeek, addDays, getISOWeek, addYears, subYears, startOfYear, endOfYear, getISOYear, addMonths, getYear, endOfWeek, startOfDay, startOfMonth, endOfMonth, differenceInDays, isSameMonth, isBefore, getMonth, subMonths } from "date-fns";

@Component({
    selector: "ka-datepicker-custom",
    styleUrls: ['./datepicker-custom.component.scss'],
    templateUrl: "./datepicker-custom.component.html",
})

export class DatePickerCustomComponent {
    @Output('dateChanged') dateChanged = new EventEmitter();
    @Input('currentDateInput')  currentDate: Date;
    activeYear: number;
    activeMonth: any;
    monthData: any[];



    constructor() {

    }

    ngOnInit() {
        this.currentDate = startOfDay(new Date());
        this.monthData = this.generateMonthData(this.currentDate);
        console.log(this.monthData);
    }
    ngOnChanges(changes) {
        if(changes.currentDate && changes.currentDate.currentValue){
            this.currentDate = startOfDay(this.currentDate);
            this.monthData = this.generateMonthData(this.currentDate);
        }
      console.log("changes", changes)
    }
    generateMonthData(date) {

        const weekStartsOn = 1; // week starts on Monday
        let currentDate = startOfDay(date);
        let activeMonthStart = startOfMonth(currentDate);
        this.activeMonth = date.toLocaleString("en-us", { month: "long" });
        this.activeYear = getYear(date)
       
        const startDate: Date = startOfWeek(activeMonthStart, { weekStartsOn });
        const activeMonthEnd:Date = endOfMonth(activeMonthStart);
        const endDate: Date = endOfWeek(activeMonthEnd, { weekStartsOn });

        const days = [];
        const totalDays = differenceInDays(endDate, startDate)

        // month days
        for (let i = 0; i <= totalDays; i++) {
            const date: Date = addDays(startDate, i);
            let day:any = {}
            day.date = date;
            day.inMonth = (isSameMonth(date, activeMonthStart) ? true : false);
            days.push(day);
        }
        return days;
    }

    setDateToMidNight(date){
        return startOfDay(date);
    }

    onNextPrevClick(activeMonth, activeYear, scenario){
        let dateString = `${activeYear}, ${activeMonth}, 1`
        let monthStartDate = new Date (dateString);
        let revisedDate: Date;
        if(scenario == "next"){
            revisedDate = addMonths(monthStartDate, 1);
        }
        else{
            revisedDate = subMonths(monthStartDate, 1);
        }
        this.monthData = this.generateMonthData(revisedDate);
    }

    onDateClick(date){
        this.currentDate = date;
        this.dateChanged.emit(date)
    }

}