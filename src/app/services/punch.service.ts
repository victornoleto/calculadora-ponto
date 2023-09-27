import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class PunchService {
	
	constructor() { }

	getPunches() {

		let punches = this.get('punches') || {};

		return punches;
	}

	getDatePunches(date: string) {

		let punches = this.getPunches();

		let defaultPunches = [
			[
				{date: null},
				{date: null},
			],
			[
				{date: null},
				{date: null},
			]
		];

		return punches[date] || defaultPunches;
	}

	saveDatePunches(date: string, datePunches: any[]) {

		let punches = this.get('punches') || {};

		punches[date] = datePunches;

		this.save('punches', punches);
	}

	getDateWorkedData(date: string) {

		let dayWorkHours = this.getExpectedWorkedDayHours(date);

		let [workedMinutes, punchesCount] = this.getDateWorkedMinutes(date, dayWorkHours);

		let workedTime = this.minutesToTime(workedMinutes);

		let balance = workedMinutes - (dayWorkHours * 60);

		return {
			punchesCount,
			workedMinutes,
			workedTime,
			balance,
			balanceTime: this.minutesToTime(balance > 0 ? balance : balance * -1)
		}
	}

	getDateWorkedMinutes(date: string, dayWorkHours: number) {

		let punches = this.getDatePunches(date);

		let workedMinutes = 0;
		let punchesCount = 0;

		punches.forEach((shift: any[], shiftIndex: number) => {

			let shiftWorkedMinutes = 0;

			let startPunch = shift[0];
			let endPunch = shift[1];

			if (startPunch.date) punchesCount++;
			if (endPunch.date) punchesCount++;

			if (startPunch.date && endPunch.date) {

				let start = moment(startPunch.date, 'HH:mm');
				let end = moment(endPunch.date, 'HH:mm');

				shiftWorkedMinutes = end.diff(start, 'minutes');
			}

			workedMinutes += shiftWorkedMinutes;

		});

		let tolerance = 10;

		if (workedMinutes >= (dayWorkHours * 60) - tolerance && workedMinutes <= (dayWorkHours * 60) + tolerance) {
			workedMinutes = dayWorkHours * 60;
		}

		return [workedMinutes, punchesCount];
	}

	minutesToTime(minutes: number) {
		
		let hours = Math.floor(minutes / 60);

		let minutesLeft = minutes % 60;

		return `${hours.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}`;
	}

	saveExpectedWorkedDayHours(date: string, value: number) {

		let data = this.get('expectedWorkedDayHours') || {};

		data[date] = value;

		this.save('expectedWorkedDayHours', data);
	}

	getExpectedWorkedDayHours(date: string) {

		let data = this.get('expectedWorkedDayHours') || {};

		return data[date] || 8.8;
	}

	private save(key: string, value: any) {

		let disk = this.getDisk();

		disk[key] = value;

		localStorage.setItem('calculadora-ponto', JSON.stringify(disk));
	}

	private get(key: string) {

		let disk = this.getDisk();
		
		return disk[key] || null;
	}
	
	private getDisk() {
		
		let disk: any = localStorage.getItem('calculadora-ponto');
	
		if (disk) {
			disk = JSON.parse(disk);
	
		} else {
			disk = {};
		}

		return disk;
	}
}
