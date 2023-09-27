import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.page.html',
	styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

	@ViewChild(CalendarComponent) calendar: CalendarComponent;
	
	constructor(
		private route: ActivatedRoute
	) { }
	
	ngOnInit() {

		this.route.queryParams.subscribe(() => {
			
			if (this.calendar) {
				this.calendar.loadEvents();
			}

		});
	}
	
	ngAfterViewInit() {
	}
}
