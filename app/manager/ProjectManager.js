

var projectList = [];
var _db;
var _fileUtils;

function ProjectManager(db, fileUtils) {
	// body...
	_db = db;
	_fileUtils = fileUtils;
	_fileUtils.logger('Worked!');
	//_fileUtils.logger(_fileUtils.stringifyJSON(this));
}

/*Public methods*/
ProjectManager.prototype.addProject = addProject;
ProjectManager.prototype.editProject = editProject;
ProjectManager.prototype.removeProject = removeProject;
ProjectManager.prototype.getLastFiveProjects = getLastFiveProjects;
ProjectManager.prototype.getPublicProjects = getPublicProjects;
ProjectManager.prototype.getHomePublicProjects = getHomePublicProjects;
ProjectManager.prototype.getGroupProjects = getGroupProjects;
ProjectManager.prototype.deleteProject = removeProject;

/*Test methods*/
ProjectManager.prototype.getList = getList;

/*Protected methods*/
function addProject(data, fn) {
	// body...
	/*projectList.push(data);
	fn(true);
	var tab = this.getList();
	for (var i = 0; i < tab.length; i++) {
		_fileUtils.logger(_fileUtils.stringifyJSON(tab[i]));
	}*/
	_fileUtils.logger(_fileUtils.stringifyJSON(data))
	var _dbObject = {};
	_dbObject.name = data.name;
	_dbObject.type = data.projectType;
	_dbObject.category = 1;
	_dbObject.group_id = data.groupNumber;
	_dbObject.description = data.description;
	_dbObject.user_id = data.user_id;
	_dbObject.range_project = data.projectRange;
	_dbObject.date_creation = _fileUtils.newDate();

	_db.addProject(_dbObject, (isSaved, idProject) => {
		fn(isSaved, idProject);
	});
}
function editProject(data) {
	// body...
}
function getLastFiveProjects(userId, five, fn) {
	// body...
	_db.getLastFiveUserProjects(userId, five, (loaded, projects) => {
		fn(loaded, projects);
	});
}
function getList() {
	// body...
	return projectList;
}
function getProject(data) {
	// body...
}
function getHomePublicProjects(fn) {
	// body...
	_db.getHomePublicProjects(fn);
}
function getPublicProjects(fn) {
	// body...
	_db.getPublicProjects(fn);
}
function getGroupProjects(groupNumber, fn) {
	// body...
	_db.getGroupProjects(groupNumber, fn);
}
function removeProject(data, fn) {
	// body...
	_db.deleteProject(data, fn);
}

module.exports = ProjectManager;