/*Database handler file Created By Henock Bongi [HBI] on October, 20th, 2017 at 23:09 [11:09 PM]*/
/*Version 1.0*/

function requestLauncher(url, type, json, fn) {
	// body...
	try{
		$.ajax({
			url:url,
			type:type.toUpperCase(),
			data:json,
			beforeSend:function(){
				if(debugState())
					log(JSON.stringify(json))
			},
			success:function(data){
				if(debugState())
					log(data);
				fn(true, data.tag, data);
			},
			error:function(xhr){
				fn(false, xhr);
			}
		});
	}catch(ex){
		if(debugState())
			errorLog(ex.message);
	}
}
function requestLauncherIndexed(url, type, json, fn) {
	// body...
	try{
		$.ajax({
			url:url,
			type:type.toUpperCase(),
			data:json,
			beforeSend:function(){
				if(debugState())
					log(JSON.stringify(json))
			},
			success:function(data){
				if(debugState())
					log(data);
				fn(true, data.tag, data,json);
			},
			error:function(xhr){
				fn(false, xhr);
			}
		});
	}catch(ex){
		if(debugState())
			errorLog(ex.message);
	}
}
function debugState(){
	return window.location.host === 'localhost';
}
function log(item) {
	// body...
	if(debugState()){
		console.log(item);
	}
}
function errorLog(item) {
	// body...
	if(debugState()){
		console.error(item);
	}
}