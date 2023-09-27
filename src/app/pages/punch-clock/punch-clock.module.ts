import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PunchClockPageRoutingModule } from './punch-clock-routing.module';

import { PunchClockPage } from './punch-clock.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		PunchClockPageRoutingModule
	],
	declarations: [
		PunchClockPage
	]
})
export class PunchClockPageModule {}
