/*Version 1.0*/

var _socketIO;
var _db;
var _src;
var _app;
var _formidable;
var _fs;
var _user;
var _message;
var _path;
var _pageManager;
var _projectManager;
var _fileManager;
var _communityManager;
var _sessionManager;
var _userManager;
var _appManager;
var _articleManager;
var _bcrypt;
var _multer;
var _IP;
var usernames = {};
var languageTab = [];
var linkTab = [];
//var onlineDevices = [{Android:0},{IOS:0},{Web:0},{Windows_8_1_10:0},{windows_phone:0}];
var onlineDevices = {};
var projectManager = require('../manager/ProjectManager');
var fileManager = require('../manager/FileManager');
var communityManager = require('../manager/CommunityManager');
var UserManager = require('../manager/UserManager');
var ArticleManager = require('../manager/ArticleManager');
var SessionManager = require('../manager/SessionManager');
/*Added soon -> version 2.0*/
var appManager = require('../manager/AppManager');
var User = require('../object/User');
var _routes = require('../other/Route');

function MainController (element) {
	// body...
	//console.log(element.src)
	_IP = element.ip;
	this._socketIO = element.socketIns;
	_socketIO = element.socketIns;
	_src = element.src;
	_app = element.app;
	_formidable = element.formidable;
	_fs = element.fs;
	_message = element.src.Message;
	_path = element.path;
	_bcrypt = element.bcrypt;
	_multer = element.multer;
	languageTab.push(_src.LanguageEn.en);
	languageTab.push(_src.LanguageFr.fr);
	linkTab.push(_src.LanguageEn.link);
	linkTab.push(_src.LanguageFr.link);
}
MainController.prototype.run = function(mysql) {
	// body...
	_db = new _src.AsyncDb(mysql, _src.FileUtils);
	_userManager = new UserManager(_db, _src.FileUtils);
    _communityManager = new communityManager(_db, _src.FileUtils);
	
	_appManager = new appManager(_db, _src.FileUtils);
	_pageManager = new _src.PageManager(languageTab, _src.FileUtils);
	_pageManager.run(linkTab);
	_projectManager = new projectManager(_db, _src.FileUtils);
	_fileManager = new fileManager(_fs, _src.FileUtils);
	_articleManager = new ArticleManager(_db, _src.FileUtils);
	_sessionManager = new SessionManager(_src, _fileManager);
	_src.FileUtils.logger(_src.FileUtils.runText);
	_src.FileUtils.logger(_src.FileUtils.startedMsg+' -> '+ _src.FileUtils.appDevVersion);
	onlineDevices[_src.FileUtils.android] = 0;
	onlineDevices[_src.FileUtils.ios] = 0;
	onlineDevices[_src.FileUtils.web] = 0;
	onlineDevices[_src.FileUtils.windows_10] = 0;
	onlineDevices[_src.FileUtils.windows_phone] = 0;
	_src.FileUtils.logger(_src.FileUtils.stringifyJSON(onlineDevices));
	routeManagement();
	socketManagement();
    /*setInterval(checkInfo, 20000);*/
};

