

var _userList = [];
var _db;
var _fileUtils;
var _user;
var _User = require('../object/User');

function UserManager(db, fileUtils) {
	// body...
	_db = db;
	_fileUtils = fileUtils;
	_fileUtils.logger('UserManager: started!');
	this.setUserList();
}

UserManager.prototype.createUser = function(userObject) {
	// body...
};
UserManager.prototype.checkUser = function(email, password, _bcrypt, fn) {
	// body...

};
UserManager.prototype.deleteUser = function(user_id) {
	// body...
};
UserManager.prototype.getUser = function(email, fn) {
	// body...
	_db.getUserInfo(email, function(userInfo){
		_fileUtils.logger(userInfo);
		if (Object.keys(userInfo).length > 0) {
			_user = new _User(
				userInfo.first_name, 
				userInfo.last_name, 
				userInfo.country, 
				userInfo.id, 
				userInfo.email, 
				userInfo.place_birth, 
				userInfo.date_birth, 
				userInfo.user_skills, 
				userInfo.date_creation
			);
			_fileUtils.logger(_fileUtils.stringifyJSON(_user.getUserJSON()));
			fn(true, _user);
		}else{
			fn(false);
		}
	});
};
UserManager.prototype.getList = function() {
	// body...
};
UserManager.prototype.getUserByEmail = function (email) {
    for (var i = 0; i < _userList.length; i++){
        _fileUtils.logger('UserManager -> value ' +_fileUtils.stringifyJSON(_userList[i]));
        if(_userList[i].email === email)
            return _userList[i];
    }
};
UserManager.prototype.getUserById = function (id) {
    for (var i = 0; i < _userList.length; i++){
        _fileUtils.logger('UserManager -> value ' +_fileUtils.stringifyJSON(_userList[i]));
        if(_userList[i].id === id)
            return _userList[i].prenom +' '+_userList[i].nom;
    }
};
UserManager.prototype.userExists = function(first_argument) {
	// body...
};
UserManager.prototype.setUserList = function() {
	// body...
	_db.getUserList(function (found, data) {
		if(found){
            for (var i = 0; i < data.length; i++) {
                _user = new _User(
                    data[i].first_name,
                    data[i].last_name,
                    data[i].country,
                    data[i].id,
                    data[i].email,
                    data[i].place_birth,
                    data[i].date_birth,
                    data[i].user_skills,
                    data[i].date_creation
                );
                _userList.push(_user);
            }
		}
    });
};
UserManager.prototype.update = function(first_argument) {
    // body...
};

module.exports = UserManager;