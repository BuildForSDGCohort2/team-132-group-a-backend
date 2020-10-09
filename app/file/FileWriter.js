/*FileWriter Class*/
/*This is the FileWriter class of the app*/
/*FileWriter version : 1.0.0*/
/*This class saves file sent from user*/

function writeFile (fs, fileUtils, username, photo, fn) {
	// body...
	fs.writeFile(username+'png', photo, function (err){
		if(err){
			fileUtils.logger(err);
			fn(false);
		}else{
			fn(true)
		}
	});
}
function copy (fs, fileUtils, from, to, fn) {
	// body...
	fs.copy(from, to, function(err) {
		if(err){
			fileUtils.logger(err);
			fn(false);
		}else{
			fn(true)
			fileUtils.logger('saved');
			remove(fs, fileUtils, from);
		}
	});
}
function rename (argument) {
	// body...
	fs.rename(username+'-to-'+usr+'_'+fileTitle, cheminPathGroupThumb+username+'-to-'+usr+'/'+fileTitle, function (err) {
		if(!err){
			console.log('Fichier renommé ! '+username+'-to-'+usr+'_'+fileTitle, cheminPathGroupThumb+username+'-to-'+usr+'/'+fileTitle);
		}else{
			console.log(err);
		}
	});
}
function remove (fs, fileUtils, path) {
	// body...
	fs.unlink(path, function(err){
        if(err){
            fileUtils.logger(err)
        }else{
        	fileUtils.logger(path+' a été supprimé du dossier temporaire avec succès !');
        }
    });
}

exports.writeFile = writeFile;
exports.copy = copy;