import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CalendarPageRoutingModule,
	],
	declarations: [
		CalendarPage,
		CalendarComponent
	]
})
export class CalendarPageModule {}
