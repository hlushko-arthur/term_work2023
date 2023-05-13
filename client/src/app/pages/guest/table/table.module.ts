import { NgModule } from '@angular/core';
import { CoreModule } from 'app/core';
import { TableComponent } from './table.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TableComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TableComponent],
	providers: []
})
export class TableModule {}
