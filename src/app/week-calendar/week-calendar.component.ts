import { Component, ViewChild, PipeTransform, Pipe } from '@angular/core';
import { getISOWeeksInYear, startOfISOYear, endOfISOYear, addWeeks, startOfWeek, addDays, getISOWeek, addYears, subYears, startOfYear, endOfYear, getISOYear, addMonths, getYear, endOfWeek } from "date-fns";

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}

@Component({
    selector: "ka-week-calendar",
    styleUrls: ['./week-calendar.component.scss'],
    templateUrl: "./week-calendar.component.html",
    providers: [ KeysPipe ]
})

export class WeekCalendarComponent {
    firstTimeSpin: boolean = false;
    calenderReloadSpin: boolean = false;
    maxDatePickerDate: Date;
    minDatePickerDate: Date;
    currentISOYear: Date;
    yearArray: any[];
    @ViewChild('slickModal') slickModal;

    public weeksDataObj = {};
    public todayDate: Date;
    public slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "infinite": false };
    public carouselSliding: boolean = false;
    public currentISOWeek: number;
    public currentSelectedDate: any;
    public selectedDate: any;
    public weekCalendarStartDate;
    public weekCalendarEndDate;
    public dummyDaySelect = [
        {
            label: "1",
            value: "1"
        }, {
            label: "2",
            value: "2"
        }, {
            label: "3",
            value: "3"
        },
        {
            label: "4",
            value: "4"
        },
        {
            label: "5",
            value: "5"
        },
        {
            label: "6",
            value: "6"
        }, {
            label: "7",
            value: "7"
        }
    ];
    public dummyMonthSelect = [
        {
            label: "Jan",
            value: "Jan"
        }, {
            label: "Feb",
            value: "Feb"
        }, {
            label: "Mar",
            value: "Mar"
        },
        {
            label: "Apr",
            value: "Apr"
        },
        {
            label: "May",
            value: "May"
        },
        {
            label: "Jun",
            value: "Jun"
        }
    ];
    public dummyYearSelect = [
        {
            label: "2011",
            value: "2011"
        }, {
            label: "2012",
            value: "2012"
        }, {
            label: "2013",
            value: "2013"
        },
        {
            label: "2014",
            value: "2014"
        },
        {
            label: "2015",
            value: "2015"
        },
        {
            label: "2016",
            value: "2016"
        },
        {
            label: "2017",
            value: "2017"
        }
    ];
    public spinnerShow = false;
    public slideAnimationCount = 0 

    constructor() {
        this.todayDate = new Date();
        this.currentSelectedDate = new Date();
        this.currentSelectedDate.setHours(0, 0, 0, 0);
        this.currentISOYear = new Date(this.todayDate.getFullYear(), 0, 5);
        this.minDatePickerDate = startOfISOYear(subYears(this.currentISOYear, 1));
        this.maxDatePickerDate = endOfISOYear(addYears(this.currentISOYear, 2));
        // this.maxDatePickerDate = endOfISOYear(this.currentISOYear);
        this.currentISOWeek = getISOWeek(this.todayDate);
        // this.yearArray = [subYears(this.currentISOYear, 1), this.currentISOYear, addYears(this.currentISOYear, 1), addYears(this.currentISOYear, 2)]
        this.yearArray = [this.currentISOYear]
        // this.weeksDataObj = this.generateWeekData(this.todayDate, this.yearArray);
        this.generateWeekSlides(this.todayDate);
        // let { startDate, endDate } = this.getStartEndDate(this.todayDate);
        // this.weeksDataObj = this.generateWeekData(startDate, endDate);
        console.log("this.weeksDataObj", this.weeksDataObj);
    }

    ngOnInit() {
        this.firstTimeSpin = true;
        this.spinnerShow = true;
        let slideNumber = this.getSlideNumberFromDate(this.todayDate, this.weeksDataObj);
        this.repositionWeekSlide(slideNumber, 'onInit');
    }

    generateWeekSlides(date) {
        let { startDate, endDate } = this.getStartEndDate(date);
        this.weekCalendarStartDate = startDate;
        this.weekCalendarEndDate = endDate;
        //NProgress.start();
        this.spinnerShow = true;
        this.slideAnimationCount = 0

        this.weeksDataObj = this.generateWeekData(startDate, endDate);
        console.log("this.weeksDataObj", this.weeksDataObj);

        let slideNumber = this.getSlideNumberFromDate(this.currentSelectedDate, this.weeksDataObj);
        this.repositionWeekSlide(slideNumber, 'onInit');
        //NProgress.done();
    }

    /**
     * Generate data for carousel using ISO weeks.
     * First Day of the week is Monday.
     * First day of the year is First Monday of the year.
     * First ISO week is the week with first monday of the year.
     * @param startDate- date to begin slide from  (must be monday)
     * @param endDate- date uptlll which the slide data should be produced (must be sunday)
     */

    generateWeekData(startDate, endDate) {
        let startDateWeekNo = getISOWeek(startDate);
        let endDateWeekNo = getISOWeek(endDate);
        let allWeeksArray = [];

        let counter = 0;
        while (true) {        // running infininte loop until endDate is met.
            let weekDays: any = {}
            weekDays.mon = startOfWeek(startDate, {
                weekStartsOn: 1
            });
            weekDays.tue = addDays(weekDays.mon, 1);
            weekDays.wed = addDays(weekDays.mon, 2);
            weekDays.thu = addDays(weekDays.mon, 3);
            weekDays.fri = addDays(weekDays.mon, 4);
            weekDays.sat = addDays(weekDays.mon, 5);
            weekDays.sun = addDays(weekDays.mon, 6);
            allWeeksArray.push({
                weekDays: weekDays,
                weekNo: getISOWeek(startDate),
                year: getISOYear(startDate)
            });
            startDate = addWeeks(startDate, 1);

            if (weekDays.sun.getTime() == endDate.getTime()) {        // break the loop if endDate has been reached
                break;
            }
            if(counter == 100 ){
                console.log("break due to counter exceed")
                break;
            }
            counter ++;
        }
        return allWeeksArray;
    }


    beforeSlideChange(e) {
        this.carouselSliding = true;
        if (this.slideAnimationCount != 0) {
            this.currentSelectedDate = undefined;
        }
        this.slideAnimationCount++;
    }

    afterSlideChange(e) {
        this.carouselSliding = false;
    }

    onDateSelectFromDatePicker(date) {
        this.currentSelectedDate = date;
        this.slideAnimationCount = 0;
        this.checkIfDatePresentInSlide(date);

    }

    checkIfDatePresentInSlide(date) {
        if (date >= this.weekCalendarStartDate && date <= this.weekCalendarEndDate) {
            this.jumpToParticularWeek(date);
        } else {
            setTimeout(() => {
                this.generateWeekSlides(date);
                //this.shiftServiceObj.broadcastWeekCalendarDateChange(date);
            }, 0);
        }

    }


    jumpToParticularWeek(date) {
        let slideNumber = this.getSlideNumberFromDate(date, this.weeksDataObj);
        console.log("slideNumber", slideNumber);
        this.repositionWeekSlide(slideNumber, 'onDatePickerSelect');
        this.selectedDate = date;
        //this.shiftServiceObj.broadcastWeekCalendarDateChange(date);
    }

    getWeekDate(dateObj) {
        //alert(dateObj);
        this.currentSelectedDate = dateObj;
        //this.shiftServiceObj.broadcastWeekCalendarDateChange(dateObj);
    }

    getSlideNumberFromDate(date, weeksDataObj) {
        let selectedWeekNo = getISOWeek(date);

        for (let i = 0; i < weeksDataObj.length; i++) {
            if (weeksDataObj[i].weekNo == selectedWeekNo) {
                return i + 1;     // since slide begins from 1 instead of 0
            }
        }

        return null;
    }

    /**
     * Function used to move the slides to a particular week in the carousel
     * @param slideToNavigate number of week to slide
     * @param scenario  the scenario in which function is called. If OnInit- Use SetTimout as Carousel takes time to load
     * 
     */
    repositionWeekSlide(slideToNavigate, scenario) {
        if (scenario == 'onInit') {
            setTimeout(() => {
                this.slickModal.slickGoTo(slideToNavigate - 1);
                this.spinnerShow = false;
            }, 0);
        }
        else {
            this.slickModal.slickGoTo(slideToNavigate - 1);
        }
    }

    getStartEndDate(currentDate) {
        let startDate = addMonths(currentDate, -1);
        let endDate = addMonths(currentDate, 1);
        startDate = startOfWeek(startDate, {
            weekStartsOn: 1
        });
        endDate = endOfWeek(endDate, {
            weekStartsOn: 1
        });
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        return { startDate, endDate };
    }

}