function routeManagement () {
	// body...
	var lngEn = {};
	var lngFr = {};

	/*Default pages [English]*/
	_app.get(_src.FileUtils.slash, function(req, res){
		_pageManager.homePage(req, res, 'en');
	});
	_app.get(_src.FileUtils.slash+_src.LanguageEn.link.sign_in_link, function(req, res){
		_pageManager.loginPage(req, res, 'en');
	});
	_app.get(_src.FileUtils.slash+_src.LanguageEn.link.sign_up_link, function(req, res){
		_pageManager.signUpPage(req, res, 'en');
	});
	_app.get(_src.FileUtils.slash+_src.LanguageEn.link.connected_link, restrict, function (req, res){
		_src.FileUtils.logger('Logged in!');
		//res.send('Connected => '+req.session.user);
        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
        _src.FileUtils.logger(req.session.userObject.nom);
		a = _src.FileUtils.newDate();
        _db.getUserInvitation(req.session.userObject.id, function(state, invitation){
            if(state){
                res.render('dashboard.ejs',{
                    language:_src.LanguageEn.en,
                    link:_src.LanguageEn.link,
                    message: req.flash('workspace'),
                    user:req.session.userObject,
                    annee:a.getFullYear(),
                    invitationNbre:invitation.length,
                    socketConnect:_IP,
                    DynId: req.flash('idDyna'),
                    welcMsg: req.flash('welcomeMessage')
                });
            }else{
                res.render('dashboard.ejs',{
                    language:_src.LanguageEn.en,
                    link:_src.LanguageEn.link,
                    message: req.flash('workspace'),
                    user:req.session.userObject,
                    annee:a.getFullYear(),
                    invitationNbre:invitation,
                    socketConnect:_IP,
                    DynId: req.flash('idDyna'),
                    welcMsg: req.flash('welcomeMessage')
                });
            }
        });
	});
	_app.get('/log_out', function(req, res){
	    req.session.destroy(function(){
	        res.redirect('/');
	    });
	});
	_app.get(_src.FileUtils.slash+_src.LanguageEn.link.forum_home_link, function(req, res){
		_pageManager.homeCommunityPage(req, res, 'en');
	});
	_app.get(_src.FileUtils.slash+_src.LanguageEn.link.link_home_link, function(req, res){
		_pageManager.homeLinksPage(req, res, 'en');
	});
    /*_app.get(_src.FileUtils.slash+_src.LanguageEn.link.forum_home_link+_src.FileUtils.slash+_src.LanguageEn.link.forum_overview_link, function(req, res){
        _pageManager.overviewCommunityPage(req, res, 'en');
    });*/
    _app.get(_src.FileUtils.slash+_src.LanguageEn.link.forum_home_link+_src.FileUtils.slash+_src.LanguageEn.link.forum_overview_link+'/:community_tag', function(req, res){
        _src.FileUtils.logger(req.params.community_tag);
    	let _community = _communityManager.getLocalCommunity(req.params.community_tag);
        _src.FileUtils.logger(_community.tags);
        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
        if(typeof(_community.tags) === "string"){
            let emptyTagTab = _community.tags.split(',');
            let finalTab = [];
            for (let i = 0; i < emptyTagTab.length; i++) {
                _src.FileUtils.logger('tag => ' + emptyTagTab[i]);
                let valeur = _communityManager.getCommunityTags(emptyTagTab[i]);
                finalTab.push(valeur);
                if (finalTab.length === emptyTagTab.length) {
                    _community.tags = finalTab;
                    _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                    if (req.session.user) {
                        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
                        _src.FileUtils.logger(req.session.userObject.id);
                        _communityManager.checkFollower(req.session.userObject.id, _community.id, function (exists, d) {
                            _src.FileUtils.logger('*********************************');
                            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                            _src.FileUtils.logger('*********************************');
                            _pageManager.overviewCommunityPage(req, res, 'en', _community, exists, d);
                        });
                    } else {
                        _pageManager.overviewCommunityPage(req, res, 'en', _community);
                    }
                }
            }
        }else{
            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
            if (req.session.user) {
                _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
                _src.FileUtils.logger(req.session.userObject.id);
                _communityManager.checkFollower(req.session.userObject.id, _community.id, function (exists, d) {
                    _src.FileUtils.logger('*********************************');
                    _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                    _src.FileUtils.logger('*********************************');
                    _pageManager.overviewCommunityPage(req, res, 'en', _community, exists, d);
                });
            } else {
                _pageManager.overviewCommunityPage(req, res, 'en', _community);
            }
        }
        /*if(req.session.user) {
            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
            _src.FileUtils.logger(req.session.userObject.id);
            _communityManager.checkFollower(req.session.userObject.id, _community.id, function (exists, d) {
                _src.FileUtils.logger('*********************************');
                _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                _src.FileUtils.logger('*********************************');
                _pageManager.overviewCommunityPage(req, res, 'en', _community, exists, d);
            });
        }else{
            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
            if(typeof(_community.tags) === "string"){
	            let emptyTagTab = _community.tags.split(',');
	            let finalTab = [];
	            for (let i = 0; i < emptyTagTab.length; i++) {
	                _src.FileUtils.logger('tag => ' + emptyTagTab[i]);
	                let valeur = _communityManager.getCommunityTags(emptyTagTab[i]);
	                finalTab.push(valeur);
	                if (finalTab.length === emptyTagTab.length) {
	                    _community.tags = finalTab;
	                    _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
	                    if (req.session.user) {
	                        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
	                        _src.FileUtils.logger(req.session.userObject.id);
	                        _communityManager.checkFollower(req.session.userObject.id, _community.id, function (exists, d) {
	                            _src.FileUtils.logger('*********************************');
	                            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
	                            _src.FileUtils.logger('*********************************');
	                            _pageManager.overviewCommunityPage(req, res, 'en', _community, exists, d);
	                        });
	                    } else {
	                        _pageManager.overviewCommunityPage(req, res, 'en', _community);
	                    }
	                }
	            }
	        }else{
                _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                if (req.session.user) {
                    _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
                    _src.FileUtils.logger(req.session.userObject.id);
                    _communityManager.checkFollower(req.session.userObject.id, _community.id, function (exists, d) {
                        _src.FileUtils.logger('*********************************');
                        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                        _src.FileUtils.logger('*********************************');
                        _pageManager.overviewCommunityPage(req, res, 'en', _community, exists, d);
                    });
                } else {
                    _pageManager.overviewCommunityPage(req, res, 'en', _community);
                }
	        }
        }*/
    });
	/*Default pages [English]*/

	/*French pages are here*/
	_app.get(_src.FileUtils.slash+_src.LanguageFr.link.home_link.replace('/',''), function(req, res){
		//res.send(_src.FileUtils.diskendaText);
		_pageManager.homePage(req, res, 'fr');
	});
	_app.get(_src.FileUtils.slash+_src.LanguageFr.link.sign_in_link, function(req, res){
		_pageManager.loginPage(req, res, 'fr');
	});
	_app.get(_src.FileUtils.slash+_src.LanguageFr.link.sign_up_link, function(req, res){
		_pageManager.signUpPage(req, res, 'fr');
	});
	_app.get(_src.FileUtils.slash+_src.LanguageFr.link.connected_link, restrict2, function (req, res){
		_src.FileUtils.logger('Connecté !');
		//res.send('Connecté => '+req.session.user);
        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
        _src.FileUtils.logger(req.session.userObject.nom);
		a = _src.FileUtils.newDate();
        _db.getUserInvitation(req.session.userObject.id, function(state, invitation){
            if(state){
                res.render('dashboard.ejs',{
                    language:_src.LanguageFr.fr,
                    link:_src.LanguageFr.link,
                    message: req.flash('workspace'),
                    user:req.session.userObject,
                    annee:a.getFullYear(),
                    invitationNbre:invitation.length,
                    socketConnect:_IP,
                    DynId: req.flash('idDyna'),
                    welcMsg: req.flash('welcomeMessage')
                });
            }else{
                res.render('dashboard.ejs',{
                    language:_src.LanguageFr.fr,
                    link:_src.LanguageFr.link,
                    message: req.flash('workspace'),
                    user:req.session.userObject,
                    annee:a.getFullYear(),
                    invitationNbre:invitation,
                    socketConnect:_IP,
                    DynId: req.flash('idDyna'),
                    welcMsg: req.flash('welcomeMessage')
                });
            }
        });
	});
	_app.get('/fr/log_out', function(req, res){
	    req.session.destroy(function(){
	        res.redirect('/fr');
	    });
	});
	_app.get(_src.FileUtils.slash+_src.LanguageFr.link.forum_home_link, function(req, res){
		_pageManager.homeCommunityPage(req, res, 'fr');
	});
	_app.get(_src.FileUtils.slash+_src.LanguageFr.link.link_home_link, function(req, res){
		_pageManager.homeLinksPage(req, res, 'fr');
	});

    _app.get(_src.FileUtils.slash+_src.LanguageFr.link.forum_home_link+_src.FileUtils.slash+_src.LanguageFr.link.forum_overview_link+'/:community_tag', function(req, res){
        _src.FileUtils.logger(req.params.community_tag);
        let _community = _communityManager.getLocalCommunity(req.params.community_tag);
        _src.FileUtils.logger(_community.tags);
        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
        if(typeof(_community.tags) === "string"){
            let emptyTagTab = _community.tags.split(',');
            let finalTab = [];
            for (let i = 0; i < emptyTagTab.length; i++) {
                _src.FileUtils.logger('tag => ' + emptyTagTab[i]);
                let valeur = _communityManager.getCommunityTags(emptyTagTab[i]);
                finalTab.push(valeur);
                if (finalTab.length === emptyTagTab.length) {
                    _community.tags = finalTab;
                    _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                    if (req.session.user) {
                        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
                        _src.FileUtils.logger(req.session.userObject.id);
                        _communityManager.checkFollower(req.session.userObject.id, _community.id, function (exists, d) {
                            _src.FileUtils.logger('*********************************');
                            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                            _src.FileUtils.logger('*********************************');
                            _pageManager.overviewCommunityPage(req, res, 'fr', _community, exists, d);
                        });
                    } else {
                        _pageManager.overviewCommunityPage(req, res, 'fr', _community);
                    }
                }
            }
        }else{
            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
            if (req.session.user) {
                _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
                _src.FileUtils.logger(req.session.userObject.id);
                _communityManager.checkFollower(req.session.userObject.id, _community.id, function (exists, d) {
                    _src.FileUtils.logger('*********************************');
                    _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                    _src.FileUtils.logger('*********************************');
                    _pageManager.overviewCommunityPage(req, res, 'fr', _community, exists, d);
                });
            } else {
                _pageManager.overviewCommunityPage(req, res, 'fr', _community);
            }
        }
        /*if(req.session.user) {
            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
            _src.FileUtils.logger(req.session.userObject.id);
            _communityManager.checkFollower(req.session.userObject.id, _community.id, function (exists, d) {
                _src.FileUtils.logger('*********************************');
                _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                _src.FileUtils.logger('*********************************');
                _pageManager.overviewCommunityPage(req, res, 'fr', _community, exists, d);
            });
        }else{
            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
            let emptyTagTab = _community.tags.split(',');
            let finalTab = [];
            for (let i = 0; i < emptyTagTab.length; i++) {
                _src.FileUtils.logger('tag => ' + emptyTagTab[i]);
                let valeur = _communityManager.getCommunityTags(emptyTagTab[i]);
                finalTab.push(valeur);
                if (finalTab.length === emptyTagTab.length) {
                    _community.tags = finalTab;
                    _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                    if (req.session.user) {
                        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.session.userObject));
                        _src.FileUtils.logger(req.session.userObject.id);
                        _communityManager.checkFollower(req.session.userObject.id, _community.id, function (exists, d) {
                            _src.FileUtils.logger('*********************************');
                            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_community));
                            _src.FileUtils.logger('*********************************');
                            _pageManager.overviewCommunityPage(req, res, 'fr', _community, exists, d);
                        });
                    } else {
                        _pageManager.overviewCommunityPage(req, res, 'fr', _community);
                    }
                }
            }
        }*/
    });

	/*_app.get(_src.FileUtils.slash+':language/links', function(req, res){
		_pageManager.homeLinksPage(req, res, req.params.language);
	});*/

	/*End French Pages*/


	_app.get('/favicon', function (req, res){
		res.sendFile(_path.resolve('lg_logo.ico'));
	});
	_app.get('/brand', function (req, res){
		res.sendFile(_path.resolve('./public/images/lg_logo.png'));
	});

	_app.get('/profil', function(req, res){
		
	    _fs.exists('./upload/_profil/'+req.session.user+'.png', function (exists) {
		    if(exists){
		        res.sendFile(_path.resolve('./upload/_profil/'+req.session.user+'.png'));
		        _src.FileUtils.logger('./upload/_profil/'+req.session.user+'.png');
		    }else{
		        res.sendFile(_path.resolve('./upload/_profil/profil.png'));
		        _src.FileUtils.logger('./upload/_profil/profil.png');
		    }
		});
	});
	_app.get('/member/:membre', function(req, res){
		
	    _fs.exists('./upload/_profil/'+req.params.membre+'.png', function (exists) {
		    if(exists){
		        res.sendFile(_path.resolve('./upload/_profil/'+req.params.membre+'.png'));
		        _src.FileUtils.logger('./upload/_profil/'+req.params.membre+'.png');
		    }else{
		        res.sendFile(_path.resolve('./upload/_profil/profil.png'));
		        _src.FileUtils.logger('./upload/_profil/profil.png');
		    }
		});
	});
	_app.get('/project/icon/:project', (req, res) => {
		_src.FileUtils.logger('old -> ./upload/_project/'+req.params.project+'.jpg');
		_fs.exists('./upload/_project/'+req.params.project+'.jpg', function (exists) {
		    if(exists){
		        res.sendFile(_path.resolve('./upload/_project/'+req.params.project+'.jpg'));
		        _src.FileUtils.logger('./upload/_project/'+req.params.project+'.jpg');
		    }else{
		        res.sendFile(_path.resolve('./upload/_project/default.jpg'));
		        _src.FileUtils.logger('./upload/_project/default.jpg');
		    }
		});
	});

	_app.get('/project/new_icon/:project', (req, res) => {
		_src.FileUtils.logger('new -> ./upload/_project/'+req.params.project+'.jpg');
		_fs.exists('./upload/_project/'+req.params.project+'.jpg', function (exists) {
		    if(exists){
		        res.sendFile(_path.resolve('./upload/_project/'+req.params.project+'.jpg'));
		        _src.FileUtils.logger('./upload/_project/'+req.params.project+'.jpg');
		    }else{
		        res.sendFile(_path.resolve('./upload/_project/default.jpg'));
		        _src.FileUtils.logger('./upload/_project/default.jpg');
		    }
		});
	});
	_app.get('/new-profil', function(req, res){
		
	    _fs.exists('./upload/_profil/'+req.session.user+'.png', function (exists) {
		    if(exists){
		        res.sendFile(_path.resolve('./upload/_profil/'+req.session.user+'.png'));
		        _src.FileUtils.logger('./upload/_profil/'+req.session.user+'.png');
		    }else{
		        res.sendFile(_path.resolve('./upload/_profil/profil.png'));
		        _src.FileUtils.logger('./upload/_profil/profil.png');
		    }
		});
	});

	_app.get('/file/folder/:folder/:file', function(req, res){
		
	    _fs.exists('./upload/_profil/'+req.session.user+'.png', function (exists) {
		    if(exists){
		        res.sendFile(_path.resolve('./upload/_profil/'+req.session.user+'.png'));
		        _src.FileUtils.logger('./upload/_profil/'+req.session.user+'.png');
		    }else{
		        res.sendFile(_path.resolve('./upload/_profil/profil.png'));
		        _src.FileUtils.logger('./upload/_profil/profil.png');
		    }
		});
	});
	_app.get('/article/icon/:id', (req, res) => {
		_src.FileUtils.logger('new -> ./upload/_project/'+req.params.id+'.jpg');
		_fs.exists('./upload/_article/'+req.params.id+'.jpg', function (exists) {
		    if(exists){
		        res.sendFile(_path.resolve('./upload/_article/'+req.params.id+'.jpg'));
		        _src.FileUtils.logger('./upload/_article/'+req.params.id+'.jpg');
		    }else{
		        res.sendFile(_path.resolve('./upload/_project/default.jpg'));
		        _src.FileUtils.logger('./upload/_project/default.jpg');
		    }
		});
	});
	_app.get('/css_js/:file', function (req, res){
    //var extension = req.params.file.split('.');
    let extV2 = req.params.file.substring(req.params.file.lastIndexOf('.')+1, req.params.file.length);
    _src.FileUtils.logger(extV2);
    if(extV2 === 'css' || extV2 === 'ttf'){
        _fs.exists('./public/css/'+req.params.file, function (exists) {
            if(exists){
                res.sendFile(_path.resolve('./public/css/'+req.params.file));
                _src.FileUtils.logger('./public/css/'+req.params.file);
            }else{
                _fs.exists('./public/dist/css/'+req.params.file, function (exists) {
                    if(exists){
                        res.sendFile(_path.resolve('./public/dist/css/'+req.params.file));
                        _src.FileUtils.logger('./public/dist/css/'+req.params.file);
                    }else{
                        _fs.exists('./public/dist/css/iconfont/'+req.params.file, function (exists) {
                            if(exists){
                                res.sendFile(_path.resolve('./public/dist/css/iconfont/'+req.params.file));
                                _src.FileUtils.logger('./public/dist/css/iconfont/'+req.params.file);
                            }else{
                                //res.sendFile(_path.resolve('./public/dist/css/iconfont/'+req.params.file));
                                _src.FileUtils.logger('./public/dist/css/iconfont/'+req.params.file+" -> not found!");
                            }
                        });
                        /*res.sendFile(_path.resolve('./public/dist/css/iconfont/'+req.params.file));
                        _src.FileUtils.logger('./public/dist/css/iconfont/'+req.params.file);*/
                    }
                });
            }
        });
    }else if(extV2 === 'js'){
        _fs.exists('./public/dist/js/'+req.params.file, function (exists) {
            if(exists){
                res.sendFile(_path.resolve('./public/dist/js/'+req.params.file));
                _src.FileUtils.logger('./public/dist/js/'+req.params.file);
            }else{
                _fs.exists('./public/assets/js/'+req.params.file, function (exists) {
                    if(exists){
                        res.sendFile(_path.resolve('./public/assets/js/'+req.params.file));
                        _src.FileUtils.logger('./public/assets/js/'+req.params.file);
                    }else{
                        _fs.exists('./public/assets/js/vendor/'+req.params.file, function (exists) {
                            if(exists){
                                res.sendFile(_path.resolve('./public/assets/js/vendor/'+req.params.file));
                                _src.FileUtils.logger('./public/assets/js/vendor/'+req.params.file);
                            }else{
                                _src.FileUtils.logger(''+req.params.file+" -> not found!");
							}
                        });
					}
                });
            }
        });
    }
    
});

_app.post('/get_connected', function(req, res){
		
	var username = req.body.email;
    var password = req.body.password;
    var lng      = req.body.language;
    var session  = req.body.remember_me;

	_src.FileUtils.generateHash(_bcrypt, password, function (hash, salt){
		_db.checkUser(username, password, hash, _bcrypt, function (exists){
			if(exists){
                _db.getUserInfo(username, function(info){
                    _src.FileUtils.logger(info);
                    if(Object.keys(info).length > 0){
                        _user = new User(info.first_name, info.last_name, info.country, info.id, info.email, info.place_birth, info.date_birth, info.user_skills, info.date_creation);
                        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_user.getUserJSON()));
                        /*if(req.body.remember_me){
							req.session.cookie.maxAge = 2592000000; //30*24*60*60*1000 Remember me for 30 days
						}else{
							req.session.cookie.expires = false;
						}*/
                        //if(session){}
                        _src.FileUtils.logger(session);
                        if(session === 'on'){
                        	_sessionManager.set(info.email);
						}
                        if(lng === 'fr'){
                            req.session.save(function(){
                                req.session.user = username;
                                req.session.userObject = _user;
                                req.session.success = 'Logged In';
                                res.redirect('/fr/connected');
                                _src.FileUtils.logger('Utilisateur connecté');
                            });
                        }else if(lng === 'en'){
                            req.session.save(function(){
                                req.session.user = username;
                                req.session.userObject = _user;
                                req.session.success = 'Logged In';
                                res.redirect('/connected');
                                _src.FileUtils.logger('User connected');
                            });
                        }
                    }
                });
			} else {
				if(lng === 'fr'){
					res.redirect('/fr/login', false, req.flash('login', _src.LanguageFr.fr.login_message));
					_src.FileUtils.logger('Cet utilisateur n\'existe pas');
				}else if(lng === 'en'){
					res.redirect('/login', false, req.flash('login', _src.LanguageEn.en.login_message));
					_src.FileUtils.logger('This user does not exists');
				}
			}
		});
	});
});

