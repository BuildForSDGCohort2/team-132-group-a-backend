/*PageManager file Created By Henock Bongi [HBI] on December, 24th, 2016 at 08:53 [08:53 AM]*/
/*Version 1.0*/


/*------app-language-------*/
var french;
var english;
var espagnol;
var italian;
/*------app-links-------*/
var frenchLink;
var englishLink;
var espagnolLink;
var italianLink;
var fileUtils;

function PageManager (lngArray, FileUtils) {
	// body...
	english = lngArray[0];
	french = lngArray[1];
	fileUtils = FileUtils;
	fileUtils.logger('Instantiate!');
	//fileUtils.logger(fileUtils.stringifyJSON(lngArray));
}

//Public methods

PageManager.prototype.run = run;
//PageManager.prototype.loadLanguage = loadLanguage;
PageManager.prototype.homePage = homePage;
PageManager.prototype.loginPage = loginPage;
PageManager.prototype.signUpPage = signUpPage;
PageManager.prototype.homeCommunityPage = homeCommunityPage;
PageManager.prototype.overviewCommunityPage = overviewCommunityPage;
PageManager.prototype.homeLinksPage = homeLinksPage;

/*----------------------------------------------------------*/

//Protected methods

function homePage (req, res, lng) {
	// body...
	var a = fileUtils.newDate();
	loadLanguage(lng, function (language, lien){
		//fileUtils.logger(fileUtils.stringifyJSON(language));
        res.render('index.ejs', {
        	sessionTag:typeof(req.session.user) !== 'undefined',
        	language:language,
        	link:lien,
        	accueil:req.session.user,
        	annee:a.getFullYear()
        });
	});
}

function homeCommunityPage(req, res, lng) {
	// body...
	var a = fileUtils.newDate();
	loadLanguage(lng, function (language, lien){
		//fileUtils.logger(fileUtils.stringifyJSON(language));
        res.render('community_home.ejs', {
        	sessionTag: typeof(req.session.user) !== 'undefined',
        	language:language,
        	link:lien,
        	accueil:req.session.user,
        	annee:a.getFullYear()
        });
	});
}

function homeLinksPage(req, res, lng) {
	// body...
	var a = fileUtils.newDate();
	loadLanguage(lng, function (language, lien){
		//fileUtils.logger(fileUtils.stringifyJSON(language));
        res.render('index.ejs', {
        	sessionTag: typeof(req.session.user) !== 'undefined',
        	language:language,
        	link:lien,
        	accueil:req.session.user,
        	annee:a.getFullYear()
        });
	});
}

function overviewCommunityPage(req, res, lng, community, followed, data) {
    // body...
    var a = fileUtils.newDate();
    loadLanguage(lng, function (language, lien){
        fileUtils.logger(fileUtils.stringifyJSON(community));
        fileUtils.logger(fileUtils.stringifyJSON(data));
        res.render('community_overview.ejs', {
            sessionTag:typeof(req.session.user) !== 'undefined',
            language:language,
            link:lien,
            accueil:req.session.user,
            annee:a.getFullYear(),
            communityInfo:typeof(community) !== 'undefined' ? community : "nothing",
            isFollowing:typeof(followed) !== 'undefined' ? followed : false,
			isAdmin:typeof(data) !== 'undefined' ? data[0] : null
        });
    });
}

function loginPage (req, res, lng) {
	// body...
	var a = fileUtils.newDate();
	loadLanguage(lng, function (language, lien){
		res.render('sign_in.ejs', {
	    	sessionTag:'false', 
	        language:language,
	        link:lien,
	        message: req.flash('login'),
	    	annee:a.getFullYear()
	    });
	});
}

function signUpPage (req, res, lng) {
	// body...
	var a = fileUtils.newDate();
	loadLanguage(lng, function (language, lien){
		res.render('sign_up.ejs', {
	    	sessionTag:'false',
	        language:language,
	        link:lien,
	        message: req.flash('signup'),
	    	annee:a.getFullYear()
	    });
	});
}

function loadLanguage (lng, fn) {
	// body...
	//fileUtils.logger(fileUtils.stringifyJSON(english));
	if(lng === 'fr'){
		loadLinks(lng, function (link){
		fn(french, link);
		});
	}else if(lng === 'es'){
		loadLinks(lng, function (link){
		fn(espagnol, link);
		});
	}else if(lng === 'it'){
		loadLinks(lng, function (link){
		fn(italian, link);
		});
	}else if(lng === 'en'){
		loadLinks(lng, function (link){
		fn(english, link);
		});
		//fileUtils.logger(english.sign_up);
	}
}
function loadLinks (lng, fn) {
	// body...
	if(lng === 'fr'){
		fn(frenchLink);
	}else if(lng === 'es'){
		fn(espagnolLink);
	}else if(lng === 'it'){
		fn(italianLink);
	}else if(lng === 'en'){
		fn(englishLink);
		//fileUtils.logger(english.sign_up);
	}
}
function run(linkArray) {
	// body...
	englishLink = linkArray[0];
	frenchLink = linkArray[1];
}
module.exports = PageManager;