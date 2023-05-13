import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WacomModule } from 'wacom';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
	declarations: [SearchPipe],
	exports: [CommonModule, FormsModule, WacomModule, SearchPipe],
	imports: [CommonModule, FormsModule, WacomModule]
})
export class CoreModule {}
