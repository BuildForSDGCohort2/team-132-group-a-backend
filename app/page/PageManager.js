
/*Version 1.0*/


var french;
var english;
var espagnol;
var italian;
var fileUtils;

function PageManager (lngArray, FileUtils) {
	// body...
	english = lngArray[0];
	french = lngArray[1];
	fileUtils = FileUtils;
	fileUtils.logger('Instantiate!');
	//fileUtils.logger(fileUtils.stringifyJSON(lngArray));
}

PageManager.prototype.loadLanguage = loadLanguage;

function homePage (req, res, lng) {
	// body...
	var a = fileUtils.newDate();
	loadLanguage('en', function (language){
		fileUtils.logger(fileUtils.stringifyJSON(language));
		if(typeof(req.session.user) == 'undefined'){
			res.render('index.js', {sessionTag:'false', 
	        	sign_in:language.sign_in,
	        	sign_up:language.sign_up,
	        	sign_up_link:'register',
	        	sign_in_link:'login',
	        	welcome_title: language.welcome_title_text,
	        	annee:a.getFullYear()
	        });
		}else{
			res.render('index.js', {sessionTag:'true', 
	        	accueil:req.session.user,
	        	annee:a.getFullYear()
	        });
		}
	});
}

function loadLanguage (lng, fn) {
	// body...
	fileUtils.logger(fileUtils.stringifyJSON(english));
	if(lng == 'fr'){
		fn(french);
	}else if(lng == 'es'){
		fn(espagnol);
	}else if(lng == 'it'){
		fn(italian);
	}else if(lng == 'en'){
		fn(english);
		fileUtils.logger(english.sign_up);
	}
}
module.exports = PageManager;