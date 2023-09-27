import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PunchService } from '../services/punch.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	public balance: number;
	public balanceTime: string;
	
	constructor(
		private route: ActivatedRoute,
		private punchService: PunchService
	) {}

	ngOnInit() {

		this.route.queryParams.subscribe(() => {
			this.refresh();
		});
	}

	refresh() {

		let balance = 0;

		let punches = this.punchService.getPunches();

		for (let date in punches) {

			let dateData = this.punchService.getDateWorkedData(date);

			balance += dateData.balance;
		}

		this.balance = balance;
		this.balanceTime = this.punchService.minutesToTime(balance > 0 ? balance : balance * -1);
	}
}
