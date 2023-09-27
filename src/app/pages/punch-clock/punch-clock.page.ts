import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PunchService } from 'src/app/services/punch.service';

@Component({
	selector: 'app-punch-clock',
	templateUrl: './punch-clock.page.html',
	styleUrls: ['./punch-clock.page.scss'],
})
export class PunchClockPage implements OnInit {

	public date: string;
	public dateObj: moment.Moment;
	public expectedWorkedDayHours: number = 8.8;

	public punches: any[] = [];

	public workedData: any;
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private punchService: PunchService
	) {
	}
	
	ngOnInit() {

		this.route.queryParams.subscribe(params => {

			if (params && params['date']) {
				this.date = params['date'];
			
			} else {
				this.date = moment().format('YYYY-MM-DD');
			}

			this.dateObj = moment(this.date);

			this.loadDatePunches();

		});
	}

	prevDay() {

		this.dateObj.subtract(1, 'days');

		this.date = this.dateObj.format('YYYY-MM-DD');

		this.loadDatePunches();
	}

	nextDay() {

		this.dateObj.add(1, 'days');

		this.date = this.dateObj.format('YYYY-MM-DD');

		this.loadDatePunches();
	}

	onDateChange(event?: any) {

		this.dateObj = moment(this.date);

		this.loadDatePunches();
	}

	onPunchChange(shiftIndex: number, punchIndex: number) {

		let startPunch = this.punches[shiftIndex][0];
		
		let endPunch = this.punches[shiftIndex][1];

		if (startPunch.date && endPunch.date && startPunch.date > endPunch.date) {
			
			this.punches[shiftIndex][punchIndex].date = null;

			return alert('A hora de entrada não pode ser maior que a de saída!');
		}

		this.storeDatePunches();
	}

	onExpectedWorkedDayHoursChange(event?: any) {

		this.punchService.saveExpectedWorkedDayHours(
			this.date,
			this.expectedWorkedDayHours
		);

		this.refreshWorkedData();
	}

	addWorkShift() {

		this.punches.push([
			{date: null},
			{date: null},
		]);
	}

	rmvWorkShift(index: number) {

		this.punches.splice(index, 1);

		this.storeDatePunches();
	}

	punchClockNow(): any {

		let time = moment().format('HH:mm');

		for (let i = 0; i < this.punches.length; i++) {

			let shift = this.punches[i];

			if (!shift[0].date) {
				this.punches[i][0].date = time;
				this.storeDatePunches();
				return;
	
			} else if (!shift[1].date) {
				this.punches[i][1].date = time;
				this.storeDatePunches();
				return;
			}
		}

		this.addWorkShift();
		this.punches[this.punches.length - 1][0].date = time;
		this.storeDatePunches();
	}

	private loadDatePunches() {

		this.expectedWorkedDayHours = this.punchService.getExpectedWorkedDayHours(this.date);

		this.punches = this.punchService.getDatePunches(this.date);

		this.workedData = this.punchService.getDateWorkedData(this.date);
	}

	private storeDatePunches() {

		this.punchService.saveDatePunches(
			this.date,
			this.punches
		);

		this.refreshWorkedData();
	}
	
	private refreshWorkedData() {
		
		this.workedData = this.punchService.getDateWorkedData(this.date);
	}
}
