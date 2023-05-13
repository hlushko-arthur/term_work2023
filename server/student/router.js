const Student = require(__dirname + '/schema.js');

const mongoose = require('mongoose');
module.exports = async function (waw) {

	if (mongoose.connection.readyState == 0) {
		mongoose.connect(waw.mongoUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		});

		mongoose.Promise = global.Promise;
	}

	const router = waw.router('/api/student');

	router.post('/createOne', async (req, res) => {
		try {
			const createdStudent = await Student.create(req.body);
			res.json({ status: true, data: [createdStudent] });
		} catch (err) {
			res.status(500).json({
				message: 'An error occurred while creating the student',
				error: err
			});
		}
	});

	router.get('/getAll', async (req, res) => {
		try {
			const students = await Student.find({});
			res.status(200).json({
				status: true,
				data: students
			});
		} catch (err) {
			res.status(500).json({
				message: 'An error occurred while retrieving students',
				error: err
			});
		}
	})

	router.post('/deleteOne', async (req, res) => {
		try {
			const deletedStudent = await Student.findOneAndDelete({
				_id: req.body._id
			})

			if (!deletedStudent) {
				return res.status(404).json({ status: false, message: 'Student not found' })
			}

			res.status(200).json({ status: true, message: 'Student deleted successfully' });
		} catch (err) {
			res.status(500).json({
				message: 'An error occurred while deleting the student',
				error: err
			});
		}
	})

	router.post('/updateOne', async (req, res) => {
		try {

			const updatedStudent = await Student.updateOne({ _id: req.body._id }, req.body);

			if (updatedStudent.n === 0) {
				return res.status(404).json({ status: false, message: 'Student not found' });
			}

			res.status(200).json({
				status: true,
				data: [updatedStudent],
			});
		} catch (err) {
			res.status(500).json({
				message: 'An error occurred while updating the student',
				error: err,
			});
		}
	});
};