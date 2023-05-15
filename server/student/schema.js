var mongoose = require('mongoose');
var schema = mongoose.Schema({
	fullName: String,
	educationalProgram: String,
	completionYear: String,
	studyForm: String,
	studyType: String,
	groupCode: String,
	studentsNumber: Number,
	additionalInfo: String,
});

module.exports = mongoose.model('Student', schema);
