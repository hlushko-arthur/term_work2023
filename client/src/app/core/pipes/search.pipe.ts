import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from '../interfaces/student';

@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {
	transform(
		students: IStudent[],
		search: string,
		keys?: string[]
	): IStudent[] {
		if (!students || !search) {
			return students;
		}

		if (!keys) {
			keys = Object.keys(students[0]);
		}

		search = search.toLowerCase();

		return students.filter((student: IStudent) => {
			return keys?.some((key) => {
				const propertyValue = student[key as keyof IStudent];

				if (propertyValue && typeof propertyValue === 'string') {
					return propertyValue.toLowerCase().includes(search);
				}

				return false;
			});
		});
	}
}