_app.post('/signup', function(req, res){
		
	var username = req.body.email;
    var password = req.body.password;
    var lng      = req.body.language;
    var nom      = req.body.name;
    var prenom   = req.body.lastname;
    var date     = req.body.date;
    var place    = req.body.place;
    var country  = req.body.country;

    _src.FileUtils.generateHash(_bcrypt, password, function (hash, salt){
    	var json = {
	    	name:nom,
	    	lastname:prenom,
	    	email:username,
	    	password:password,
	    	dateBirth:date,
	    	placeBirth:place,
	    	country:country,
	    	hash:hash,
	    	salt:salt
	    };

		_db.userChecker(username, function (exists){
			if(!exists){
				_db.addUser(json, function (isSaved){
					if(isSaved){
						_db.getUserInfo(username, function(info){
		                    _src.FileUtils.logger(info);
		                    if(Object.keys(info).length > 0){
		                        _user = new User(info.first_name, info.last_name, info.country, info.id, info.email, info.place_birth, info.date_birth, info.user_skills, info.date_creation);
		                        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(_user.getUserJSON()));
		                        if(lng === 'fr'){
		                            req.session.save(function(){
					                    req.session.user = username;
					                    req.session.userObject = _user;
					                    req.session.success = 'Logged In';
					                    res.redirect('/fr/connected', req.flash('idDyna', 'dialogMessage'), req.flash('workspace', 'Bonjour '+json.lastname+' '+json.name+', Soyez la bienvenue dans notre bibliothèque numérique. Faites des recherches et télécharger des livres de votre choix. En cas de problème contacter un administrateur pour avoir plus d\'informations. Merci !'));
									    _src.FileUtils.logger('Utilisateur connecté');
								    });
		                        }else if(lng === 'en'){
		                            req.session.save(function(){
					                    req.session.user = username;
					                    req.session.userObject = _user;
					                    req.session.success = 'Logged In';
					                    res.redirect('/connected', req.flash('idDyna', 'dialogMessage'), req.flash('workspace', 'Bonjour '+json.lastname+' '+json.name+', Soyez la bienvenue dans notre bibliothèque numérique. Faites des recherches et télécharger des livres de votre choix. En cas de problème contacter un administrateur pour avoir plus d\'informations. Merci !'));
									    _src.FileUtils.logger('Utilisateur connecté');
								    });
		                        }
		                    }
		                });
					}
				});
			} else {
				if(lng === 'fr'){
					res.redirect('/fr/register', false, req.flash('signup', _src.LanguageFr.fr.sign_up_message));
					_src.FileUtils.logger('Cet utilisateur existe');
				}else if(lng === 'en'){
					res.redirect('/register', false, req.flash('signup', _src.LanguageEn.en.sign_up_message));
					_src.FileUtils.logger('This user already exists');
				}
			}
		});
    });
});

_app.post('/change_password', function (req, res){
	if(req.session.user){
		var username    = req.body.email;
		var oldPassword = req.body.oldPassword;
		var newPassword = req.body.newPassword;
		var confirmPass = req.body.confirmPass;
		var lng         = req.body.lang;

		_db.checkUser(username, oldPassword, null, _bcrypt, function (exists){
			if(exists){
		        _src.FileUtils.logger('Exists');
		        _src.FileUtils.generateHash(_bcrypt, newPassword, function (hash, salt){
			    	_db.updatePassword(username, hash, salt, function (updated){
			    		if(updated){
			    			if(lng === 'fr'){
								res.send({tag:'success', message:_src.LanguageFr.fr.changed_password_text});
								_src.FileUtils.logger(_src.LanguageFr.fr.changed_password_text);
							}else if(lng === 'en'){
								res.send({tag:'success', message:_src.LanguageEn.en.changed_password_text});
								_src.FileUtils.logger(_src.LanguageEn.en.changed_password_text);
							}
			    		}
			    	});
				});
			} else {
				if(lng === 'fr'){
					res.send({tag:'warning', message:_src.LanguageFr.fr.old_password_wrong});
					_src.FileUtils.logger(_src.LanguageFr.fr.old_password_wrong);
				}else if(lng === 'en'){
					res.send({tag:'warning', message:_src.LanguageEn.en.old_password_wrong});
					_src.FileUtils.logger(_src.LanguageEn.en.old_password_wrong);
				}
			}
		});
	}else{
		res.send('session_expired');
	}
});

_app.post('/remove_group_member', function (req, res){
	if(req.session.user){
		var groupNumber    = req.body.groupNumber;
		var userId = req.body.userId;

		_db.deleteGroupMember(groupNumber, userId, function(deleted){
			if(deleted){
				res.send({tag:'success'});
			}else{
				res.send({tag:'not_found'});
			}
		});

		/*_db.checkUser(username, oldPassword, null, _bcrypt, function (exists){
			if(exists){
		        _src.FileUtils.logger('Exists');
		        _src.FileUtils.generateHash(_bcrypt, newPassword, function (hash, salt){
			    	_db.updatePassword(username, hash, salt, function (updated){
			    		if(updated){
			    			if(lng == 'fr'){
								res.send({tag:'success', message:_src.LanguageFr.fr.changed_password_text});
								_src.FileUtils.logger(_src.LanguageFr.fr.changed_password_text);
							}else if(lng == 'en'){
								res.send({tag:'success', message:_src.LanguageEn.en.changed_password_text});
								_src.FileUtils.logger(_src.LanguageEn.en.changed_password_text);
							}
			    		}
			    	});
				});
			} else {
				if(lng == 'fr'){
					res.send({tag:'warning', message:_src.LanguageFr.fr.old_password_wrong});
					_src.FileUtils.logger(_src.LanguageFr.fr.old_password_wrong);
				}else if(lng == 'en'){
					res.send({tag:'warning', message:_src.LanguageEn.en.old_password_wrong});
					_src.FileUtils.logger(_src.LanguageEn.en.old_password_wrong);
				}
			}
		});*/
	}else{
		res.send('session_expired');
	}
});

_app.post('/delete_account', function (req, res){
	if(req.session.user){
		var username    = req.body.email;
		var lng         = req.body.lang;

		_db.deleteAccount(username, function (exists){
			if(exists){
				_fs.unlink('./upload/_profil/'+req.session.user+'.png', function(err){
			        if(err){
			            _src.FileUtils.logger(err)
			        }else{
			        	_src.FileUtils.logger('./upload/_profil/'+req.session.user+'.png a été supprimé du dossier temporaire avec succès !');
			        	req.session.destroy();
			        }
			    });
				if(lng === 'fr'){
					res.send({tag:'success', message:_src.LanguageFr.fr.delete_account_text});
					_src.FileUtils.logger(_src.LanguageFr.fr.delete_account_text);
				}else if(lng === 'en'){
					res.send({tag:'success', message:_src.LanguageEn.en.delete_account_text});
					_src.FileUtils.logger(_src.LanguageEn.en.delete_account_text);
				}
			} else {
				if(lng === 'fr'){
					res.send({tag:'warning', message:_src.LanguageFr.fr.delete_account_wrong});
					_src.FileUtils.logger(_src.LanguageFr.fr.delete_account_wrong);
				}else if(lng === 'en'){
					res.send({tag:'warning', message:_src.LanguageEn.en.delete_account_wrong});
					_src.FileUtils.logger(_src.LanguageEn.en.delete_account_wrong);
				}
			}
		});
	}else{
		res.send('session_expired');
	}
});

_app.post('/update_user', function (req, res){
	if(req.session.user){
		var username    = req.body.email;
		var lng         = req.body.lang;
	    var nom      	= req.body.name;
	    var prenom   	= req.body.lastname;
	    var date     	= req.body.date;
	    var place    	= req.body.place;
	    var country  	= req.body.country;
	    var skills      = req.body.skills;

	    var json = {
	    	name:nom,
	    	lastname:prenom,
	    	email:req.session.user,
	    	dateBirth:date,
	    	placeBirth:place,
	    	country:country,
	    	skills:skills
	    };

		_db.updateUserInfo(json, function (exists){
			if(exists){
				if(lng === 'fr'){
					res.send({tag:'success', message:_src.LanguageFr.fr.update_account_text});
					_src.FileUtils.logger(_src.LanguageFr.fr.update_account_text);
				}else if(lng === 'en'){
					res.send({tag:'success', message:_src.LanguageEn.en.update_account_text});
					_src.FileUtils.logger(_src.LanguageEn.en.update_account_text);
				}
			} else {
				if(lng === 'fr'){
					res.send({tag:'warning', message:_src.LanguageFr.fr.update_account_wrong});
					_src.FileUtils.logger(_src.LanguageFr.fr.update_account_wrong);
				}else if(lng === 'en'){
					res.send({tag:'warning', message:_src.LanguageEn.en.update_account_wrong});
					_src.FileUtils.logger(_src.LanguageEn.en.update_account_wrong);
				}
			}
		});
	}else{
		res.send('session_expired');
	}
});

_app.post('/community/create.do', function(req, res){
	if(req.session.user){
		var name 	    = req.body.communityName;
	    var desc      	= req.body.description;
	    var tags	  	= req.body.tags;
	    _communityManager.addCommunity(req.session.userObject.id, name, desc, tags, function(saved, communityId, communityCanonicalName){
	    	if(saved){
	    		_communityManager.addFollower(req.session.userObject.id, communityId, 1, function (ok) {
					if(ok){
                        res.send({tag:'success', community: communityCanonicalName});
					}
                });
	    	}else{
	    		res.send({tag:'warning', message:_src.LanguageFr.fr.error_text});
	    	}
	    });
	}else{
		res.send({tag:'session_expired'});
	}
});

