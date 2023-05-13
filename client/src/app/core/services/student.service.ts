import { Injectable } from '@angular/core';
import { HttpService } from 'wacom';
import { IStudent } from '../interfaces/student';
import { INewStudent } from 'app/pages/guest/table/table.component';
import { IResponse } from '../interfaces/response';

@Injectable({
	providedIn: 'root'
})
export class StudentService {
	students: IStudent[] = [];

	constructor(private _http: HttpService) {}

	getAll(
		cb = (_resp: IResponse): void => undefined,
		errCb = (_err: IResponse): void => undefined
	): void {
		this._http.get('/api/student/getAll', (resp: IResponse) => {
			if (resp.status) {
				this.students = resp.data as IStudent[];

				cb(resp);
			} else {
				errCb(resp);
			}
		});
	}

	create(
		student: INewStudent,
		cb = (_resp: IResponse): void => undefined,
		errCb = (_err: IResponse): void => undefined
	): void {
		this._http.post(
			'/api/student/createOne',
			student,
			(resp: IResponse) => {
				if (resp.status) {
					cb(resp);
				} else {
					errCb(resp);
				}
			}
		);
	}

	update(
		student: IStudent,
		cb = (_resp: IResponse): void => undefined,
		errCb = (_err: IResponse): void => undefined
	): void {
		this._http.post(
			'/api/student/updateOne',
			student,
			(resp: IResponse) => {
				if (resp.status) {
					cb(resp);
				} else {
					errCb(resp);
				}
			}
		);
	}

	delete(
		_id: string,
		cb = (_resp: IResponse): void => undefined,
		errCb = (_err: IResponse): void => undefined
	): void {
		this._http.post(
			'/api/student/deleteOne',
			{
				_id: _id
			},
			(resp: IResponse) => {
				if (resp.status) {
					cb(resp);
				} else {
					errCb(resp);
				}
			}
		);
	}
}
