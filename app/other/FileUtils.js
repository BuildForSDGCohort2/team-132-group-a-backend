/*FileUtils Class*/
/*This is the FileUtils class of the app*/
/*File version : 1.0.0*/

var DEBUG = true;
var isLocal = true;
var cheminUrlStone = '..';//'../www/html'; //'http://stone-safety.com';
var rootPath = cheminUrlStone+'/stone-messenger/upload/_file/uploads/';
var slash = '/';
var appDevVersion = '1.0.0';
var appVersion = '1.0.0';

/*Path block*/
exports.cheminPath = rootPath;
exports.cheminPathPreview = rootPath+'preview/';
exports.cheminPathThumb = rootPath+'thumb/';
exports.cheminPathGroup = rootPath+'group/';
exports.cheminPathGroupPreview = rootPath+'group/preview/';
exports.cheminPathGroupThumb = rootPath+'group/thumb/';
exports.workspace_path = 'workspace/';
exports.system_path = 'system/';
exports.config_path = 'config/';
exports.private_path = 'private/';
exports.isLocal = isLocal;
exports.debug = DEBUG;
/*Path block*/

/*Start String var block*/
exports.connection = 'connection';
exports.check_user_group = 'check_user_group';
exports.checkContact = 'checkContact';
exports.disconnect = 'disconnect';
exports.undefinit = 'undefined';
exports.AddUser = 'AddUser';
exports.user_profile_founds = 'user_profile_founds';
exports.user_groups_found = 'user_groups_found';
/*******************************************************/
exports.check_online_status = 'check_online_status';
exports.check_user = 'check_user';
exports.onlineStatus = 'onlineStatus';
exports.getUserAccessed = 'getUserAccessed';
exports.getInOpenGroup = 'getInOpenGroup';
exports.addUsersToGroup = 'addUsersToGroup';
exports.addMeToGroup = 'addMeToGroup';
exports.getGroupCreator = 'getGroupCreator';
/******************************************************/
exports.getUserMember = 'getUserMember';
exports.updateGroupName = 'updateGroupName';
exports.updateGroupPhoto = 'updateGroupPhoto';
exports.getNewGroupName = 'getNewGroupName';
exports.renameGroup = 'renameGroup';
exports.newerIsAdded = 'newerIsAdded';
exports.retireAdmin = 'retireAdmin';
exports.assignNewAdm = 'assignNewAdm';
/*****************************************************/
exports.getNewUserMember = 'getNewUserMember';
exports.getNewUserMemberAsync = 'getNewUserMemberAsync';
exports.getUserInfoM = 'getUserInfoM';
exports.admRetireMember = 'admRetireMember';
exports.deleteGroup = 'deleteGroup';
exports.deleteMeToGroup = 'deleteMeToGroup';
exports.newPrivateChat = 'newPrivateChat';
exports.newPrivateAudio = 'newPrivateAudio';
/****************************************************/
exports.newPrivateImage = 'newPrivateImage';
exports.newPrivateLargeImage = 'newPrivateLargeImage';
exports.newPrivateApk = 'newPrivateApk';
exports.newPrivateContact = 'newPrivateContact';
exports.newPrivateDoc = 'newPrivateDoc';
exports.newPrivateZip = 'newPrivateZip';
exports.newPrivateVideo = 'newPrivateVideo';
exports.newPrivateLargeVideo = 'newPrivateLargeVideo';
/****************************************************/
exports.newPrivateLargeFile = 'newPrivateLargeFile';
exports.numberChanged = 'numberChanged';
exports.sendTempStat = 'sendTempStat';
exports.accountChecking = 'accountChecking';
exports.lockContact = 'lockContact';
exports.unLockContact = 'unLockContact';
exports.error_reported = 'error_reported';
exports.profilLikeRequest = 'profilLikeRequest';
/***************************************************/
exports.checkProfilLiked = 'checkProfilLiked';
exports.typing = 'typing';
exports.recording = 'recording';
exports.check_new_status = 'check_new_status';
exports.check_new_image = 'check_new_image';
exports.upload = 'upload';
exports.connectedText = 'connected';
exports.webText = 'web';
/**************************************************/
exports.stringText = 'string';
exports.canSend = 'can_send';
exports.canSendText = 'sending';
exports.canNotSend = 'cannot_send';
exports.image = 'image';
exports.video = 'video';
exports.audio = 'audio';
exports.apk = 'apk';
/***********************************************/
exports.contact = 'contact';
exports.zip = 'zip';
exports.document = 'document';
exports.largeType = 'large';
exports.appDevVersion = appDevVersion;
exports.appVersion = appVersion;
exports.runText = 'Run!';
exports.startedMsg = 'Server started!';
/*********************************************/
exports.existsText = 'exists';
exports.notExistsText = 'not exists';
exports.notFoundText = 'not_found';
exports.beginningText = 'Beginning...';
exports.noMsgText = 'Pas de messages en attente.';
exports.loadingText = 'Loading...';
exports.receiveImageChat = 'receiveImageChat';
exports.gotText = 'Got';
/**********************************************/
exports.arrobaz = '@';
exports.thumb = 'thumb';
exports.preview = 'preview';
exports.receiveVideoChat = 'receiveVideoChat';
exports.receiveDocumentChat = 'receiveDocumentChat';
exports.receiveContactChat = 'receiveContactChat';
exports.receiveZipChat = 'receiveZipChat';
exports.receiveApkChat = 'receiveApkChat';
/************************************************/
exports.audio = 'audio';
exports.receiveAudioChat = 'receiveAudioChat';
exports.eCom = '&';
exports.receiveLargeImageChat = 'receiveLargeImageChat';
exports.receiveLargeVideoChat = 'receiveLargeVideoChat';
exports.receiveLargeFileChat = 'receiveLargeFileChat';
exports.msgAlert = 'msgAlert';
exports.changeNumber = '-changeNumber';
/****************************************************/
exports.bar = '-';
exports.receiveUserChangedNumber = 'receiveUserChangedNumber';
exports.receiveMsgAlert = 'receiveMsgAlert';
exports.createsAndAddGroup = 'createsAndAddGroup';
exports.name = 'name';
exports.type = 'type';
exports.user = 'user';
exports.is_admin = 'is_admin';
/**************************************************/
exports.notifyUsersThatHesAddedToGroup = 'notifyUsersThatHesAddedToGroup';
exports.locked = 'locked';
exports.unLocked = 'unLocked';
exports.lockedIm = 'lockedIm';
exports.unLockedIm = 'unLockedIm';
exports.text = 'Text';
exports.newMessages = 'newMessages';
exports.completeText = 'Complete!';
/***********************************************/
exports.sock = 'SOCK';
exports.rock = 'ROCK';
exports.updatingRock = 'Rock Updating...';
exports.updatingReado = 'Reado Updating...';
exports.messagesStatu = 'messagesStatu';
exports.messagesStatuReado = 'messagesStatuReado';
exports.connectedStats = 'getConnectedStats';
exports.android = 'Android';
/**********************************************/
exports.ios = 'IOS';
exports.web = 'Web';
exports.windows_10 = 'Windows_8_1_10';
exports.windows_phone = 'Windows_phone';
exports.interrogative = '?';
exports.postText = 'post';
exports.upload_completed = 'Upload terminé';
exports.progress = 'progress';
/**********************************************/
exports.error_text = 'error';
exports.endText = 'end';
exports.trueText = 'true';
exports.falseText = 'false';
exports.to_dest = '-to-';
exports.slash = slash;
exports.copyText = 'Fichier téléchargé dans le dossier ';
exports.renameText = 'Fichier renommé ! ';
/**********************************************/
exports.removeTempText = ' a été supprimé du dossier temporaire avec succès !';
exports.tirer = '-';
exports.thanksStone = 'Chat and #SayThanksStone';
exports.asyncMsg = 'asyncMsg';
exports.sync_data = 'sync_data';
exports.diskendaText = 'Diskenda nao ! Nazo kamwa eloko ozo luka !';
exports.newUser = 'New user added!';
exports.AddUser_web = 'AddUser_web';
/*End String var block*/