_app.post('/community/follow.do', function(req, res){
	if(req.session.user){
		var id 	    = req.body.communityId;
	    var tag	  	= req.body.tag;
	    if(tag === 'follow'){
		    _communityManager.addFollower(req.session.userObject.id, id, 0, function(saved){
		    	if(saved){
		    		res.send({tag:'success'});
		    	}else{
		    		res.send({tag:'warning', message:_src.LanguageFr.fr.error_text});
		    	}
		    });
		}else{
			_communityManager.deleteFollower(req.session.userObject.id, id, function(saved){
		    	if(saved){
		    		res.send({tag:'success'});
		    	}else{
		    		res.send({tag:'warning', message:_src.LanguageFr.fr.error_text});
		    	}
		    });
		}
	}else{
		res.send({tag:'session_expired'});
	}
});

_app.get('/community/best.do', function(req, res){
	_src.FileUtils.logger('CommunityManager -> Best -> ');
	_communityManager.getBestCommunities(function(state, communities){
		if(state){
			_src.FileUtils.logger('CommunityManager -> Best -> '+communities[0].getDescription());
			res.send({tag:'success', community:communities});
		}else{
			res.send({tag:'not_found'});
		}
	});
});

_app.get('/community/load_tags.do', function(req, res){
	_src.FileUtils.logger('CommunityManager -> Tag -> ');
	_communityManager.getTagList(function(state, tags){
		if(state){
			res.send({tag:'success', tagList:tags});
		}else{
			res.send({tag:'not_found'});
		}
	});
});

_app.get('/community/load_suggest.tsl', function(req, res){
	_src.FileUtils.logger('CommunityManager -> Url -> /community/load_suggest.tsl');
	if(req.session.user){
		_communityManager.getSuggestions(true, req.session.userObject.id, function(state, tags){
			if(state){
				res.send({tag:'success', communities:tags});
			}else{
				res.send({tag:'not_found'});
			}
		});
	}else{
		_communityManager.getSuggestions(false, '', function(state, tags){
			if(state){
				res.send({tag:'success', communities:tags});
			}else{
				res.send({tag:'not_found'});
			}
		});
	}
});

_app.get('/community/load_user_communities.tsl', function(req, res){
	var id 	    = req.session.userObject.id;
	_src.FileUtils.logger('CommunityManager -> Url -> /community/load_user_communities.tsl');
	_communityManager.userCommunities(id, function(state, tags){
		if(state){
			res.send({tag:'success', communities:tags});
		}else{
			res.send({tag:'not_found'});
		}
	});
});

_app.post('/article/like.tsl', function(req, res){
	var article_id = req.body.id;

	_src.FileUtils.logger('ArticleManager -> Url -> /article/like.tsl');
	if(req.session.user){
		var id 	    = req.session.userObject.id;
		_articleManager.addLike(req.body.tag, id, article_id, function(state, tags){
			if(state){
				res.send({tag:'success', communities:tags});
			}else{
				res.send({tag:'not_found'});
			}
		});
	}else{
		res.send({tag:'session_expired'});
	}
});

_app.post('/article/comment.tsl', function(req, res){
	var article_id = req.body.id;
	var contenu = req.body.content;

	_src.FileUtils.logger('ArticleManager -> Url -> /article/comment.tsl -> '+article_id);
	if(req.session.user){
		var id 	    = req.session.userObject.id;
		_articleManager.addComment(id, contenu, article_id, function(state, tags){
			if(state){
				tags.sender = req.session.userObject.prenom+' '+req.session.userObject.nom;
				res.send({tag:'success', comment:tags});
			}else{
				res.send({tag:'not_found'});
			}
		});
	}else{
		res.send({tag:'session_expired'});
	}
});

_app.post('/article/getUserComment.tsl', function(req, res){
	var id = req.body.id;

	_src.FileUtils.logger('ArticleManager -> Url -> /article/getUserComment.tsl');
	_db.getUserInfoById(id, function(found, user){
		if(found){
			res.send({tag:'success', _user:user});
		}else{
			res.send({tag:'not_found'});
		}
	});
});

    _app.get('/community/articles/latest/load.tsl', function(req, res){
        _src.FileUtils.logger('CommunityManager -> Url -> /community/article/load.tsl -> '+req.query.key);
        if(req.session.user){
        	_articleManager.getLatestNews(req.session.userObject.id, _communityManager, _userManager, function (found, articles) {
				if(found){
                    res.send({tag:'success', articles:articles});
                    _articleManager.resetTables();
				}else{
                    res.send({tag:'not_found'});
                }
            });
        }else{
            _articleManager.getLatestNews(null, _communityManager, _userManager, function (found, articles) {
                if(found){
                    res.send({tag:'success', articles:articles});
                    _articleManager.resetTables();
                }else{
                    res.send({tag:'not_found'});
                }
            });
        }
    });

_app.get('/community/article/load.tsl', function(req, res){
	_src.FileUtils.logger('CommunityManager -> Url -> /community/article/load.tsl -> '+req.query.key);
	if(req.session.user){
		_communityManager.getCommunity(req.query.key, function(state, community){
			if(state){
				_articleManager.getCommunityArticles(req.query.key, community.getNom(), req.session.userObject.id, function(found, list){
					if(found){
						//fileUtils.logger(fileUtils.stringifyJSON(list));
						res.send({tag:'success', articles:list});
						_articleManager.resetTables();
					}
				});
			}else{
				res.send({tag:'not_found'});
			}
		});
	}else{
		_communityManager.getCommunity(req.query.key, function(state, community){
			if(state){
				_articleManager.getCommunityArticles(req.query.key, community.getNom(), null, function(found, list){
					if(found){
						//fileUtils.logger(fileUtils.stringifyJSON(list));
						res.send({tag:'success', articles:list});
						_articleManager.resetTables();
					}
				});
			}else{
				res.send({tag:'not_found'});
			}
		});
	}
});

_app.get('/workspace/community/article/load.tsl', function(req, res){
	_src.FileUtils.logger('CommunityManager -> Url -> /workspace/community/article/load.tsl');
	var articlesList = [];
	var timer;
	if(req.session.user){
		_communityManager.getFollowedCommunity(req.session.userObject.id, function(state, communities){
			if(state){
				_src.FileUtils.logger(_src.FileUtils.stringifyJSON(communities));
                for (var i = 0; i < communities.length; i++) {
                    _articleManager.getFollowedCommunityArticles(true, communities[i].id_community, '', req.session.userObject.id, communities.length, _communityManager, _userManager, function(found, list){
                        if(found){
                            _src.FileUtils.logger(_src.FileUtils.stringifyJSON(list));
                            articlesList.push(list);
                            _src.FileUtils.logger('articlesList -> '+articlesList.length+' === '+communities.length+' <- communities');
                            timer = setInterval(function(){
                                if(articlesList.length >= 10){
                                    clearInterval(timer);
                                    articlesList[0].sort(_src.FileUtils.numberDesc);
                                    _src.FileUtils.logger(_src.FileUtils.stringifyJSON(articlesList[0]));
                                    res.send({tag:'success', articles:articlesList[0]});
                                    articlesList = [];
                                    _articleManager.resetTables();
                                }
                            }, 1500);
                            /*if(articlesList.length === communities.length){
                                res.send({tag:'success', articles:articlesList});
                                articlesList = [];
                            }*/
                        }
                    });
                }
				/*_db.getFollowedCommunityArticlesV2(req.session.userObject.id, function () {

                });*/
				/*_articleManager.getFollowedCommunityArticles(_communityManager, communities, req.session.userObject.id, function(found, list){
					if(found){
						_src.FileUtils.logger(_src.FileUtils.stringifyJSON(list));
						articlesList.push(list);
						_src.FileUtils.logger('articlesList -> '+articlesList.length+' === '+communities.length+' <- communities');

						timer = setInterval(function(){
							if(articlesList.length >= 10){
								clearInterval(timer);
								res.send({tag:'success', articles:articlesList});
								articlesList = [];
							}
						}, 1500);
						
					}
				});*/
				/*for (var i = 0; i < communities.length; i++) {
					(function(index){
						_communityManager.getCommunity(communities[index].id_community, function(state, community){
							if(state){
								_src.FileUtils.logger('Community --> '+community.getNom());

								_articleManager.getCommunityArticles(true, communities[index].id_community, community.getNom(), req.session.userObject.id, function(found, list){
									if(found){
										_src.FileUtils.logger(_src.FileUtils.stringifyJSON(list));
										articlesList.push(list);
										_src.FileUtils.logger('articlesList -> '+articlesList.length+' === '+communities.length+' <- communities');
										if(articlesList.length === communities.length){
											res.send({tag:'success', articles:articlesList});
											articlesList = [];
										}
									}
								});
							}else{
								res.send({tag:'not_found'});
							}
						});
					})(i);
				}*/
				//res.send({tag:'success', articles:communities});
				/*_articleManager.getCommunityArticles(true, req.query.key, community.getNom(), req.session.userObject.id, function(found, list){
					if(found){
						//fileUtils.logger(fileUtils.stringifyJSON(list));
						res.send({tag:'success', articles:list});
					}
				});*/
			}else{
				res.send({tag:'not_found'});
			}
		});
	}
});

_app.post('/community/publish_article.tsl', function(req, res){
	if(req.session.user){
		var id 	    = req.body.communityId;
	    var content	  	= req.body.content;
	    var title = req.body.title;

		_src.FileUtils.logger('CommunityManager -> Url -> /community/publish_article.tsl');
	    _articleManager.addArticle(req.session.userObject.id, title, req.session.userObject.prenom+' '+req.session.userObject.nom, id, content, 'text', function(saved, article){
	    	if(saved){
	    		_communityManager.getCommunity(id, function(state, community){
		    		if(state){
		    			article._community = community.getNom();
		    			res.send({tag:'success', article:article});
                        _socketIO.to('community_'+id).emit('newArticle', {article:article});
		    		}
		    	});
	    	}else{
	    		res.send({tag:'warning'});
	    		if(lng === 'fr'){
                    _src.FileUtils.logger(_src.LanguageFr.fr.error_text);
                }else if(lng === 'en'){
                    _src.FileUtils.logger(_src.LanguageEn.en.error_text);
                }
	    	}
	    });
	}else{
		res.send({tag:'session_expired'});
	}
});

_app.get('/hashtag/autocomplete.do', function(req, res){
	_src.FileUtils.logger('CommunityManager -> Best -> '+req.query.key);
	_communityManager.getAutocompleteTags(req.query.key, function(state, tags){
		if(state){
			_src.FileUtils.logger('Autocomplete -> Best -> '+tags[0]);
			res.send(_src.FileUtils.stringifyJSON(tags));
		}
	});
});

