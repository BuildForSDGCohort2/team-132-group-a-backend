/*Session Class*/
/*This is the Session class of the app*/
/*File version : 1.0.0*/

var _id;
var _user;
var _remaining_time;
var _timer;
var _fileUtils;

function Session(fileUtils) {
    _fileUtils = fileUtils;
}
Session.prototype.setId = function (id) {
    _id = id;
};
Session.prototype.setUser = function (user) {
    _user = user;
};
Session.prototype.setRemainingTime = function (time) {
    _remaining_time = time;
    this.timer();
};
Session.prototype.getID = function () {
    return _id;
};
Session.prototype.getUser = function () {
    return _user;
};
Session.prototype.getRemainingTime = function () {
    return _remaining_time;
};
Session.prototype.getSession = function () {
    return {
        id:_id,
        user:_user,
        remainingTime:_remaining_time
    };
};
Session.prototype.timer = function () {
    _fileUtils.logger(_remaining_time);
    if(_remaining_time === 0){
        clearInterval(_timer);
    }else {
        _timer = setInterval(function () {
            if(_remaining_time === 0){
                clearInterval(_timer);
            }else {
                var _calcul = parseInt(_remaining_time) - parseInt(1000);
                _fileUtils.logger(_calcul);
                _remaining_time = _calcul;
            }
        }, 1000);
    }
};

module.exports = Session;