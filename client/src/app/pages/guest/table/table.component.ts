import { Component, OnInit } from '@angular/core';
import { IResponse } from 'app/core/interfaces/response';
import { IStudent } from 'app/core/interfaces/student';
import { StudentService } from 'app/core/services/student.service';
import { AlertService } from 'wacom';

export type INewStudent = Omit<IStudent, '_id'>;

@Component({
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	newStudent: INewStudent = {} as INewStudent;

	editableStudent: IStudent;

	isNewStudent = false;

	search: string;

	sortBy = '';

	constructor(
		public studentService: StudentService,
		private _alert: AlertService
	) {}

	ngOnInit(): void {
		this.studentService.getAll();
	}

	saveNewStudentInfo(key: keyof INewStudent, event: Event): void {
		const target = event.target as HTMLInputElement;

		this.newStudent[key] = target.innerText;
	}

	createStudent(): void {
		this.studentService.create(
			this.newStudent,
			(resp: IResponse) => {
				if (resp.status) {
					this._alert.success({
						text: 'Студент успішно доданий'
					});

					if (resp.data) {
						this.studentService.students.push(
							resp.data[0] as IStudent
						);
					}

					this.isNewStudent = false;
				}
			},
			(err) => {
				this._errCb(err);
			}
		);
	}

	deleteStudent(_id: string): void {
		this._alert.show({
			text: 'Зачекайте, відбувається видалення студента...'
		});

		this.studentService.delete(_id, () => {
			this._alert.destroy();

			this._alert.success({
				text: 'Студент успішно видалений'
			});

			const index = this.studentService.students.findIndex(
				(student) => student._id === _id
			);

			if (index !== -1) {
				this.studentService.students.splice(index, 1);
			}
		});
	}

	updateStudent(): void {
		this.studentService.update(this.editableStudent, (resp) => {
			this.editableStudent = {} as IStudent;
		});
	}

	prepareToEdit(student: IStudent): void {
		if (this.editableStudent) {
			this.cancelEditing(this.editableStudent._id as string);
		}

		this.editableStudent = JSON.parse(JSON.stringify(student));
	}

	saveStudentInfo(key: keyof IStudent, event: Event): void {
		const target = event.target as HTMLInputElement;

		this.editableStudent[key] = target.innerText;
	}

	cancelEditing(_id: string): void {
		const index = this.studentService.students.findIndex(
			(student) => student._id === this.editableStudent._id
		);

		const student = this.studentService.students.find(
			(student) => student._id === this.editableStudent._id
		);

		if (index !== -1 && student) {
			this.studentService.students.splice(index, 1);

			setTimeout(() => {
				this.studentService.students.splice(index, 0, student);
			}, 0);
		}

		this.editableStudent = {} as IStudent;
	}

	cancelCreating(): void {
		this.newStudent = {} as INewStudent;

		this.isNewStudent = false;
	}

	onChangeSort(): void {
		this.studentService.students.sort((a: IStudent, b: IStudent) => {
			if (
				a[this.sortBy as keyof IStudent] <
				b[this.sortBy as keyof IStudent]
			) {
				return -1;
			}

			return 1;
		});
	}

	isEditable(_id: string): boolean {
		return this.editableStudent?._id === _id;
	}

	private _errCb(err: IResponse): void {
		this._alert.destroy();

		this._alert.error({
			text: JSON.stringify(err.message)
		});
	}
}
