/*SessionManager Class*/
/*This is the SessionManager class of the app*/
/*File version : 1.0.0*/

var _sessionList = [];
var _fileManager;
var _fileUtils;
var _sessionStarted = false;
var _inst;
var _session;
var SessionObject = require('../object/Session');

function SessionManager(src, fileManager) {
	// body...
    _fileUtils = src.FileUtils;
    _fileManager = fileManager;
    _fileUtils.logger('Session!');
    this.start();
    _inst = this;
}

SessionManager.prototype.start = function () {
    _fileUtils.logger('Session started!');
    var sessionFile = _fileManager.getSessionFile();
    if(sessionFile !== null){
        _fileUtils.logger(sessionFile);
        var sessionJSON = JSON.parse(sessionFile);
        //_fileUtils.logger(sessionJSON.user[0].nom);
        _sessionList = sessionJSON.user;
        _fileUtils.logger(_fileUtils.stringifyJSON(_sessionList));
        _fileUtils.logger(this.count());
        _fileUtils.logger(this.isStarted());
        _fileUtils.logger(this.getList());
        //this.set("david.sibato@to-sala.com");
        if(_sessionList.length > 0){
            for (var i = 0; i < _sessionList.length; i++){
                _fileUtils.logger(_fileUtils.stringifyJSON(_sessionList[i]));

                _session = new SessionObject(_fileUtils);
                _session.setId(_sessionList[i].id);
                _session.setUser(_sessionList[i].user);
                _session.setRemainingTime(_sessionList[i].remainingTime);
            }
        }
    }else{
        this.saveDefaultFile();
    }
    this.timer();
    _sessionStarted = true;
    _fileUtils.logger(this.isStarted());
};
SessionManager.prototype.has = function (user) {
    /*_sessionList.forEach(function (element) {
        return element === user;
    });*/
    for (var i = 0; i < _sessionList.length; i++){
        if(_sessionList[i].user === user){
            _fileUtils.logger(user);
            //return _sessionList[i].getSession
            return true;
        }
    }
};
SessionManager.prototype.get = function (user) {
    if(_sessionList.length > 0){
        for (var i = 0; i < _sessionList.length; i++){
            if(_sessionList[i].user === user){
                _fileUtils.logger(user);
               //return _sessionList[i].getSession
            }
        }
    }else{
        return null;
    }
};
SessionManager.prototype.set = function (user) {
    if(!this.has(user)){
        _session = new SessionObject(_fileUtils);
        _session.setId(_fileUtils.generateNumber());
        _session.setUser(user);
        _session.setRemainingTime(30000);
        _sessionList.push(_session.getSession());
    }
};
SessionManager.prototype.saveDefaultFile = function () {
    var tab = [];
    /*var jsonUser = {
        nom: "sibato",
        prenom: "david",
        skill: "1",
        remaining_time: "3600"
    };*/
    var finalJSON = {};
    //tab.push(jsonUser);
    finalJSON.user = tab;
    var stringify = _fileUtils.stringifyJSON(finalJSON);
    _fileManager.createSessionFile(stringify, function (created) {
        if(created){
            _fileUtils.logger('file created!');
        }
    });
};

SessionManager.prototype.saveFile = function (tab) {
    var finalJSON = {};
    finalJSON.user = tab;
    var stringify = _fileUtils.stringifyJSON(finalJSON);
    _fileManager.createSessionFile(stringify, function (created) {
        if(created){
            _fileUtils.logger('file created!');
        }
    });
};
SessionManager.prototype.getList = function () {
    return _sessionList;
};
SessionManager.prototype.replace = function (tab) {
    
};
SessionManager.prototype.remove = function (user) {
    for(var i in _sessionList){
        if(_sessionList[i].user === user){
            _sessionList.splice(i, 1);
            _fileUtils.logger(user+' deleted!!!!');
            _fileUtils.logger(_sessionList.length);
            break;
        }
    }
};
SessionManager.prototype.clear = function () {
    _fileManager.deleteSessionFile(function (done) {
        if(done){
            _sessionList = [];
        }
    });
};
SessionManager.prototype.isStarted = function () {
    return _sessionStarted;
};
SessionManager.prototype.count = function () {
    return _sessionList.length;
};
SessionManager.prototype.timer = function () {
    setInterval(function () {
        _inst.saveFile(_sessionList);
    }, 200000);
};
module.exports = SessionManager;