_app.post('/create_project', function (req, res){
	if(req.session.user){
		var name 	    = req.body.project_name;
		var lng         = req.body.lang;
	    var desc      	= req.body.desc;
	    var range   	= req.body.range;
	    var groupType  	= req.body.type;
	    var groupNume  	= req.body.groupe;

	    var json = {
	    	name:name,
	    	description:desc,
	    	email:req.session.user,
	    	projectRange:range,
	    	projectType:groupType,
	    	groupNumber:groupType === 'groupe' ? groupNume : 0,
			user_id:req.session.userObject.id
	    };

        _projectManager.addProject(json, function (exists, idProject){
            if(exists){
                if(lng === 'fr'){
                    res.send({tag:'success', message:_src.LanguageFr.fr.create_project_success_text});
                    _src.FileUtils.logger(_src.LanguageFr.fr.create_project_success_text);
                }else if(lng === 'en'){
                    res.send({tag:'success', message:_src.LanguageEn.en.create_project_success_text});
                    _src.FileUtils.logger(_src.LanguageEn.en.create_project_success_text);
                }
                if(groupType === 'groupe'){
                    _fileManager.create(groupNume, idProject, function(state){
                        _src.FileUtils.logger(state);
                        if(state){
                            _fileManager.createFile(_src.FileUtils.workspace_path+_src.FileUtils.private_path+groupNume+'/'+idProject+'/', 'Hello_world', '<h4 align="center" class="form-signin-heading">Bonjour '+json.name+' !</h4>', function(etat) {
                                _src.FileUtils.logger(etat);
                            });
                        }
                    });
                }else{
                    _fileManager.create(json.user_id, idProject, function(state){
                        _src.FileUtils.logger(state);
                        if(state){
                            _fileManager.createFile(_src.FileUtils.workspace_path+_src.FileUtils.private_path+json.user_id+'/'+idProject+'/', 'Hello_world', '<h4 align="center" class="form-signin-heading">Bonjour '+json.name+' !</h4>', function(etat) {
                                _src.FileUtils.logger(etat);
                            });
                        }
                    });
                }
            } else {
                if(lng === 'fr'){
                    res.send({tag:'warning', message:_src.LanguageFr.fr.error_text});
                    _src.FileUtils.logger(_src.LanguageFr.fr.error_text);
                }else if(lng === 'en'){
                    res.send({tag:'warning', message:_src.LanguageEn.en.error_text});
                    _src.FileUtils.logger(_src.LanguageEn.en.error_text);
                }
            }
        });
		
	}else{
		res.send('session_expired');
	}
});

_app.get('/project/get_public_project', function(req, res) {
	if(req.session.user){
		//console.log('check 1 2')
		_projectManager.getPublicProjects(function(charger, projets){
			if(charger){
				res.send({tag:'success', project:projets});
			}else{
				res.send({tag:'not_found', message:_src.LanguageFr.fr.error_text});
			}
		});
	}else{
		res.send('session_expired');
	}
});

_app.get('/load_file/:path/:file', function(req, res){
	var hb = req.params.path.split('_');
    _fs.exists(_src.FileUtils.workspace_path+_src.FileUtils.private_path+hb[1]+"/"+hb[0]+"/"+req.params.file, function (exists) {
        if(exists){
            res.sendFile(_path.resolve('./'+_src.FileUtils.workspace_path+_src.FileUtils.private_path+hb[1]+"/"+hb[0]+"/"+req.params.file));
            _src.FileUtils.logger('./'+_src.FileUtils.workspace_path+_src.FileUtils.private_path+hb[1]+"/"+hb[0]+"/"+req.params.file);
        }else{
            res.send('File not found');
        }
    });
});

_app.get('/project/home_page/get_public_project', function(req, res) {
	_projectManager.getHomePublicProjects(function(charger, projets){
		if(charger){
			res.send({tag:'success', project:projets});
		} else {
			res.send({tag:'not_found', message:_src.LanguageFr.fr.error_text});
			_src.FileUtils.logger(_src.LanguageFr.fr.error_text);
		}
	});
});

_app.post('/project/get_group_projects', function(req, res) {
	if(req.session.user){
		var lng         = req.body.lang;
		_projectManager.getGroupProjects(req.body.groupNumber, function(charger, projets){
			if(charger){
				res.send({tag:'success', project:projets});
			} else {
				res.send({tag:'not_found', message:_src.LanguageFr.fr.error_text});
			}
		});
	}else{
		res.send('session_expired');
	}
});

_app.post('/project/delete_project', function(req, res) {
	if(req.session.user){
		var lng         = req.body.lang;
		_src.FileUtils.logger('-- '+req.body.number+'/'+req.body.projectId);
		_projectManager.deleteProject(req.body.projectId, function(charger){
			if(charger){
				var controller = _src.FileUtils.workspace_path+_src.FileUtils.private_path+req.body.number+'/'+req.body.projectId;
				_fileManager.deleteProjectFolder(controller, function(deleted){
					if(deleted){
						res.send({tag:'success'});
					}else{
						res.send({tag:'warning'});
					}
				});
			} else {
				if(lng === 'fr'){
					res.send({tag:'warning'});
					_src.FileUtils.logger(_src.LanguageFr.fr.error_text);
				}else if(lng === 'en'){
					res.send({tag:'warning'});
					_src.FileUtils.logger(_src.LanguageEn.en.error_text);
				}
			}
		});
	}else{
		res.send('session_expired');
	}
});

_app.post('/project/files/get_project_folder', function (req, res){
    //res.send(__dirname)
    if(req.session.user){
	    var groupNumber = req.body.groupNumber;
	    var group_id = req.body.id;

	    _fileManager.getProjectFolder(groupNumber, group_id, function(is, files){
	    	res.send({tag:'success', folder:is, file:files});
	    });
	}else{
		res.send('session_expired');
	}
});

_app.post('/get_last_project', function(req, res){
	if(req.session.user){
		var useremail   = req.body.email;
		var lng         = req.body.lang;
		var lastFive    = req.body.five;
		_src.FileUtils.logger(lastFive);

		/*if(lng == 'fr'){
	    	res.send({tag:'success', project:_projectManager.getList(), lang:_src.LanguageFr.fr});
	    }else if(lng == 'en'){
	    	res.send({tag:'success', project:_projectManager.getList(), lang:_src.LanguageEn.en});
	    }*/

		_projectManager.getLastFiveProjects(req.session.userObject.id, lastFive==='true', function(charger, projets){
            if(charger){
                res.send({tag:'success', project:projets});
            }
        });


		/*_projectManager.getUserGroups(useremail, function(found, value){
	      if(found){
	      	//_src.FileUtils.logger(value)
	      	if(lng == 'fr'){
		    	res.send({tag:'success', group:value, lang:_src.LanguageFr.fr});
		    }else if(lng == 'en'){
		    	res.send({tag:'success', group:value, lang:_src.LanguageEn.en});
		    }
	      }else{
	      	if(lng == 'fr'){
	      		res.send({tag:'not_found', message:_src.LanguageFr.fr.groups_not_found});
	      	}else if(lng == 'en'){
	      		res.send({tag:'not_found', message:_src.LanguageEn.en.groups_not_found});
	      	}
	      }
	    });*/
	}else{
		res.send('session_expired');
	}
});

_app.post('/load_user_invitations', function (req, res){
	if(req.session.user){
		var lng         = req.body.lang;

        _db.getUserInvitation(req.session.userObject.id, function(state, invitation){
            if(state){
                for (var i = 0; i < invitation.length; i++) {
                    //invitation[i]
                    (function (index){
                        _db.getUserInfoById(invitation[index].sender_id, function(gt, info){
                            if(gt){
                                _src.FileUtils.logger(_src.FileUtils.stringifyJSON(info));
                                invitation[index].senderUser = info['last_name']+' '+info['first_name'];
                                _src.FileUtils.logger(info['last_name']+' '+info['first_name']);
                                _db.getGroupInfosById(invitation[index].group_id, function(etat, group){
                                    if(etat){
                                        invitation[index].groupName = group['name'];
                                    }
                                });
                            }
                        });
                    })(i);
                };
                setTimeout(function() {
                    if(lng === 'fr'){
                        res.send({tag:'success', invitationObject:invitation, lang:_src.LanguageFr.fr});
                    }else if(lng === 'en'){
                        res.send({tag:'success', invitationObject:invitation, lang:_src.LanguageEn.en});
                    }
                }, 5000);
            }else{
                if(lng === 'fr'){
                    res.send({tag:'not_found', message:_src.LanguageFr.fr.invit_not_found});
                }else if(lng === 'en'){
                    res.send({tag:'not_found', message:_src.LanguageEn.en.invit_not_found});
                }
            }
        });
	}else{
		res.send('session_expired');
	}
});

_app.post('/load_user_notifications', function (req, res){
	if(req.session.user){
		var lng         = req.body.lang;
        _db.getUserNotification(req.session.userObject.id, function(state, invitation){
            if(state){
                for (var i = 0; i < invitation.length; i++) {
                    //invitation[i]
                    (function (index){
                        _db.getUserInfoById(invitation[index].id_from, function(gt, info){
                            if(gt){
                                //_src.FileUtils.logger(_src.FileUtils.stringifyJSON(info));
                                invitation[index].senderUser = info['last_name']+' '+info['first_name'];
                                _src.FileUtils.logger(info['last_name']+' '+info['first_name']);
                                /*_db.getGroupInfosById(invitation[index].group_id, function(etat, group){
                                    if(etat){
                                        invitation[index].groupName = group['name'];
                                    }
                                });*/
                            }
                        });
                    })(i);
                }
                setTimeout(function() {
                    if(lng === 'fr'){
                        res.send({tag:'success', invitationObject:invitation, lang:_src.LanguageFr.fr});
                    }else if(lng === 'en'){
                        res.send({tag:'success', invitationObject:invitation, lang:_src.LanguageEn.en});
                    }
                }, 5000);
            }else{
                if(lng === 'fr'){
                    res.send({tag:'not_found', message:_src.LanguageFr.fr.notif_not_found});
                }else if(lng === 'en'){
                    res.send({tag:'not_found', message:_src.LanguageEn.en.notif_not_found});
                }
            }
        });
	}else{
		res.send('session_expired');
	}
});

_app.post('/load_user_groups', function(req, res){
	if(req.session.user){
		var useremail   = req.body.email;
		var lng         = req.body.lang;

		_db.getUserGroups(useremail, function(found, value, countValue){
	      if(found){
	      	//_src.FileUtils.logger(value)
	      	if(lng === 'fr'){
		    	res.send({tag:'success', group:value, nombre:countValue, lang:_src.LanguageFr.fr});
		    }else if(lng === 'en'){
		    	res.send({tag:'success', group:value, nombre:countValue, lang:_src.LanguageEn.en});
		    }
	      }else{
	      	if(lng === 'fr'){
	      		res.send({tag:'not_found', message:_src.LanguageFr.fr.groups_not_found});
	      	}else if(lng === 'en'){
	      		res.send({tag:'not_found', message:_src.LanguageEn.en.groups_not_found});
	      	}
	      }
	    });
	}else{
		res.send('session_expired');
	}
});