/*Start functions block*/
exports.removeSensible = function (item){
	return item.replace(/\n,/g, '').replace(/<br>/g,'').replace(/\./g,'').replace(/ /g, '').replace(/'/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\$/g, '').replace(/\+/g, '').replace(/\:/g, '').replace(/-/g, '').replace(/\?/g, '');
};
exports.removeItem = function (array, item) {
  // body...
  logger(array.length);
  logger(array);
  for(var i in array){
    if(array[i]=== item){
      array.splice(i,1);
      logger(item+' supprimé !!!!');
      logger(array.length);
      break;
    }
  }
};
exports.generateHash = function(bcrypt, value, fn){
	var salt = bcrypt.genSaltSync(10);
	// Hash the password with the salt
	fn(bcrypt.hashSync(value, salt), salt);
};
exports.compareHash = function(bcrypt, password, value, fn){
	try{
		fn(bcrypt.compareSync(password, value));
	}catch(ex){
		JSON.stringify(ex);
		fn(false);
	}
};
exports.stringifyJSON = function (json){
	return JSON.stringify(json)
};
exports.generateNumber = function (){
	return Math.floor(Math.random() * (999999999 - 100000000 + 100000000) + 100000000);
};
exports.formatBytes = function(bytes, decimals){
	// body...
	if (bytes == 0) return '0';
	var k = 1024;
	var dm = decimals + 1 || 3;
	var sizes = ['', 'K', 'M', 'G', 'T'];
	var i = Math.floor(Math.log(bytes)/Math.log(k));
	return (bytes/Math.pow(k, i)).toPrecision(dm)+ ' '+ sizes[i];
};
exports.exists = function (array, item) {
  // body...
  for(var i in array){
    if(array[i]=== item){
      logger(item+' found !!!!');
      //console.log(array.length);
      break;
    }
    return array[i] === item;
  }
};
exports.newDate = newDate;
exports.getDateTime = function(){
	var date = newDate();
	var month = date.getMonth()+1;
	if(month<10){
		month = "0"+month;
	}
	var jour = date.getDate();
	if(jour<10){
		jour = "0"+jour;
	}
	var h = date.getHours();
	if(h<10){
		h = "0"+h;
	}
	var m = date.getMinutes();
	if(m<10){
		m = "0"+m;
	}
	return h+':' +m+','+date.getFullYear()+'-'+month+'-'+jour;
};
exports.logger = logger;
function logger (item) {
 	// body...
 	console.log("logger : "+item)
 }
 function newDate () {
 	// body...
 	return new Date();
 }
 exports.numberDesc = function (a, b) {
	logger(JSON.stringify(a));
	logger(JSON.stringify(b));
	 return b._id - a._id;
 };
exports.objectDesc = function (key, desc) {
	return function (a, b) {
		return desc ? ~~(parseInt(a[key]) < parseInt(b[key])) : ~~(parseInt(a[key]) > parseInt(b[key]));
    };
};
/*End functions block*/

//module.exports = FlieUtils;