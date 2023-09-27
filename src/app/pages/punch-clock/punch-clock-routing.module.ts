import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PunchClockPage } from './punch-clock.page';

const routes: Routes = [
  {
    path: '',
    component: PunchClockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PunchClockPageRoutingModule {}