_app.post('/load_group_infos', function(req, res){
	if(req.session.user){
		var groupNumber = req.body.groupNumber;
		var lng = req.body.lang;

		_db.getGroupInfos(groupNumber, lng, function(found, group){
			//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(group));
			_db.getGroupCreator(groupNumber, function(found, member){
				//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(member));
                if(member.user_id === req.session.userObject.id){
                    if(lng === 'fr'){
                        member.user = _src.LanguageFr.fr.me;
                        res.send({tag:'success', member:_src.LanguageFr.fr.me, group:group, lang:_src.LanguageFr.fr});
                    }else if(lng === 'en'){
                        member.user = _src.LanguageEn.en.me;
                        res.send({tag:'success', member:_src.LanguageEn.en.me, group:group, lang:_src.LanguageEn.en});
                    }
                }else{
                    _db.getUserInfoById(member.user_id, function(userFound, userInfo){
                        if(lng === 'fr'){
                            member.user = _src.LanguageFr.fr.me;
                            res.send({tag:'success', member:userInfo['last_name']+' '+userInfo['first_name'], group:group, lang:_src.LanguageFr.fr});
                        }else if(lng === 'en'){
                            member.user = _src.LanguageEn.en.me;
                            res.send({tag:'success', member:userInfo['last_name']+' '+userInfo['first_name'], group:group, lang:_src.LanguageEn.en});
                        }
                    });
                }
			});
		});
	}else{
		res.send('session_expired');
	}
});

_app.post('/load_group_members', function(req, res){
	if(req.session.user){
		var groupNumber = req.body.groupNumber;
		var lng = req.body.lang;

        _db.getGroupMembers(groupNumber, req.session.userObject.id, function(found, members){
            if(found){
                if(lng === 'fr'){
                    res.send({tag:'success', member:_src.LanguageFr.fr.me, members:members, lang:_src.LanguageFr.fr});
                }else if(lng === 'en'){
                    res.send({tag:'success', member:_src.LanguageEn.en.me, members:members, lang:_src.LanguageEn.en});
                }
            }else{
                if(lng === 'fr'){
                    res.send({tag:'success', member:_src.LanguageFr.fr.me, lang:_src.LanguageFr.fr});
                }else if(lng === 'en'){
                    res.send({tag:'success', member:_src.LanguageEn.en.me, lang:_src.LanguageEn.en});
                }
            }
        });
	}else{
		res.send('session_expired');
	}
});

_app.post('/rename_group', function(req, res){
	if(req.session.user){
		var groupNumber = req.body.groupNumber;
		var newName = req.body.newName;
		var lng = req.body.lang;

		_db.updateGroupInfos(newName, groupNumber, function(userInfo){
			if(userInfo){
				if(lng === 'fr'){
		      		res.send({tag:'success', text:_src.LanguageFr.fr.rename_group_success_text});
		      	}else if(lng === 'en'){
		      		res.send({tag:'success', text:_src.LanguageEn.en.rename_group_success_text});
		      	}
		    }else{
		      	if(lng === 'fr'){
		      		res.send({tag:'error', text:_src.LanguageFr.fr.error_text});
		      	}else if(lng === 'en'){
		      		res.send({tag:'error', text:_src.LanguageEn.en.error_text});
		      	}
		    }
		});
	}else{
		res.send('session_expired');
	}
});

_app.post('/leave_group', function(req, res){
	if(req.session.user){
		var groupNumber = req.body.groupNumber;
		var isAdmin = req.body.isChecked;
		var lng = req.body.lang;

        if(isAdmin){
            _db.getGroupMembers(groupNumber, req.session.userObject.id, function(found, members, rawMember){
                if(found){
                    _src.FileUtils.logger(members);
                    _src.FileUtils.logger(rawMember);
                    var xy = Math.floor(Math.random() * rawMember.length);
                    _src.FileUtils.logger(_src.FileUtils.stringifyJSON(xy));
                    _src.FileUtils.logger(rawMember[xy].user_id);
                    _db.assignNewAdmin(rawMember[xy].user_id, groupNumber, function(changed){
                        if(changed){
                            _db.deleteGroupMember(groupNumber, req.session.userObject.id, function(deleted){
                                if(deleted){
                                    res.send({tag:'success', user:req.session.userObject, number:groupNumber});
                                }else{
                                    res.send({tag:'error'});
                                }
                            });
                        }else{
                            res.send({tag:'error'});
                        }
                    });
                }else{
                    _db.deleteGroupMember(groupNumber, req.session.userObject.id, function(deleted){
                        if(deleted){
                            //res.send({tag:'success'});
                            _db.leaveGroup(groupNumber, function(deletede){
                                if(deletede){
                                    res.send({tag:'success'});
                                }else{
                                    res.send({tag:'error'});
                                }
                            });
                        }else{
                            res.send({tag:'error'});
                        }
                    });
                }
            });
        }else{
            _db.deleteGroupMember(groupNumber, req.session.userObject.id, function(deleted){
                if(deleted){
                    res.send({tag:'success'});
                }else{
                    res.send({tag:'error'});
                }
            });
        }
	}else{
		res.send('session_expired');
	}
});

_app.post('/check_group_admin', function(req, res){
	if(req.session.user){
		var groupNumber = req.body.groupNumber;
		var lng = req.body.lang;

        _db.checkGroupAdmin(groupNumber, req.session.userObject.id, function(found){
            res.send({tag:'success', isAdmin:found})
        });
	}else{
		res.send('session_expired');
	}
});

