/*FileReader Class*/
/*This is the FileReader class of the app*/
/*FileReader version : 1.0.0*/
/*This class check if file exists and load it to return to Message class*/

function exists (fs, fileUtils, sender, receiver, fileName, isGroup, thumb, fn) {
	// body...
	//fs.lstatSync(fileUtils.cheminPathThumb+sender+'-to-'+receiver+'/').isDirectory();
	if(isGroup == 1){
		if(thumb == 'thumb'){
			fs.exists(fileUtils.cheminPathGroupThumb+sender.replace("@","-to-")+'/'+fileName, function (exists) {
				fn(exists);
			});
		}else if(thumb == 'preview'){
			fs.exists(fileUtils.cheminPathGroupPreview+sender.replace("@","-to-")+'/'+fileName, function (exists) {
				fn(exists);
			});
		}
	}else{
		if(thumb == 'thumb'){
			fileUtils.logger(fileUtils.cheminPathThumb+sender+'-to-'+receiver+'/'+fileName);
			fs.exists(fileUtils.cheminPathThumb+sender+'-to-'+receiver+'/'+fileName, function (exists) {
				fn(exists);
			});
		}else if(thumb == 'preview'){
			fs.exists(fileUtils.cheminPathPreview+sender+'-to-'+receiver+'/'+fileName, function (exists) {
				fn(exists);
			});
		}
	}
}
function getFile (fs, fileUtils, sender, receiver, fileName, isGroup, thumb, fn) {
	// body...
	//var bitmap = fs.readFileSync(cheminPathGroupThumb+results[i].sender.replace("@","-to-")+'/'+results[i].content);
	if(isGroup == 1){
		if(thumb == 'thumb'){
			fn(encodeBase64(fs.readFileSync(fileUtils.cheminPathGroupThumb+sender.replace("@", "-to-")+'/'+fileName)));
		}else if(thumb == 'preview'){
			fn(encodeBase64(fs.readFileSync(fileUtils.cheminPathGroupPreview+sender.replace("@", "-to-")+'/'+fileName)));
		}
	}else{
		if(thumb == 'thumb'){
			//fileUtils.logger(fileUtils.cheminPathThumb+sender+'-to-'+receiver+'/'+fileName);
			fn(encodeBase64(fs.readFileSync(fileUtils.cheminPathThumb+sender+'-to-'+receiver+'/'+fileName)));
		}else if(thumb == 'preview'){
			fn(encodeBase64(fs.readFileSync(fileUtils.cheminPathPreview+sender+'-to-'+receiver+'/'+fileName)));
		}
	}
}
function encodeBase64 (bitmap) {
	// body...
	return new Buffer(bitmap).toString('base64');
}
exports.exists = exists;
exports.getFile = getFile;