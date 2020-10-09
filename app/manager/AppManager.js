

var _db;
var _fileUtils;

var _pageManager;
var _projectManager;
var _fileManager;
var _communityManager;
var _userManager;

var projectManager = require('../manager/ProjectManager');
var fileManager = require('../manager/FileManager');
var communityManager = require('../manager/CommunityManager');
var UserManager = require('../manager/UserManager');


function AppManager(db, fileUtils) {
	// body...
	_db = db;
	_fileUtils = fileUtils;
	/*console.log('created!');
	_userManager = new UserManager(_db, fileUtils);
	_userManager.getUser('davidsibato@to-sala.com', function(found, user){
		if(found){
			fileUtils.logger('appManager -> '+user.getNom());
		}
	});*/
}

module.exports = AppManager;