_app.post('/update_invitation_status', function(req, res){
	if(req.session.user){
		var lng = req.body.lang;
		var invitID = req.body.invit_id;
		var groupID = req.body.group_id;
		var invitStatus = req.body.status;
		var send_rece_Id = req.body.sen_recI;


		var memberObject = {
			is_admin:0,
			is_creator:0,
			date_added: _src.FileUtils.newDate(),
			user_id:req.session.userObject.id
			};

        _db.getGroupInfosById(groupID, function (eu, hum){
            if(eu){
                memberObject.num_group = hum.numero;
                _src.FileUtils.logger(_src.FileUtils.stringifyJSON(memberObject));
                if(invitStatus === 'agreed'){
                    _db.checkMemberExist(memberObject.num_group, memberObject.user_id, function (stm){
                        if(stm){
                            res.send({tag:'exists'});
                        }else{
                            _db.addMember(memberObject, function(state){
                                if(state){
                                    _src.FileUtils.logger('new member added!');
                                    _src.FileUtils.logger(send_rece_Id);
                                    var finalVar = send_rece_Id.split('_');
                                    var notifObject = {
                                        fromID:finalVar[0],
                                        toID:finalVar[1],
                                        tag:'is_new_member',
                                        status: 'sent'
                                    };
                                    _db.addNotification(notifObject, function (boo){
                                        if(boo){
                                            _db.getUserInfoById(finalVar[1], function(gt, info){
                                                if(gt){
                                                    if(typeof(usernames[info['email']]) !== 'undefined')
                                                        _socketIO.to(usernames[info['email']]).emit("newNotification");
                                                    res.send({tag:'success'});
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }else{
                    res.send({tag:'success'});
                }
            }
        });
	}else{
		res.send('session_expired');
	}
});

_app.post('/update_notification_status', function(req, res){
	if(req.session.user){
		var lng = req.body.lang;
		var invitID = req.body.notif_id;
		var groupID = req.body.group_id;
		var invitStatus = req.body.status;

		_db.updateNotificationStatus(invitID, invitStatus, function (updated){
			if(updated){
				res.send({tag:'success', message:'success'});
			}else{
				res.send({tag:'not_found'});
			}
		});
	}else{
		res.send('session_expired');
	}
});

_app.post('/load_app_language', function(req, res){
	if(req.session.user){
		var lng = req.body.lang;
		
		if(lng === 'fr'){
			res.send(_src.LanguageFr.fr);
		}else if(lng === 'en'){
			res.send(_src.LanguageEn.en);
		}
	}else{
		res.send('session_expired');
	}
});

_app.post('/load_app_link', function(req, res){
	if(req.session.user){
		var lng = req.body.lang;
		
		if(lng === 'fr'){
			res.send(_src.LanguageFr.fr);
		}else if(lng === 'en'){
			res.send(_src.LanguageEn.en);
		}
	}else{
		res.send('session_expired');
	}
});

_app.post('/app/load_app_language', function(req, res){
	var lng = req.body.lang;
		
	if(lng === 'fr'){
		res.send(_src.LanguageFr.fr);
	}else if(lng === 'en'){
		res.send(_src.LanguageEn.en);
	}
});

_app.post('/app/load_app_link', function(req, res){
	var lng = req.body.lang;
		
	if(lng === 'fr'){
		res.send(_src.LanguageFr.link);
	}else if(lng === 'en'){
		res.send(_src.LanguageEn.link);
	}
});

_app.post('/create_group', function(req, res){
	if(req.session.user){
		var groupName = req.body.groupName;
		var groupMember = req.body.member;
		var lng = req.body.lang;
		var groupNumber = _src.FileUtils.generateNumber();
		_db.getUserInfo(req.session.user, function(userInfo){
			var memberObject = {
				num_group:groupNumber,
				user_id:userInfo['id'],
				is_admin:1,
				is_creator:1,
				date_added: _src.FileUtils.newDate()
			};
			var groupObject = {
				numero:groupNumber,
				name:groupName,
				date_creation: _src.FileUtils.newDate()
			};
			_db.addMember(memberObject, function(state){
				if(state){
					_db.createGroup(groupObject, function(etat){
						if(etat){
							_db.getGroupInfos(groupNumber, lng, function(got, groupInfo){
								if(got){
									_db.getUserInfo(groupMember, function(info){
										if(info !== 'error'){
											var invitationObject = {
												senderID:memberObject.user_id,
												receiverID:info['id'],
												groupID:groupInfo.id,
												status:'sent',
												delay:3
											};
											_db.checkInvitation(invitationObject, function (check, reserx){
												if(check){
													_db.updateInvitationStatus(reserx[0].id, 'sent', function(x){
														if(x){
															if(typeof (usernames[groupMember]) !== "undefined"){
																_socketIO.to(usernames[groupMember]).emit("newInvitation");
															}
														}
													});
												}else{
													_db.addInvitation(invitationObject, function(state){
														if(state){
															if(typeof (usernames[groupMember]) !== "undefined"){
																_socketIO.to(usernames[groupMember]).emit("newInvitation");
															}
															if(lng === 'fr'){
																//res.send({tag:'success', message:_src.LanguageFr.fr.invitation_sent});
																_src.FileUtils.logger(_src.LanguageFr.fr.invitation_sent);
															}else if(lng === 'en'){
																//res.send({tag:'success', message:_src.LanguageEn.en.invitation_sent});
																_src.FileUtils.logger(_src.LanguageEn.en.invitation_sent);
															}
														}
													});
												}
											});
											
										}
									});
								}
							});
							if(lng === 'fr'){
					      		res.send({tag:'success', message:_src.LanguageFr.fr.create_group_success_text});
					      	}else if(lng === 'en'){
					      		res.send({tag:'success', message:_src.LanguageEn.en.create_group_success_text});
					      	}
					      }else{
					      	if(lng === 'fr'){
					      		res.send({tag:'not_found', message:_src.LanguageFr.fr.groups_not_found});
					      	}else if(lng === 'en'){
					      		res.send({tag:'not_found', message:_src.LanguageEn.en.groups_not_found});
					      	}
					      }
					});
				}else{
					if(lng === 'fr'){
			      		res.send({tag:'not_found', message:_src.LanguageFr.fr.groups_not_found});
			      	}else if(lng === 'en'){
			      		res.send({tag:'not_found', message:_src.LanguageEn.en.groups_not_found});
			      	}
				}
			});
		});
	}else{
		res.send('session_expired');
	}
});

_app.post('/add_new_member', function(req, res){
	if(req.session.user){
		var groupId = req.body.groupId;
		var lng = req.body.lang;
		var member = req.body.member;

		_db.checkUserAccount(member, function(exists){
			if(exists){
				_src.FileUtils.logger('exists');
				_db.getUserInfo(req.session.user, function(userInfo){
					if(userInfo !== 'error'){
						_db.getUserInfo(member, function(info){
							if(info !== 'error'){
								var invitationObject = {
									senderID:userInfo['id'],
									receiverID:info['id'],
									groupID:groupId,
									status:'sent',
									delay:3
								};
								_db.getGroupInfosById(groupId, function (v, grouil){
									if(v){
										//exists
										//res.send({tag:'exists'});
										_db.checkMemberExist(grouil.numero, info['id'], function (stm){
											if(stm){
												res.send({tag:'exists'});
											}else{
												_db.checkInvitation(invitationObject, function (check, reserx){
													if(check){
														_db.updateInvitationStatus(reserx[0].id, 'sent', function(state){
															if(state){
																if(typeof (usernames[member]) !== "undefined"){
																	_socketIO.to(usernames[member]).emit("newInvitation");
																}
																if(lng === 'fr'){
																	res.send({tag:'success', message:_src.LanguageFr.fr.invitation_sent});
																	_src.FileUtils.logger(_src.LanguageFr.fr.invitation_sent);
																}else if(lng === 'en'){
																	res.send({tag:'success', message:_src.LanguageEn.en.invitation_sent});
																	_src.FileUtils.logger(_src.LanguageEn.en.invitation_sent);
																}
															}
														});
													}else{
														_db.addInvitation(invitationObject, function(state){
															if(state){
																if(typeof (usernames[member]) !== "undefined"){
																	_socketIO.to(usernames[member]).emit("newInvitation");
																}
																if(lng === 'fr'){
																	res.send({tag:'success', message:_src.LanguageFr.fr.invitation_sent});
																	_src.FileUtils.logger(_src.LanguageFr.fr.invitation_sent);
																}else if(lng === 'en'){
																	res.send({tag:'success', message:_src.LanguageEn.en.invitation_sent});
																	_src.FileUtils.logger(_src.LanguageEn.en.invitation_sent);
																}
															}
														});
													}
												});
											}
										});
									}
								});
								/*_db.addInvitation(invitationObject, function(state){
									if(state){
										if(lng == 'fr'){
											res.send({tag:'success', message:_src.LanguageFr.fr.invitation_sent});
											_src.FileUtils.logger(_src.LanguageFr.fr.invitation_sent);
										}else if(lng == 'en'){
											res.send({tag:'success', message:_src.LanguageEn.en.invitation_sent});
											_src.FileUtils.logger(_src.LanguageEn.en.invitation_sent);
										}
									}
								});*/
							}
						});
					}
				});
			}else{
				if(lng === 'fr'){
					res.send({tag:'not_found', message:_src.LanguageFr.fr.user_does_not_exists});
					_src.FileUtils.logger(_src.LanguageFr.fr.user_does_not_exists);
				}else if(lng === 'en'){
					res.send({tag:'not_found', message:_src.LanguageEn.en.user_does_not_exists});
					_src.FileUtils.logger(_src.LanguageEn.en.user_does_not_exists);
				}
			}
		});
	}else{
		res.send('session_expired');
	}
});

var _profilUpload = _multer({dest: 'tmp/'});
_app.post('/update_profil_photo', _profilUpload.single('photo'), function (req, res, next){
	if(req.session.user){
		var photo    = req.body.photo;
		var lng      = req.body.lang;
		_src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.file));
		//_src.FileUtils.logger(req.body);

		_src.FileWriter.copy(_fs, _src.FileUtils, 'tmp/'+req.file.filename, 'upload/_profil/'+req.session.user+'.png', function (exists){
			if(exists){
				if(lng === 'fr'){
					res.send({tag:'success', message:_src.LanguageFr.fr.update_photo_text});
					_src.FileUtils.logger(_src.LanguageFr.fr.update_photo_text);
				}else if(lng === 'en'){
					res.send({tag:'success', message:_src.LanguageEn.en.update_photo_text});
					_src.FileUtils.logger(_src.LanguageEn.en.update_photo_text);
				}
			} else {
				if(lng === 'fr'){
					res.send({tag:'warning', message:_src.LanguageFr.fr.update_photo_wrong});
					_src.FileUtils.logger(_src.LanguageFr.fr.update_photo_wrong);
				}else if(lng === 'en'){
					res.send({tag:'warning', message:_src.LanguageEn.en.update_photo_wrong});
					_src.FileUtils.logger(_src.LanguageEn.en.update_photo_wrong);
				}
			}
		});
		//@deprecated
		/*if (req.url == '/update_profil_photo') {
		    var form = new _formidable.IncomingForm();
		    form.parse(req, function(err, fields, files) {
		      //res.send('Upload terminé');
		      //_src.FileUtils.logger(_src.FileUtils.stringifyJSON(fields));
		      lng = fields.lang;
		    });
		    form.on('progress', function(bytesReceived, bytesExpected) {
		        var percent_complete = (bytesReceived / bytesExpected) * 100;
		        _src.FileUtils.logger(percent_complete.toFixed(2));
		    });
		 
		    form.on('error', function(err) {
		        _src.FileUtils.logger(err);
		    });
		 
		    form.on('end', function(fields, files) {
		        /* Temporary location of our uploaded file
		        var temp_path = this.openedFiles[0].path;
		        /* The file name of the uploaded file 
		        var file_name = this.openedFiles[0].name;
		        /* Location where we want to copy the uploaded file 
		        var new_location = './upload/_profil/';
		        //_src.FileUtils.logger(_src.FileUtils.stringifyJSON(fields));
		        
		        _src.FileWriter.copy(_fs, _src.FileUtils, temp_path, new_location+req.session.user+'.png', function (exists){
					if(exists){
						if(lng == 'fr'){
							res.send({tag:'success', message:_src.LanguageFr.fr.update_photo_text});
							_src.FileUtils.logger(_src.LanguageFr.fr.update_photo_text);
						}else if(lng == 'en'){
							res.send({tag:'success', message:_src.LanguageEn.en.update_photo_text});
							_src.FileUtils.logger(_src.LanguageEn.en.update_photo_text);
						}
					} else {
						if(lng == 'fr'){
							res.send({tag:'warning', message:_src.LanguageFr.fr.update_photo_wrong});
							_src.FileUtils.logger(_src.LanguageFr.fr.update_photo_wrong);
						}else if(lng == 'en'){
							res.send({tag:'warning', message:_src.LanguageEn.en.update_photo_wrong});
							_src.FileUtils.logger(_src.LanguageEn.en.update_photo_wrong);
						}
					}
				});
		    });
		 
		    return;
		  }*/
	}else{
		res.send('session_expired');
	}
});
_app.post('/update_project_photo', _profilUpload.single('photo'), function (req, res, next){
	if(req.session.user){
		var photo    = req.body.photo;
		var lng      = req.body.lang;
		var projectId = req.body.projectId;
		_src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.file));
		//_src.FileUtils.logger(req.body);

		_src.FileWriter.copy(_fs, _src.FileUtils, 'tmp/'+req.file.filename, 'upload/_project/'+projectId+'.jpg', function (exists){
			if(exists){
				if(lng === 'fr'){
					res.send({tag:'success', message:_src.LanguageFr.fr.update_photo_text, projectId:projectId});
					_src.FileUtils.logger(_src.LanguageFr.fr.update_photo_text);
				}else if(lng === 'en'){
					res.send({tag:'success', message:_src.LanguageEn.en.update_photo_text, projectId:projectId});
					_src.FileUtils.logger(_src.LanguageEn.en.update_photo_text);
				}
			} else {
				if(lng === 'fr'){
					res.send({tag:'warning', message:_src.LanguageFr.fr.update_photo_wrong});
					_src.FileUtils.logger(_src.LanguageFr.fr.update_photo_wrong);
				}else if(lng === 'en'){
					res.send({tag:'warning', message:_src.LanguageEn.en.update_photo_wrong});
					_src.FileUtils.logger(_src.LanguageEn.en.update_photo_wrong);
				}
			}
		});
	}else{
		res.send('session_expired');
	}
});

_app.post('/community/publish_article_photo.tsl', _profilUpload.single('photo'), function (req, res, next){
	if(req.session.user){
		/*var photo    = req.body.photo;
		var lng      = req.body.lang;
		var projectId = req.body.projectId;*/
		_src.FileUtils.logger(_src.FileUtils.stringifyJSON(req.file));
		//_src.FileUtils.logger(req.body);

		var id 	    = req.body.communityId;
	    var content	  	= req.body.content;
	    var title = req.body.title;

		_src.FileUtils.logger('CommunityManager -> Url -> /community/publish_article_photo.tsl');
	    _articleManager.addArticle(req.session.userObject.id, title, req.session.userObject.prenom+' '+req.session.userObject.nom, id, content, 'image', function(saved, article){
	    	if(saved){
	    		_communityManager.getCommunity(id, function(state, community){
		    		if(state){
		    			article._community = community.getNom();
		    			_src.FileWriter.copy(_fs, _src.FileUtils, 'tmp/'+req.file.filename, 'upload/_article/'+article._id+'.jpg', function (exists){
							if(exists){
								res.send({tag:'success', article:article});
								_socketIO.to('community_'+id).emit('newArticle', {article:article});
							} else {
								if(lng === 'fr'){
									res.send({tag:'warning', message:_src.LanguageFr.fr.update_photo_wrong});
									_src.FileUtils.logger(_src.LanguageFr.fr.update_photo_wrong);
								}else if(lng === 'en'){
									res.send({tag:'warning', message:_src.LanguageEn.en.update_photo_wrong});
									_src.FileUtils.logger(_src.LanguageEn.en.update_photo_wrong);
								}
							}
						});
		    		}
		    	});
	    	}else{
	    		res.send({tag:'warning'});
	    		if(lng === 'fr'){
                    _src.FileUtils.logger(_src.LanguageFr.fr.error_text);
                }else if(lng === 'en'){
                    _src.FileUtils.logger(_src.LanguageEn.en.error_text);
                }
	    	}
	    });
	}else{
		res.send('session_expired');
	}
});
_app.use(function (req, res, next) {
	if(req.method === 'POST' && req.url === '/get_connected'){
		if(req.body.remember_me){
			req.session.cookie.maxAge = 2592000000; //30*24*60*60*1000 Remember me for 30 days
		}else{
			req.session.cookie.expires = false;
		}
	}
	next();
});
	
_app.use(function(req, res, next){    
    res.status(404);
    _src.FileUtils.logger(req.url);
    let urlLink = req.url.split('/');
    _src.FileUtils.logger(urlLink);
    _src.FileUtils.logger(urlLink[1]);
    let lng = urlLink[1];
    a = _src.FileUtils.newDate();
    if(typeof(req.session.user) === 'undefined'){
    	if(lng === 'fr'){
            res.render('404.ejs', {
                sessionTag: 'false',
                language: _src.LanguageFr.fr,
                link: _src.LanguageFr.link,
                annee: a.getFullYear()
            });
		}else {
            res.render('404.ejs', {
                sessionTag: 'false',
                language: _src.LanguageEn.en,
                link: _src.LanguageEn.link,
                annee: a.getFullYear()
            });
        }
	    _src.FileUtils.logger('Not Found!');
	}else{
    	if(lng === 'fr'){
            res.render('404.ejs', {
                sessionTag: 'true',
                accueil: req.session.user,
                language: _src.LanguageFr.fr,
                link: _src.LanguageFr.link,
                annee: a.getFullYear()
            });
		}else {
            res.render('404.ejs', {
                sessionTag: 'true',
                accueil: req.session.user,
                language: _src.LanguageEn.en,
                link: _src.LanguageEn.link,
                annee: a.getFullYear()
            });
        }
	    _src.FileUtils.logger('Page introuvable !');
	}
});
}

function socketManagement () {
	// body...
	_socketIO.sockets.on(_src.FileUtils.connection, function (socket) {
		_src.FileUtils.logger(_src.FileUtils.newUser);
	    // when the client emits 'adduser', this listens and executes
		socket.on(_src.FileUtils.AddUser, function(username, imei, idApp, appCode, fn){
			onAddUser(socket,username,imei,idApp,appCode);
			_src.FileUtils.logger(socket.handshake.address);
			_src.FileUtils.logger(username);
			fn(_src.FileUtils.connectedText);
		});
		socket.on('remove_me', function(user, groupNumber){
			socket.leave(groupNumber);
			socket.in(groupNumber).emit('left_group', user.prenom+' '+user.nom+'$;left_group');
		});
		socket.on('addMeToRoom', function(id_group){
			_db.getGroupInfosById(id_group, function(loaded, groupe){
				if(loaded){
					socket.join(groupe.numero);
					socket.in(groupe.numero).emit('isConnectedToGroup', socket.username);
				}
			});
			/*socket.join(groupNumber);
			socket.in(groupNumber).emit('isConnectedToGroup', socket.username);*/
		});
		socket.on('getUserState', checkUserOnline);
		socket.on(_src.FileUtils.disconnect, function(){
			// remove the username from global usernames list
			if(socket.appCode === 1500){
	      	  	//Windows 8.1/10
                onlineDevices['Windows_8_1_10'] = Number(onlineDevices['Windows_8_1_10']) - 1;
	      	  	_src.FileUtils.logger('Windows_8_1_10 devices -> '+onlineDevices.Windows_8_1_10);
	      	}else if(socket.appCode === 2000){
                onlineDevices['IOS'] = Number(onlineDevices['IOS']) - 1;
	      		_src.FileUtils.logger('IOS -> '+onlineDevices.IOS);
	      	}else if(socket.appCode === 2500){
                onlineDevices['Web'] = Number(onlineDevices['Web']) - 1;
	      		_src.FileUtils.logger('Web -> '+onlineDevices.Web);
	      	}else if(socket.appCode === 3000){
                onlineDevices['Windows_phone'] = Number(onlineDevices['Windows_phone']) - 1;
	      		_src.FileUtils.logger('Windows_phone -> '+onlineDevices.Windows_phone);
	      	}else if(socket.appCode === 1000){
                onlineDevices['Android'] = Number(onlineDevices['Android']) - 1;
	      		_src.FileUtils.logger('Android -> '+onlineDevices.Android);
	      	}
			/*_db.getLastConnection(socket.username, function (data, userExist){
				if(userExist){
					if(data['number_off'] === socket.username){
						_src.FileUtils.logger(socket.username+' -> '+_src.FileUtils.existsText);
						_db.UpdateLastConnected(socket.username);
					}else{
						_src.FileUtils.logger(socket.username+' -> '+_src.FileUtils.notExistsText);
						_db.insertLastConnected(socket.username);
					}
				}else{
					_db.insertLastConnected(socket.username);
				}
			});*/
			_db.getUserGroups(socket.username, function (t, groups){
				if(t){
				  	for (var i = 0; i < Object.keys(groups).length; i++) {
				  		socket.leave(groups[i].numero);
						//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(groups[i]))
						//_src.FileUtils.logger(socket.in(groups[i].groupe)._rooms)
						socket.in(groups[i].numero).emit('group_test', socket.username+' est déconnecté du group '+groups[i].numero);
						socket.in(groups[i].numero).emit('isDisconnectedToGroup', socket.username);
						//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(_socketIO.sockets.adapter.rooms[groups[i].groupe]))
						//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(_socketIO.sockets.adapter.rooms));
				  	}
				}
			});
			/*if(_userManager.getUserByEmail(socket.username).id !== undefined) {
                _communityManager.getFollowedCommunity(_userManager.getUserByEmail(socket.username).id, function (state, communities) {
                    if (state) {
                        _src.FileUtils.logger(_src.FileUtils.stringifyJSON(communities));
                        for (var i = 0; i < Object.keys(communities).length; i++) {
                            socket.leave('community_' + communities[i].id_community);
                        }
                    }
                });
            }*/
			delete usernames[socket.username];
			delete usernames[_src.FileUtils.undefinit];
			_src.FileUtils.logger(JSON.stringify(usernames))
		});
	});
}

/*Protected functions*/
function onAddUser (socket,username, imei, idApp, appCode) {
	// body...
	_src.FileUtils.logger(appCode);
	if(imei === _src.FileUtils.webText){
		var tempTab = [];
      if(username !== _src.FileUtils.undefinit){
        if(typeof usernames[username] !== _src.FileUtils.stringText){
          	// we store the username in the socket session for this client
          	socket.username = username;  
		  	if(appCode !== _src.FileUtils.undefinit)
		    	socket.appCode = appCode;
          	me = username; 
          	usernames[username] = socket.id;
          	//canChat = true;
	        //_socketIO.sockets.emit('updateUsers', usernames);
	      	_socketIO.to(socket.id).emit('connexion', _src.FileUtils.connectedText);
            onlineDevices[_src.FileUtils.web] = Number(onlineDevices[_src.FileUtils.web]) + 1;
			_src.FileUtils.logger(_src.FileUtils.web+' -> '+onlineDevices.Web);
			_db.getUserGroups(username, function (b, groups){
				if(b){
				  	for (var i = 0; i < Object.keys(groups).length; i++) {
				  		socket.join(groups[i].numero);
						//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(groups[i]))
						//_src.FileUtils.logger(socket.in(groups[i].groupe)._rooms)
						//if(_src.FileUtils.DEBUG)
							socket.in(groups[i].numero).emit('group_test', username+' a rejoint le group '+groups[i].numero);
							socket.in(groups[i].numero).emit('isConnectedToGroup', socket.username);
						//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(_socketIO.sockets.adapter.rooms[groups[i].groupe]))
						//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(_socketIO.sockets.adapter.rooms));
				  	}
				}
			});

            _communityManager.getFollowedCommunity(_userManager.getUserByEmail(username).id, function(state, communities) {
                if (state) {
                    _src.FileUtils.logger(_src.FileUtils.stringifyJSON(communities));
                    for (var i = 0; i < Object.keys(communities).length; i++) {
                        socket.join('community_'+communities[i].id_community);
                    }
                }
            });
			setTimeout(function(){
				if(_src.FileUtils.debug)
	      			_socketIO.to(socket.id).emit('user_groups', tempTab);
	      		tempTab = [];
			}, 6000);
        }
      }
    }else{
    	_src.FileUtils.logger(username+' -> '+imei);
      // add the client's username to the global list
      _db.checkInfo(username, imei, function (exists){
      	if(exists){
      		_src.FileUtils.logger(_src.FileUtils.existsText);
      		if(username !== _src.FileUtils.undefinit){
      			if(typeof usernames[username] !== _src.FileUtils.stringText){
      				//We store the username in the socket session for client.
      				socket.username = username;
      				if(appCode !== _src.FileUtils.undefinit)
      					socket.appCode = appCode;
      				else
      					socket.appCode = 1000;
      				usernames[username] = socket.id;
      				usernumberTab.push(username+'-'+imei);
      				_socketIO.to(socket.id).emit(_src.FileUtils.canSend, _src.FileUtils.canSendText)
      				if(appCode === 1500){
			      	  	//Windows 8.1/10
                        onlineDevices[_src.FileUtils.windows_10] = Number(onlineDevices[_src.FileUtils.windows_10]) + 1
			      	  	_src.FileUtils.logger(_src.FileUtils.windows_10+' -> '+onlineDevices.Windows_8_1_10);
			      	}else if(appCode === 2000){
                        onlineDevices[_src.FileUtils.ios] = Number(onlineDevices[_src.FileUtils.ios]) + 1;
			      		_src.FileUtils.logger(_src.FileUtils.ios+' -> '+onlineDevices.IOS);
			      	}else if(appCode === 2500){
                        onlineDevices[_src.FileUtils.web] = Number(onlineDevices[_src.FileUtils.web]) + 1;
			      		_src.FileUtils.logger(_src.FileUtils.web+' -> '+onlineDevices.Web);
			      	}else if(appCode === 3000){
                        onlineDevices[_src.FileUtilsw.indows_phone] = Number(onlineDevices[_src.FileUtils.windows_phone]) + 1;
			      		_src.FileUtils.logger(_src.FileUtils.windows_phone+' -> '+onlineDevices.Windows_phone);
			      	}else{
			      		socket.appCode = 1000;
                        onlineDevices[_src.FileUtils.android] = Number(onlineDevices[_src.FileUtils.android]) + 1;
			      		_src.FileUtils.logger(_src.FileUtils.android+' -> '+onlineDevices.Android);
			      	}
      				onLoadAsyncMsg(socket.username, idApp);
      				_db.getUserGroups(username, function (j, groups){
      					if(j){
						  	for (var i = 0; i < Object.keys(groups).length; i++) {
						  		socket.join(groups[i].numero);
								//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(groups[i]))
								//_src.FileUtils.logger(socket.in(groups[i].groupe)._rooms)
								if(_src.FileUtils.DEBUG)
									socket.in(groups[i].numero).emit('group_test', username+' a rejoint le group '+groups[i].numero);
								//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(_socketIO.sockets.adapter.rooms[groups[i].groupe]))
								//_src.FileUtils.logger(_src.FileUtils.stringifyJSON(_socketIO.sockets.adapter.rooms));
						  	}
						}
					});
      			}
      		}
      	}else{
      		_src.FileUtils.logger(_src.FileUtils.notExistsText);
      		_socketIO.to(socket.id).emit(_src.FileUtils.canNotSend, imei);
      	}
      });
    }
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}
function restrict2(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/fr/login');
  }
}
function checkUserOnline(key, id, fn)
{
  /*var val = false;
  
  for(var key in usernames)
    {
    	usernames[key] == v
 	}*
  return val;*/
  _src.FileUtils.logger(key);
  _src.FileUtils.logger(id);
  _src.FileUtils.logger(typeof(usernames[key]) !== 'undefined');
  fn(typeof(usernames[key]) !== 'undefined', id);
}
module.exports = MainController;