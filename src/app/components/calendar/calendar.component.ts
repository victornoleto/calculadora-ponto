import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PunchService } from 'src/app/services/punch.service';

@Component({
	selector: 'calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent  implements OnInit {

	public weeks: any[] = [];
	public month: moment.Moment;

	public weekdayNames: string[] = [
		'Dom.',
		'Seg.',
		'Ter.',
		'Qua.',
		'Qui.',
		'Sex.',
		'Sáb.'
	];
	
	constructor(
		private router: Router,
		private punchService: PunchService
	) {}
	
	ngOnInit() {

		this.todayMonth();
	}

	openDay(day: any) {

		this.router.navigate(['/tabs/punch-clock'], {
			queryParams: {
				date: day.formatted
			}
		});
	}

	prevMonth() {
		
		this.createMonth(
			this.month.subtract(1, 'month').format('YYYY-MM')
		);
	}
	
	nextMonth() {
		
		this.createMonth(
			this.month.add(1, 'month').format('YYYY-MM')
		);
	}

	todayMonth() {
		
		this.createMonth(
			moment().format('YYYY-MM')
		);
	}

	loadEvents() {

		this.weeks.forEach((week: any[]) => {

			week.forEach((day: any) => {

				day.workedData = this.punchService.getDateWorkedData(day.formatted);

			});

		});
	}

	private createMonth(month: string) {

		let date = moment(month + '-01');

		this.month = date.clone();

		let weeks = [];
		let week = [];

		while (true) {

			week.push(
				this.getDateObject(date.clone())
			);

			if (date.weekday() == 6) {
				weeks.push(week);
				week = [];
			}

			if (date.month() != moment(month + '-01').month()) {
				break;
			}

			date = date.add(1, 'days');
		}

		if (week.length > 0) {

			while (week.length < 7) {

				date = date.add(1, 'days');

				week.push(
					this.getDateObject(date.clone())
				);
			}
			
			weeks.push(week);
		}

		if (weeks[0].length < 7) {

			date = weeks[0][0].date.clone();

			while (weeks[0].length < 7) {

				date = date.subtract(1, 'days');

				weeks[0].unshift(
					this.getDateObject(date.clone())
				);
			}
		}

		this.weeks = weeks;
		this.loadEvents();
	}

	private getDateObject(date: moment.Moment) {

		return {
			date: date,
			isCurrentMonth: date.month() == this.month.month(),
			isToday: date.isSame(moment(), 'day'),
			day: date.date(),
			weekday: date.weekday(),
			week: date.week(),
			formatted: date.format('YYYY-MM-DD'),
		};
	}
}
