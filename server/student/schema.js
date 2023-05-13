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

schema.methods.create = function (obj, user, sd) {
	this.fullName = obj.fullName,
		this.educationalProgram = obj.educationalProgram,
		this.completionYear = obj.completionYear,
		this.studyForm = obj.studyForm,
		this.studyType = obj.studyType,
		this.groupCode = obj.fullName,
		this.studentsNumber = obj.studentsNumber,
		this.additionalInfo = obj.additionalInfo
}

module.exports = mongoose.model('Student', schema);