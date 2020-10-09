

var _fs;
var _fileUtils;
var projectFolder = [];
var projectObject = {};

function FileManager(fs, fileutils) {
	// body...
	_fs = fs;
	_fileUtils = fileutils;
	createMainDir();
    createSystemDir();
}

/**/
FileManager.prototype.create = create;
FileManager.prototype.createFile = createFile;
FileManager.prototype.createSessionFile = createSessionFile;
FileManager.prototype.deleteProjectFolder = deleteProjectFolder;
FileManager.prototype.getProjectFolder = getProjectFolder;
FileManager.prototype.getSessionFile = getSessionFile;
FileManager.prototype.deleteSessionFile = deleteSessionFile;
/**/

//@protected
function create(name, project, fn) {
	// body...
	if(!_fs.existsSync(_fileUtils.workspace_path+_fileUtils.private_path+name)){
		_fs.mkdir(_fileUtils.workspace_path+_fileUtils.private_path+name, function(err){
			if(err){
				_fileUtils.logger(err);
				fn(false);
			}else{
				createSubDir(name, project, function(done) {
					fn(done);
				});
			}
		});
	}else{
		createSubDir(name, project, function(done) {
			fn(done);
		});
	}
}

function createSubDir(groupNumber, name, fn) {
	// body...
	if(!_fs.existsSync(_fileUtils.workspace_path+_fileUtils.private_path+groupNumber+'/'+name)){
		_fs.mkdir(_fileUtils.workspace_path+_fileUtils.private_path+groupNumber+'/'+name, function(err){
			if(err){
				_fileUtils.logger(err);
				fn(false);
			}else{
				fn(true);
			}
		});
	}
}

function createFile(path, filename, content, fn) {
    // body...
    //fs.writeFileSync("stat_visite.txt", "Le nombre de visite est : " + ident_stat[u].id_stat + " visites", "UTF-8");
    _fs.writeFile(path+filename+'.md', content, 'UTF-8', function(err){
        if(err){
            _fileUtils.logger(err);
            fn(false);
        }else{
            fn(true);
        }
    });
}
function createSessionFile(content, fn) {
    // body...
    //fs.writeFileSync("stat_visite.txt", "Le nombre de visite est : " + ident_stat[u].id_stat + " visites", "UTF-8");
    _fs.writeFile(_fileUtils.system_path+_fileUtils.config_path+'/session.json', content, 'UTF-8', function(err){
        if(err){
            _fileUtils.logger(err);
            fn(false);
        }else{
            fn(true);
        }
    });
}

function createMainDir() {
	// body...
	if(!_fs.existsSync(_fileUtils.workspace_path)){
		_fs.mkdir(_fileUtils.workspace_path, function(err){
			if(err){
				_fileUtils.logger(err);
			}else{
				_fs.mkdirSync(_fileUtils.workspace_path+_fileUtils.private_path);
			}
		});
	}
}

function createSystemDir() {
    // body...
    if(!_fs.existsSync(_fileUtils.system_path)){
        _fs.mkdir(_fileUtils.system_path, function(err){
            if(err){
                _fileUtils.logger(err);
            }else{
                _fs.mkdirSync(_fileUtils.system_path+_fileUtils.config_path);
            }
        });
    }
}


function deleteProjectFolder(path, fn) {
	// body...
	_fs.unlink(path, function(err){
        if(err){
            _fileUtils.logger(err);
            _fileUtils.logger(err.code);
            if(err.code === 'EPERM')
            	fn(true);
            else
            	fn(false);
        }else{
        	_fileUtils.logger(path+' a été supprimé du dossier temporaire avec succès !');
        	fn(true);
        }
    });
}

function deleteSessionFile(fn) {
    // body...
    _fs.unlink(_fileUtils.system_path+_fileUtils.config_path+'/session.json', function(err){
        if(err){
            _fileUtils.logger(err);
            _fileUtils.logger(err.code);
            if(err.code === 'EPERM')
                fn(true);
            else
                fn(false);
        }else{
            _fileUtils.logger('session.json a été supprimé du dossier '+_fileUtils.config_path+' avec succès !');
            fn(true);
        }
    });
}

