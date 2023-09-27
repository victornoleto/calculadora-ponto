import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TabsComponent } from './components/tabs/tabs.component';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsComponent,
		children: [
			{
				path: 'home',
				loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
			},
			{
				path: 'calendar',
				loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
			},
			{
				path: 'punch-clock',
				loadChildren: () => import('./pages/punch-clock/punch-clock.module').then( m => m.PunchClockPageModule)
			},
			{
				path: '',
				redirectTo: 'punch-clock',
				pathMatch: 'full'	
			}
		]
	},
	{
		path: '',
		redirectTo: 'tabs',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules
		})
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }
