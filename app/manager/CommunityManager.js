/*Version 1.0*/

let _communityTree = {};
var _communityList = [];
var _communityStaticList = [];
let _tagList = [];
var _db;
var _fileUtils;
var _community;
var CommunityObject = require('../object/Community');

function CommunityManager(db, fileUtils) {
	// body...
	_db = db;
	_fileUtils = fileUtils;
	_fileUtils.logger('CommunityManager -> Worked!');
	this.setCommunityList();
}

CommunityManager.prototype.addCommunity = function(user_id, name, desc, tags, fn) {
	// body...
	var timer;
	var tagList = [];
	var tagString = '';
	
	_fileUtils.logger(_fileUtils.stringifyJSON(tags));
	if(tags.length > 0){
		for (var i = 0; i < tags.length; i++) {
			_db.addTags(tags[i], function(saved, lastId){
				if(saved){
					tagList.push(lastId);
					_fileUtils.logger(lastId);
				}
			});
			_fileUtils.logger(tags[i]);
		}
		_fileUtils.logger(_fileUtils.stringifyJSON(tagList));
		timer = setInterval(function(){
			if(tagList.length === tags.length){
				clearInterval(timer);
				_fileUtils.logger(_fileUtils.stringifyJSON(tagList));
				for (var i = 0; i < tagList.length; i++) {
					tagString += tagList[i]+',';
				}
				var finalString = tagString.substring(0, tagString.lastIndexOf(','));
				_fileUtils.logger(finalString);
				_db.addCommunity(user_id, name, desc, finalString, function(saved, insertId, community){
					if(saved){
						community.id = insertId;
		                _community = new CommunityObject(community);
						_community.setTags(tags);
		                _community.setVotes(_fileUtils.formatBytes(_community.getVotes()));
		                _community.setFollowers(_fileUtils.formatBytes(_community.getFollowers()));
	                	_communityTree[community.canonical_name] = _community;
	                	fn(true, insertId, community.canonical_name);
					}else{
						fn(false);
					}
				});
			}
		}, 3000);
	}
};
CommunityManager.prototype.addFollower = function(user_id, id, admin, fn) {
	// body...
	_db.addFollower(user_id, id, admin, fn);
};
CommunityManager.prototype.checkFollower = function(user, id, fn) {
	// body...
	_db.checkFollower(user, id, fn);
};
CommunityManager.prototype.editCommunity = function(id, newValues, fn) {
	// body...
	_db.editCommunity(id, newValues, fn);
};
CommunityManager.prototype.deleteCommunity = function(id, valeur, fn) {
	// body...
	_db.deleteCommunity(id, valeur, fn);
};
CommunityManager.prototype.deleteFollower = function(user, id, fn) {
	// body...
	_db.deleteFollowerCommunity(user, id, fn);
};
CommunityManager.prototype.getBestCommunities = function(fn) {
	// body...
	_db.getBestCommunities(function(loaded, values){
		if(loaded){
			for (var i = 0; i < values.length; i++) {
				_fileUtils.logger('CommunityManager -> Worked! ' +values[i].name);
				_community = new CommunityObject(values[i]);
				_community.setVotes(_fileUtils.formatBytes(_community.getVotes()));
				_community.setFollowers(_fileUtils.formatBytes(_community.getFollowers()));
				_communityList.push(_community);
			}
			fn(true, _communityList);
			_communityList = [];
		}else{
			fn(false);
		}
	});
};

CommunityManager.prototype.getLocalCommunity = function (canonical){
	return _communityTree[canonical];
};
CommunityManager.prototype.getCommunity = function(id, fn) {
	// body...
	_fileUtils.logger('CommunityManager -> id -> ' +id);
	_db.getCommunity(id, function(got, values, tags){
		if(got){
			_community = new CommunityObject(values);
			_community.setTags(tags);
			_community.setVotes(_fileUtils.formatBytes(_community.getVotes()));
			_community.setFollowers(_fileUtils.formatBytes(_community.getFollowers()));
			fn(true, _community);
		}else{
			fn(false);
		}
	});
};
CommunityManager.prototype.getFollowedCommunityObject = function(id, index, fn) {
	// body...
	_fileUtils.logger('CommunityManager -> id -> ' +id);
	_db.getCommunity(id, function(got, values, tags){
		if(got){
			_community = new CommunityObject(values);
			_community.setTags(tags);
			_community.setVotes(_fileUtils.formatBytes(_community.getVotes()));
			_community.setFollowers(_fileUtils.formatBytes(_community.getFollowers()));
			fn(true, _community, index);
		}else{
			fn(false);
		}
	});
};
CommunityManager.prototype.getFollowedCommunity = function(user_id, fn) {
	// body...
	_db.getFollowedCommunity(user_id, function(found, communities){
		if(found){
			fn(true, communities);
		}else{
			fn(false);
		}
	});
};
CommunityManager.prototype.getList = function(fn) {
	// body...
	_db.getCommunityList(function(got, values){
		if(got){
			for (var i = 0; i < values.length; i++) {
				_fileUtils.logger('CommunityManager -> Worked! ' +values[i].name);
				_community = new CommunityObject(values[i]);
				_community.setVotes(_fileUtils.formatBytes(_community.getVotes()));
				_community.setFollowers(_fileUtils.formatBytes(_community.getFollowers()));
				_communityList.push(_community);
			}
			fn(true, _communityList);
			_communityList = [];
		}else{
			fn(false);
		}
	});
};
CommunityManager.prototype.getCommunityNameById = function (id_community) {
	for (var i = 0; i < _communityStaticList.length; i++){
        _fileUtils.logger('CommunityManager -> value ' +_fileUtils.stringifyJSON(_communityStaticList[i]));
        if(_communityStaticList[i].id === id_community)
        	return _communityStaticList[i].nom;
	}
};
CommunityManager.prototype.getCommunityById = function (id_community) {
    for (var i = 0; i < _communityStaticList.length; i++){
        _fileUtils.logger('CommunityManager -> value ' +_fileUtils.stringifyJSON(_communityStaticList[i]));
        if(_communityStaticList[i].id === id_community)
            return _communityStaticList[i];
    }
};
CommunityManager.prototype.getCommunityTags = function(id){
    for (let i = 0; i < _tagList.length; i++) {
        _fileUtils.logger('CommunityManager -> value ' +_fileUtils.stringifyJSON(_tagList[i]));
    	if(parseInt(_tagList[i].id) === parseInt(id)){
    		return _tagList[i].hashtag;
		}
    }
};
CommunityManager.prototype.getTagList = function(fn) {
	// body...
	var randomData = [];
	_db.getTagList(function(got, values){
		if(got){
            for (var i = 0; i < 4; i++) {
            	var xy = Math.floor(Math.random() * values.length);
	            _fileUtils.logger(_fileUtils.stringifyJSON(xy));
	            _fileUtils.logger(values[xy].hashtag);
	            randomData.push(values[xy]);
            }
			fn(true, randomData);
		}else{
			fn(false);
		}
	});
};
CommunityManager.prototype.getAutocompleteTags = function(query, fn) {
	// body...
	_db.getAutocompleteTags(query, function(found, rows){
		if(found){
			var data=[];
		    for(var i=0; i<rows.length; i++){
		        data.push(rows[i].hashtag);
		    }
		    fn(true, data);
		}
	});
};
CommunityManager.prototype.getSuggestions = function(session, id, fn) {
	// body...
	if(session){
		_db.getSuggestCommunities(id, function(got, values){
			if(got){
				for (var i = 0; i < values.length; i++) {
	            	var xy = Math.floor(Math.random() * values.length);
					_fileUtils.logger('CommunityManager -> Worked! ' +values[xy].name);
					_community = new CommunityObject(values[xy]);
					_community.setVotes(_fileUtils.formatBytes(_community.getVotes()));
					_community.setFollowers(_fileUtils.formatBytes(_community.getFollowers()));
					_communityList.push(_community);
				}
				fn(true, _communityList);
				_communityList = [];
			}else{
				fn(false);
			}
		});
	}else{
		_db.getCommunityList(function(got, values){
			if(got){
				for (var i = 0; i < values.length; i++) {
	            	var xy = Math.floor(Math.random() * values.length);
					_fileUtils.logger('CommunityManager -> Worked! ' +values[xy].name);
					_community = new CommunityObject(values[xy]);
					_community.setVotes(_fileUtils.formatBytes(_community.getVotes()));
					_community.setFollowers(_fileUtils.formatBytes(_community.getFollowers()));
					_communityList.push(_community);
				}
				fn(true, _communityList);
				_communityList = [];
			}else{
				fn(false);
			}
		});
	}
};
CommunityManager.prototype.setCommunityList = function () {
    _db.getCommunityList(function(got, values){
        if(got){
            for (var i = 0; i < values.length; i++) {
                _fileUtils.logger('CommunityManager -> Worked! ' +values[i].name);
                _community = new CommunityObject(values[i]);
                _community.setVotes(_fileUtils.formatBytes(_community.getVotes()));
                _community.setFollowers(_fileUtils.formatBytes(_community.getFollowers()));
                _communityStaticList.push(_community);

                _fileUtils.logger('CommunityManager -> Tree => ' +values[i].name);
                _communityTree[values[i].canonical_name] = _community;
                _fileUtils.logger(_fileUtils.stringifyJSON(_communityTree));
            }
            _db.getTagList(function(got, values){
                if(got){
                    _tagList = values;
                }
            });
        }
    });

};
CommunityManager.prototype.userCommunities = function(user_id, fn) {
	// body...
	_db.getUserCommunities(user_id, function(found, communities){
		if(found){
			for (var i = 0; i < communities.length; i++) {
				_fileUtils.logger('CommunityManager -> Worked! ' +communities[i].name);
				_community = new CommunityObject(communities[i]);
				_community.setVotes(_fileUtils.formatBytes(_community.getVotes()));
				_community.setFollowers(_fileUtils.formatBytes(_community.getFollowers()));
				_communityList.push(_community);
			}
			fn(true, _communityList);
			_communityList = [];
		}else{
			fn(false);
		}
	});
};
CommunityManager.prototype.timer = function () {
	let _inst = this;
    setInterval(function () {
        _inst.setCommunityList();
    }, 20000);
};
module.exports = CommunityManager;