function getProjectFolder(number, id, fn) {
	// body...
	var fileTab = [];
	var index = 0;

	var controller = _fileUtils.workspace_path+_fileUtils.private_path+number+'/'+id;

    _fs.readdir(controller, function (err, files){
    	if(err){
    		_fileUtils.logger(err);
    		fn(false);
    	}else{
        	_fileUtils.logger(files);
        	_fileUtils.logger(typeof(files));
        	var filesTmpTab = objToString(files).split(',');
        	for (var i = 0; i < filesTmpTab.length; i++) {
        		if(filesTmpTab[i] !== ''){
        			index++;
					var fileObject = {};
        			_fileUtils.logger(filesTmpTab[i]);
        			_fileUtils.logger(_fs.lstatSync(controller+'/'+filesTmpTab[i]).isDirectory());
        			fileObject.filename = filesTmpTab[i];
        			fileObject.isDirectory = _fs.lstatSync(controller+'/'+filesTmpTab[i]).isDirectory();
        			if(fileObject.isDirectory){
        				loopFolder(controller+'/'+filesTmpTab[i], fileObject);
        			}
        			fileTab.push(fileObject);
        		}
        	}
        	setTimeout(function() {
        		//_fileUtils.logger(_fileUtils.stringifyJSON(fileTab));
        		//_fileUtils.logger(_fileUtils.stringifyJSON(projectFolder));
        		fn(true, fileTab);
        		/*if(index === fileTab.length){
        			clearInterval(timer);
        		}else if(index < fileTab.length)*/
        	}, 5000);
    	}
    });
}

function getSessionFile() {
	if(_fs.existsSync(_fileUtils.system_path+_fileUtils.config_path+'/session.json'))
		return _fs.readFileSync(_fileUtils.system_path+_fileUtils.config_path+'/session.json');
	else
		return null;
}

function loopFolder(directory, obj, fn) {
	// body...
	var fileTab = [];
	_fs.readdir(directory, function (err, files){
    	if(err){
    		_fileUtils.logger(err);
    		fn(false);
    	}else{
        	_fileUtils.logger(files);
        	_fileUtils.logger(typeof(files));
        	var filesTmpTab = objToString(files).split(',');
        	for (var i = 0; i < filesTmpTab.length; i++) {
        		if(filesTmpTab[i] !== ''){
        			//index++;
					var fileObject = {};
        			_fileUtils.logger(filesTmpTab[i]);
        			_fileUtils.logger(_fs.lstatSync(directory+'/'+filesTmpTab[i]).isDirectory());

        			fileObject.isDirectory = _fs.lstatSync(directory+'/'+filesTmpTab[i]).isDirectory();
        			if(fileObject.isDirectory){
        				loopFolder(directory+'/'+filesTmpTab[i], fileObject);
        			}else{
        				fileObject.filename = filesTmpTab[i];
        				fileTab.push(fileObject);
        			}
        		}
        	}
        	setTimeout(function() {
        		_fileUtils.logger('loopFolder');
        		_fileUtils.logger(directory);
        		/*_fileUtils.logger(_fileUtils.stringifyJSON(fileTab));
        		obj.files = fileTab;
        		_fileUtils.logger(_fileUtils.stringifyJSON(obj));*/
        		projectObject.filename = 'him';
        		projectObject.isDirectory = true;
        		projectObject.files = [{filename:'second.md', isDirectory:false }];
        		projectFolder.push(projectObject);
        		_fileUtils.logger(_fileUtils.stringifyJSON(projectFolder));
        		//fn(fileTab);
        		//fn(true, fileTab);
        		/*if(index === fileTab.length){
        			clearInterval(timer);
        		}else if(index < fileTab.length)*/
        	}, 5000);
    	}
    });
}

function objToString(obj) {
	// body...
	var str = '';
	var tmp = [];
	for(var p in obj){
		if(obj.hasOwnProperty(p)){
			str += obj[p] + ',';
			tmp.push(obj[p]+'');
		}
	}
	console.log(str);
	console.log(_fileUtils.stringifyJSON(projectFolder));
	return str;
}

module.exports = FileManager;