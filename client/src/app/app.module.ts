import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { AppComponent } from './app.component';
import { CoreModule } from 'app/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule } from 'wacom';
import { environment } from 'environments/environment';

const routes: Routes = [
	{
		path: '',
		children: [
			/* guest */
			{
				path: '',
				data: {
					meta: {
						title: 'Info'
					}
				},
				loadChildren: () =>
					import('./pages/guest/table/table.module').then(
						(m) => m.TableModule
					)
			}
		]
	}
];

@NgModule({
	declarations: [AppComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: 'AH',
					titleSuffix: ' | AH',
					'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
