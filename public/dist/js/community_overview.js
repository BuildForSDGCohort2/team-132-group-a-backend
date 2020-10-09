/*Index js file*/

/*
 *  @Vérifie: Fichier principal sur la gestion de la page[Community_Overview];
 *  @Auteur : Henock Bongi[HBI];
 *  @date   : 28, Octobre, 2017;
 */

// JavaScript Document
$(document).ready(function(){
	var language = {};
	var link = {};
	var typepub = 'text';
	var formData = new FormData();
	(function(){
		var bsa = document.createElement('script');
		bsa.type = 'text/javascript';
		bsa.async = true;
		bsa.src = '../../../dist/js/RequestHandler.js?'+Math.floor(Math.random() * (999999999 - 100000000 + 100000000) + 100000000);
		bsa.onload = function(){
			//alert('loaded!');
			/*var aDay = 24 * 24 * 60 * 1000;
			console.log(time_ago(new Date(Date.now() - aDay)))
			console.log(time_ago(new Date(Date.now() - aDay * 2)))*/
			requestLauncher('/community/article/load.tsl?key='+$('#hidden_id').val()+'', 'get', null, function(state, tag, data){
				if(state){
					if(tag.toLowerCase() === 'success'){
		     			//alert(JSON.stringify(data.articles));
		     			if(data.articles.length > 0){
		     				for (var i = 0; i < data.articles.length; i++) {
		     					//console.log(i+' --> '+data.articles.length);
		     					if($('html').attr('session') === 'true'){
		     						if(data.articles[i]._isLiked){
		     							if(data.articles[i]._type === 'text'){
			     							$template = '<span class="only_bottom" id="time_date_'+data.articles[i]._id+'">'+time_ago(data.articles[i]._date)+'\
								            </span>\
								            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.articles[i]._title+'</h4>\
								            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text+'\
								              '+data.articles[i]._written+'</h6>\
								            <hr style="margin-bottom: 5px;">\
								            <ul id="menu">\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">remove_red_eye</i>\
								                <span style="position: relative;top:-5px;">0</span>\
								              </li>\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-2px;" aria-hidden="true">thumb_up</i>\
								                <span style="position: relative;top:-5px;" id="like_value_'+data.articles[i]._id+'">'+data.articles[i]._likes+'</span>\
								              </li>\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">forum</i>\
								                <span style="position: relative;top:-5px;" id="comment_value_'+data.articles[i]._id+'">'+data.articles[i]._commentsNo+'</span>\
								              </li>\
								            </ul>\
								            <hr style="margin-top: -14px;">\
								            <span id="article_'+data.articles[i]._id+'" index="'+i+'">'+data.articles[i]._content+'</span><br>\
								            <button type="button" class="btn btn-sm btn-raised" id="dislike_'+data.articles[i]._id+'" data-id="dislike_'+data.articles[i]._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">thumb_down</i> <span>'+language.dislike_button+'</span></button>\
								            <button type="button" class="btn btn-sm btn-raised" id="recommend_'+data.articles[i]._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">share</i> '+language.recommend_button+'</button>\
								            <span id="comment_block_'+data.articles[i]._id+'" index="'+i+'"></span>';
								            $('#latest_articles_id').append('<hr>');
								            $('#latest_articles_id').append($template);

								            if(data.articles[i]._comments){
									            if(data.articles[i]._comments.length > 0){
									            	var commentTab = data.articles[i]._comments;
									            	//alert(data.articles[i]._comments[0].content);
									            	$('<div style="background-color: #ccc; padding: 1px;">\
										              <div style="background-color: #fff; padding: 5px;" id="comment_line_'+data.articles[i]._id+'" index="">\
										              </div>\
										            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
										            for(var j = 0; j < commentTab.length; j++){
										            	//var objM = $('#comment_line_'+data.articles[i]._id+'');
										            	$json = {
										            		id:commentTab[j].sender_id,
										            		comment:commentTab[j].content,
										            		date:commentTab[j].date_added,
										            		currentBlock:data.articles[i]._id
										            	};
										            	requestLauncherIndexed('/article/getUserComment.tsl', 'post', $json, function(states, tags, datas, asyncData){
										            		if(states){
										            			if(tags === 'success'){
										            				//alert(JSON.stringify(datas));
										            				$('#comment_line_'+asyncData.currentBlock+'').append('<p style="float: right;">'+time_ago(asyncData.date)+'</p>\
													                <p>'+datas._user.last_name+' '+datas._user.first_name+'</p>\
													                <p>'+asyncData.comment+'</p>\
													                <hr>');
										            			}
										            		}
										            	});
										            }
										            $('#comment_line_'+data.articles[i]._id+'').parent().append('<div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
										                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
										                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.9%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
										              </div>');
									            }else{
										        	//alert(JSON.stringify(data.articles));
										        	$('<br><br><div style="background-color: #ccc; padding: 1px;">\
											              <div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
											                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
											                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.9%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
											              </div>\
											            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
										        }
									        }

								        }else if(data.articles[i]._type === 'image'){
								        	$template = '<img src="/article/icon/'+data.articles[i]._id+'" alt="icon" class="img-thumbnail" width="800" height="480" style="height:480px!important;margin-top:2px;border-style: solid; border-width: 1px; border-color: white;">\
								        	<span class="only_bottom" id="time_date_'+data.articles[i]._id+'">'+time_ago(data.articles[i]._date)+'\
								            </span>\
								            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.articles[i]._title+'</h4>\
								            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text+'\
								              '+data.articles[i]._written+'</h6>\
								            <hr style="margin-bottom: 5px;">\
								            <ul id="menu">\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">remove_red_eye</i>\
								                <span style="position: relative;top:-5px;">0</span>\
								              </li>\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-2px;" aria-hidden="true">thumb_up</i>\
								                <span style="position: relative;top:-5px;" id="like_value_'+data.articles[i]._id+'">'+data.articles[i]._likes+'</span>\
								              </li>\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">forum</i>\
								                <span style="position: relative;top:-5px;" id="comment_value_'+data.articles[i]._id+'">'+data.articles[i]._commentsNo+'</span>\
								              </li>\
								            </ul>\
								            <hr style="margin-top: -14px;">\
								            <span id="article_'+data.articles[i]._id+'" index="'+i+'">'+data.articles[i]._content+'</span><br>\
								            <button type="button" class="btn btn-sm btn-raised" id="dislike_'+data.articles[i]._id+'" data-id="dislike_'+data.articles[i]._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">thumb_down</i> <span>'+language.dislike_button+'</span></button>\
								            <button type="button" class="btn btn-sm btn-raised" id="recommend_'+data.articles[i]._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">share</i> '+language.recommend_button+'</button>\
								            <span id="comment_block_'+data.articles[i]._id+'" index="'+i+'"></span>';
								            $('#latest_articles_id').append('<hr>');
								            $('#latest_articles_id').append($template);

								            if(data.articles[i]._comments){
									            if(data.articles[i]._comments.length > 0){
									            	var commentTab = data.articles[i]._comments;
									            	//alert(data.articles[i]._comments[0].content);
									            	$('<div style="background-color: #ccc; padding: 1px;">\
										              <div style="background-color: #fff; padding: 5px;" id="comment_line_'+data.articles[i]._id+'" index="">\
										              </div>\
										            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
										            for(var j = 0; j < commentTab.length; j++){
										            	//var objM = $('#comment_line_'+data.articles[i]._id+'');
										            	$json = {
										            		id:commentTab[j].sender_id,
										            		comment:commentTab[j].content,
										            		date:commentTab[j].date_added,
										            		currentBlock:data.articles[i]._id
										            	};
										            	requestLauncherIndexed('/article/getUserComment.tsl', 'post', $json, function(states, tags, datas, asyncData){
										            		if(states){
										            			if(tags === 'success'){
										            				//alert(JSON.stringify(datas));
										            				$('#comment_line_'+asyncData.currentBlock+'').append('<p style="float: right;">'+time_ago(asyncData.date)+'</p>\
													                <p>'+datas._user.last_name+' '+datas._user.first_name+'</p>\
													                <p>'+asyncData.comment+'</p>\
													                <hr>');
										            			}
										            		}
										            	});
										            }
										            $('#comment_line_'+data.articles[i]._id+'').parent().append('<div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
										                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
										                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.9%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
										              </div>');
									            }else{
										        	//alert(JSON.stringify(data.articles));
										        	$('<br><br><div style="background-color: #ccc; padding: 1px;">\
											              <div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
											                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
											                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.9%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
											              </div>\
											            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
										        }
									        }
								        }
		     						}else{
		     							if(data.articles[i]._type === 'text'){
			     							$template = '<span class="only_bottom" id="time_date_'+data.articles[i]._id+'">'+time_ago(data.articles[i]._date)+'\
								            </span>\
								            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.articles[i]._title+'</h4>\
								            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text+'\
								              '+data.articles[i]._written+'</h6>\
								            <hr style="margin-bottom: 5px;">\
								            <ul id="menu">\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">remove_red_eye</i>\
								                <span style="position: relative;top:-5px;">0</span>\
								              </li>\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-2px;" aria-hidden="true">thumb_up</i>\
								                <span style="position: relative;top:-5px;" id="like_value_'+data.articles[i]._id+'">'+data.articles[i]._likes+'</span>\
								              </li>\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">forum</i>\
								                <span style="position: relative;top:-5px;" id="comment_value_'+data.articles[i]._id+'">'+data.articles[i]._commentsNo+'</span>\
								              </li>\
								            </ul>\
								            <hr style="margin-top: -14px;">\
								            <span id="article_'+data.articles[i]._id+'" index="'+i+'">'+data.articles[i]._content+'</span><br>\
								            <button type="button" class="btn btn-sm btn-raised" id="like_'+data.articles[i]._id+'" data-id="like_'+data.articles[i]._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">thumb_up</i> <span>'+language.like_button+'</span></button>\
								            <button type="button" class="btn btn-sm btn-raised" id="recommend_'+data.articles[i]._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">share</i> '+language.recommend_button+'</button>\
								            <span id="comment_block_'+data.articles[i]._id+'" index="'+i+'"></span>';
								            $('#latest_articles_id').append('<hr>');
								            $('#latest_articles_id').append($template);

								            if(data.articles[i]._comments){
									            if(data.articles[i]._comments.length > 0){
									            	var commentTab = data.articles[i]._comments;
									            	//alert(data.articles[i]._comments[0].content);
									            	$('<div style="background-color: #ccc; padding: 1px;">\
										              <div style="background-color: #fff; padding: 5px;" id="comment_line_'+data.articles[i]._id+'" index="">\
										              </div>\
										            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
										            for(var j = 0; j < commentTab.length; j++){
										            	//var objM = $('#comment_line_'+data.articles[i]._id+'');
										            	$json = {
										            		id:commentTab[j].sender_id,
										            		comment:commentTab[j].content,
										            		date:commentTab[j].date_added,
										            		currentBlock:data.articles[i]._id
										            	};
										            	requestLauncherIndexed('/article/getUserComment.tsl', 'post', $json, function(states, tags, datas, asyncData){
										            		if(states){
										            			if(tags === 'success'){
										            				//alert(JSON.stringify(datas));
										            				$('#comment_line_'+asyncData.currentBlock+'').append('<p style="float: right;">'+time_ago(asyncData.date)+'</p>\
													                <p>'+datas._user.last_name+' '+datas._user.first_name+'</p>\
													                <p>'+asyncData.comment+'</p>\
													                <hr>');
										            			}
										            		}
										            	});
										            }
										            $('#comment_line_'+data.articles[i]._id+'').parent().append('<div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
										                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_button" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
										                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.9%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
										              </div>');
									            }else{
										        	//alert(JSON.stringify(data.articles));
										        	$('<br><br><div style="background-color: #ccc; padding: 1px;">\
											              <div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
											                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
											                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.9%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
											              </div>\
											            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
										        }
									        }
								        }else if(data.articles[i]._type === 'image'){
								        	$template = '<img src="/article/icon/'+data.articles[i]._id+'" alt="icon" class="img-thumbnail" width="800" height="480" style="height:480px!important;margin-top:2px;border-style: solid; border-width: 1px; border-color: white;">\
								        	<span class="only_bottom" id="time_date_'+data.articles[i]._id+'">'+time_ago(data.articles[i]._date)+'\
								            </span>\
								            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.articles[i]._title+'</h4>\
								            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text+'\
								              '+data.articles[i]._written+'</h6>\
								            <hr style="margin-bottom: 5px;">\
								            <ul id="menu">\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">remove_red_eye</i>\
								                <span style="position: relative;top:-5px;">0</span>\
								              </li>\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-2px;" aria-hidden="true">thumb_up</i>\
								                <span style="position: relative;top:-5px;" id="like_value_'+data.articles[i]._id+'">'+data.articles[i]._likes+'</span>\
								              </li>\
								              <li>\
								                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">forum</i>\
								                <span style="position: relative;top:-5px;" id="comment_value_'+data.articles[i]._id+'">'+data.articles[i]._commentsNo+'</span>\
								              </li>\
								            </ul>\
								            <hr style="margin-top: -14px;">\
								            <span id="article_'+data.articles[i]._id+'" index="'+i+'">'+data.articles[i]._content+'</span><br>\
								            <button type="button" class="btn btn-sm btn-raised" id="like_'+data.articles[i]._id+'" data-id="like_'+data.articles[i]._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">thumb_up</i> <span>'+language.like_button+'</span></button>\
								            <button type="button" class="btn btn-sm btn-raised" id="recommend_'+data.articles[i]._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">share</i> '+language.recommend_button+'</button>\
								            <span id="comment_block_'+data.articles[i]._id+'" index="'+i+'"></span>';
								            $('#latest_articles_id').append('<hr>');
								            $('#latest_articles_id').append($template);

								            if(data.articles[i]._comments){
									            if(data.articles[i]._comments.length > 0){
									            	var commentTab = data.articles[i]._comments;
									            	//alert(data.articles[i]._comments[0].content);
									            	$('<div style="background-color: #ccc; padding: 1px;">\
										              <div style="background-color: #fff; padding: 5px;" id="comment_line_'+data.articles[i]._id+'" index="">\
										              </div>\
										            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
										            for(var j = 0; j < commentTab.length; j++){
										            	//var objM = $('#comment_line_'+data.articles[i]._id+'');
										            	$json = {
										            		id:commentTab[j].sender_id,
										            		comment:commentTab[j].content,
										            		date:commentTab[j].date_added,
										            		currentBlock:data.articles[i]._id
										            	};
										            	requestLauncherIndexed('/article/getUserComment.tsl', 'post', $json, function(states, tags, datas, asyncData){
										            		if(states){
										            			if(tags === 'success'){
										            				//alert(JSON.stringify(datas));
										            				$('#comment_line_'+asyncData.currentBlock+'').append('<p style="float: right;">'+time_ago(asyncData.date)+'</p>\
													                <p>'+datas._user.last_name+' '+datas._user.first_name+'</p>\
													                <p>'+asyncData.comment+'</p>\
													                <hr>');
										            			}
										            		}
										            	});
										            }
										            //$comIdP = $(this).attr('id').replace('comment_', '');
													//alert($comIdP);
													$('#comment_line_'+data.articles[i]._id+'').parent().append('<div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
										                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_button" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
										                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.9%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
										              </div>');
									            }else{
										        	//alert(JSON.stringify(data.articles));
										        	$('<br><br><div style="background-color: #ccc; padding: 1px;">\
											              <div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
											                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
											                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.9%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
											              </div>\
											            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
										        }
									        }
								        }
		     						}
						        }else{
						        	if(data.articles[i]._type === 'text'){
							        	$template = '<span class="only_bottom" id="time_date_'+data.articles[i]._id+'">'+time_ago(data.articles[i]._date)+'\
							            </span>\
							            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.articles[i]._title+'</h4>\
							            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text+'\
							              '+data.articles[i]._written+'</h6>\
							            <hr style="margin-bottom: 5px;">\
							            <ul id="menu">\
							              <li>\
							                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">remove_red_eye</i>\
							                <span style="position: relative;top:-5px;">0</span>\
							              </li>\
							              <li>\
							                <i class="material-icons" style="color:#000;margin-top:-2px;" aria-hidden="true">thumb_up</i>\
							                <span style="position: relative;top:-5px;">'+data.articles[i]._likes+'</span>\
							              </li>\
							              <li>\
							                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">forum</i>\
							                <span style="position: relative;top:-5px;">'+data.articles[i]._commentsNo+'</span>\
							              </li>\
							            </ul>\
							            <hr style="margin-top: -14px;">\
							            <span id="article_'+data.articles[i]._id+'" index="'+i+'">'+data.articles[i]._content+'</span>\
							            <span id="comment_block_'+data.articles[i]._id+'" index="'+i+'"></span>';
							            $('#latest_articles_id').append('<hr>');
							            $('#latest_articles_id').append($template);


							            if(data.articles[i]._comments){
								            if(data.articles[i]._comments.length > 0){
								            	var commentTab = data.articles[i]._comments;
								            	//alert(data.articles[i]._comments[0].content);
								            	$('<div style="background-color: #ccc; padding: 1px;">\
									              <div style="background-color: #fff; padding: 5px;" id="comment_line_'+data.articles[i]._id+'" index="">\
									              </div>\
									            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
									            for(var j = 0; j < commentTab.length; j++){
									            	//var objM = $('#comment_line_'+data.articles[i]._id+'');
									            	$json = {
									            		id:commentTab[j].sender_id,
									            		comment:commentTab[j].content,
									            		date:commentTab[j].date_added,
									            		currentBlock:data.articles[i]._id
									            	};
									            	requestLauncherIndexed('/article/getUserComment.tsl', 'post', $json, function(states, tags, datas, asyncData){
									            		if(states){
									            			if(tags === 'success'){
									            				//alert(JSON.stringify(datas));
									            				$('#comment_line_'+asyncData.currentBlock+'').append('<p style="float: right;">'+time_ago(asyncData.date)+'</p>\
												                <p>'+datas._user.last_name+' '+datas._user.first_name+'</p>\
												                <p>'+asyncData.comment+'</p>\
												                <hr>');
									            			}
									            		}
									            	});
									            }
								            }
								        }


							        }else if(data.articles[i]._type === 'image'){
							        	$template = '<img src="/article/icon/'+data.articles[i]._id+'" alt="icon" class="img-thumbnail" width="800" height="480" style="height:480px!important;margin-top:2px;border-style: solid; border-width: 1px; border-color: white;">\
							        	<span class="only_bottom" id="time_date_'+data.articles[i]._id+'">'+time_ago(data.articles[i]._date)+'\
							            </span>\
							            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.articles[i]._title+'</h4>\
							            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text+'\
							              '+data.articles[i]._written+'</h6>\
							            <hr style="margin-bottom: 5px;">\
							            <ul id="menu">\
							              <li>\
							                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">remove_red_eye</i>\
							                <span style="position: relative;top:-5px;">0</span>\
							              </li>\
							              <li>\
							                <i class="material-icons" style="color:#000;margin-top:-2px;" aria-hidden="true">thumb_up</i>\
							                <span style="position: relative;top:-5px;">'+data.articles[i]._likes+'</span>\
							              </li>\
							              <li>\
							                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">forum</i>\
							                <span style="position: relative;top:-5px;">'+data.articles[i]._commentsNo+'</span>\
							              </li>\
							            </ul>\
							            <hr style="margin-top: -14px;">\
							            <span id="article_'+data.articles[i]._id+'" index="'+i+'">'+data.articles[i]._content+'</span>\
							            <span id="comment_block_'+data.articles[i]._id+'" index="'+i+'"></span>';
							            $('#latest_articles_id').append('<hr>');
							            $('#latest_articles_id').append($template);

							            if(data.articles[i]._comments){
								            if(data.articles[i]._comments.length > 0){
								            	var commentTab = data.articles[i]._comments;
								            	//alert(data.articles[i]._comments[0].content);
								            	$('<div style="background-color: #ccc; padding: 1px;">\
									              <div style="background-color: #fff; padding: 5px;" id="comment_line_'+data.articles[i]._id+'" index="">\
									              </div>\
									            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
									            for(var j = 0; j < commentTab.length; j++){
									            	//var objM = $('#comment_line_'+data.articles[i]._id+'');
									            	$json = {
									            		id:commentTab[j].sender_id,
									            		comment:commentTab[j].content,
									            		date:commentTab[j].date_added,
									            		currentBlock:data.articles[i]._id
									            	};
									            	requestLauncherIndexed('/article/getUserComment.tsl', 'post', $json, function(states, tags, datas, asyncData){
									            		if(states){
									            			if(tags === 'success'){
									            				//alert(JSON.stringify(datas));
									            				$('#comment_line_'+asyncData.currentBlock+'').append('<p style="float: right;">'+time_ago(asyncData.date)+'</p>\
												                <p>'+datas._user.last_name+' '+datas._user.first_name+'</p>\
												                <p>'+asyncData.comment+'</p>\
												                <hr>');
									            			}
									            		}
									            	});
									            }
								            }
								        }
							        }
						        }
					            var obj = $('#article_'+data.articles[i]._id);
					            //console.log(data.articles[i]._id)
					            $moreText = language.read_more_text;
								$suspend = '...';
								var taille = 100;
								$fullText = $('#article_'+data.articles[i]._id).html();
								if($('#article_'+data.articles[i]._id).html().length > taille){
									$subs = $('#article_'+data.articles[i]._id).html().substring(0, taille);
									$('#article_'+data.articles[i]._id).html($subs.trim()+$suspend+' <a href="#" id="add_more_'+data.articles[i]._id+'">'+$moreText+'</a>')
									//alert(obj.html().length - taille)
									$('#add_more_'+data.articles[i]._id).on('click', function(event){
										event.preventDefault();
										$idF = $(this).attr('id');
										var idx = $(this).parent().attr('index');
										//alert($('#article_'+$idF.replace('add_more_', '')).html());
										$('#article_'+$idF.replace('add_more_', '')).html(data.articles[parseInt(idx)]._content);
									});
								}
								$('#like_'+data.articles[i]._id+', #dislike_'+data.articles[i]._id+'').click(function(){
									$obj = $(this);
									$textButt = $obj.children('span').html().toLowerCase();
									$likeNdisl = $textButt === language.like_button.toLowerCase() ? 'like_' : 'dislike_'
									$artID = $(this).attr('data-id').replace($likeNdisl, '');
									$artFinId = $('#article_'+$artID).attr('id').replace('article_', '');

									/*alert($artID);
									alert($('#article_'+$artID).attr('id').replace('article_', ''));*/

									//alert($obj.children('span').html());
									$(this).prop('disabled', true);

									$json = {
										tag: $textButt === language.like_button.toLowerCase() ? 'add' : 'remove',
										id: $artFinId
									};

									//alert(JSON.stringify($json));


									requestLauncher('/article/like.tsl', 'post', $json, function(state, tag, data){
										if(state){
											if(tag.toLowerCase() === 'success'){
									     		//alert(data);
									     		//$obj.remove();
									     		//alert($textButt);
									     		if($textButt === language.like_button.toLowerCase()){
										     		$oldValue = $('#like_value_'+$artFinId).html();
										     		$value = parseInt($oldValue) + 1;
										     		$('#like_value_'+$artFinId).html($value);
										     		$obj.attr('data-id', 'dislike_'+$json.id);
									     			$obj.html('<i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">thumb_down</i> <span>'+language.dislike_button+'</span>');
									     		}
									     		else{
										     		$oldValue = $('#like_value_'+$artFinId).html();
										     		$value = parseInt($oldValue) - 1;
										     		$('#like_value_'+$artFinId).html($value);
										     		$obj.attr('data-id', 'like_'+$json.id);
									     			$obj.html('<i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">thumb_up</i> <span>'+language.like_button+'</span>');
									     		}
									     		$obj.prop('disabled', false);
											}else if(tag === 'warning'){
												alert(language.error_text);
											}else if(tag === 'session_expired'){
												alert(language.error_text);
											}
										}
									});
								});
								$('#comment_'+data.articles[i]._id+'').click(function(){
									//alert($(this).attr('id'));
									$comIdP = $(this).attr('id');
									$currentButton = $(this);
									alert($comIdP.replace('comment_', ''));
									//alert($('#input_'+$comIdP.replace('comment_', '')+'').val());
									$input = $('#input_'+$comIdP.replace('comment_', '')+'');
									$json = {
										id:$comIdP.replace('comment_', ''),
										content:$('#input_'+$comIdP.replace('comment_', '')+'').val()
									};
									$currentButton.prop('disabled', true);
									requestLauncher('/article/comment.tsl', 'post', $json, function(state, tag, data){
										if(state){
											if(tag.toLowerCase() === 'success'){
									     		//alert(JSON.stringify(data));
									     		$comment = data.comment;
									     		$('#comment_line_'+$comIdP.replace('comment_', '')+'').append('<p style="float: right;">'+time_ago($comment.date_added)+'</p>\
								                <p>'+$comment.sender+'</p>\
								                <p>'+$comment.content+'</p>\
								                <hr>');
								                $input.val('');
											}else if(tag === 'warning'){
												alert(language.error_text);
											}else if(tag === 'session_expired'){
												alert(language.error_text);
											}
										}
									});
								});
								$('#input_'+data.articles[i]._id+'').keyup(function(e){
									$comIdP = $(this).attr('id').replace('input_', 'comment_');
									if($(this).val().length > 0){
										$('#'+$comIdP).attr('disabled', false);
										//alert($(this).val());
									}else
										$('#'+$comIdP).attr('disabled', true);
								});
								$('#recommend_'+data.articles[i]._id+'').click(function(){
									alert($(this).attr('id'));
								});
								var timeServer = data.articles[i]._date;
					            var idM = data.articles[i]._id;
					            setInterval(function(){
					            	console.log('id -> '+idM);
					            	console.log(time_ago(timeServer));
					            	$('#time_date_'+idM).html(time_ago(timeServer));
					            }, 60000);
		     				}
		     			}
					}else if(tag === 'warning'){
						alert(language.error_text);
					}else if(tag === 'session_expired'){
						alert(language.error_text);
					}
				}
			});
		}
		document.body.appendChild(bsa);
	})();

	$('#follow_task').click(function(){
		//alert($(this).attr('comId'));
		$textButt = $(this).children('span').html();
		$json = {
			tag:$textButt === language.follow_text ? 'follow' : 'unfollow',
			communityId:$(this).attr('comId')
		};
		$(this).prop('disabled', true);
		requestLauncher('/community/follow.do', 'post', $json, function(state, tag, data){
			if(state){
				if(tag.toLowerCase() === 'success'){
		     		//alert($textButt);
		     		/*$('#follow_task').remove();
		     		$tmp = '<button type="button" class="btn btn-raised btn-primary" id="unfollow_task" comId="'+$json.communityId+'" style="color:white;float:right;">\
		                '+language.unfollow_text+'</button>';
		     		$('#current').prepend($tmp);*/
		     		if($textButt === language.follow_text)
		     			$('#follow_task').html('<span>'+language.unfollow_text+'</span>');
		     		else
		     			$('#follow_task').html('<span>'+language.follow_text+'</span>');
		     		$('#follow_task').prop('disabled', false);
		     		/*$('#follow_task').attr('id', 'unfollow_task');
		     		$('#unfollow_task').prop('disabled', false);*/
				}else if(tag === 'warning'){
					alert(language.error_text);
				}else if(tag === 'session_expired'){
					alert(language.error_text);
				}
			}
		});
	});
	$('#unfollow_task').click(function(){
		//alert($(this).attr('comId'));
		$textButt = $(this).children('span').html();
		$json = {
			tag:$textButt === language.follow_text ? 'follow' : 'unfollow',
			communityId:$(this).attr('comId')
		};
		$(this).prop('disabled', true);
		requestLauncher('/community/follow.do', 'post', $json, function(state, tag, data){
			if(state){
				if(tag.toLowerCase() === 'success'){
		     		//alert('-> '+$textButt);
		     		/*$('#unfollow_task').remove();
		     		$tmp = '<button type="button" class="btn btn-raised btn-primary" id="follow_task" comId="'+$json.communityId+'" style="color:white;float:right;">\
		                '+language.follow_text+'</button>';
		     		$('#current').prepend($tmp);*/

		     		if($textButt === language.follow_text)
		     			$('#unfollow_task').html('<span>'+language.unfollow_text+'</span>');
		     		else
		     			$('#unfollow_task').html('<span>'+language.follow_text+'</span>');
		     		$('#unfollow_task').prop('disabled', false);
		     		//$('#unfollow_task').html(language.follow_text);
		     		/*$('#unfollow_task').attr('id', 'follow_task');
		     		$('#follow_task').prop('disabled', false);*/
				}else if(tag === 'warning'){
					alert(language.error_text);
				}else if(tag === 'session_expired'){
					alert(language.error_text);
				}
			}
		});
	});
	$('#publish').click(function(){
		//alert('test');
		$json = {
			title:$('#title_article').val(),
			communityId:$(this).attr('comId'),
			content:$('#article_text').val(),
			type:typepub
		};

		//alert(JSON.stringify($json));
		if($json.type === 'text'){
			requestLauncher('/community/publish_article.tsl', 'post', $json, function(state, tag, data){
				if(state){
					if(tag.toLowerCase() === 'success'){
			     		//alert(JSON.stringify(data.article));
			     		/*console.log(time_ago(data.article._date));
			     		console.log(formatDate(new Date(data.article._date)));*/
			     		//setInterval(time_ago, 1000);
			     		//console.log(time_ago(data.article._date));
			     		$('#title_article, #article_text').val('');
			     		$template = '<span class="only_bottom" id="time_date_'+data.article._id+'">'+time_ago(data.article._date)+'</span>\
			            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.article._title+'</h4>\
			            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text+'\
							'+data.article._written+'</h6>\
			            <hr style="margin-bottom: 5px;">\
			            <ul id="menu">\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">remove_red_eye</i>\
			                <span style="position: relative;top:-5px;">0</span>\
			              </li>\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-2px;" aria-hidden="true">thumb_up</i>\
			                <span style="position: relative;top:-5px;">0</span>\
			              </li>\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">forum</i>\
			                <span style="position: relative;top:-5px;">0</span>\
			              </li>\
			            </ul>\
			            <hr style="margin-top: -14px;"><span id="article_'+data.article._id+'">'+data.article._content+'</span><br>\
			            <button type="button" class="btn btn-sm btn-raised" id="publish" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">thumb_up</i> '+language.like_button+'</button>\
			            <button type="button" class="btn btn-sm btn-raised" id="publish" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">comment</i> '+language.comment_button+'</button>\
			            <button type="button" class="btn btn-sm btn-raised" id="publish" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">share</i> '+language.recommend_button+'</button>';
			            $('#latest_articles_id').prepend('<hr>');
			            $('#latest_articles_id').prepend($template);
			            var timeServer = data.article._date;
			            var idM = data.article._id;
			            setInterval(function(){
			            	console.log(time_ago(timeServer));
			            	$('#time_date_'+idM).html(time_ago(timeServer));
			            }, 60000);
			            var obj = $('#article_'+data.article._id);
			            $moreText = language.read_more_text;
						$suspend = '...';
						var taille = 100;
						$fullText = obj.html();
						if(obj.html().length > taille){
							$subs = obj.html().substring(0, taille);
							obj.html($subs.trim()+$suspend+' <a href="#" id="add_more">'+$moreText+'</a>')
							//alert(obj.html().length - taille)
							$(obj).find('a').on('click', function(event){
								event.preventDefault();
								//alert($fullText)
								obj.html($fullText)
							});
						}else{
							obj.html($fullText);
						}
					}else if(tag === 'warning'){
						alert(language.error_text);
					}else if(tag === 'session_expired'){
						alert(language.error_text);
					}
				}
			});
		}else if($json.type === 'image'){
			//formData = new FormData();
			formData.append("title", $('#title_article').val());
			formData.append("communityId", $(this).attr('comId'));
			formData.append("content", $('#article_text').val());
			formData.append("type", typepub);
			//console.log(formData);

			changeProjectPhotoRequest(formData);


		}
	});
	$('#delete_temp_image').click(function(){
		//$('#project_edit_valid, #project_name_edit, #proj_desc_edit, #select111_edit, #type_project_edit').attr('disabled', false);
		$('#delete_temp_image').fadeOut('fast');
		$('#target_img').slideUp('slow', function(){
			formData = new FormData();
			typepub = 'text';
		});
	});
	$('#image_file').click(function(){
		//$('#project_edit_valid, #project_name_edit, #proj_desc_edit, #select111_edit, #type_project_edit').attr('disabled', false);
		var element = document.getElementById('image_upload');
		if(element && document.createEvent){
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, false);
			element.dispatchEvent(evt);
		}
	});
	$('#image_upload').on('change', function(e){
		//alert('image file');
		typepub = 'image';
		var data = e.originalEvent.target.files[0];
		var filesize = formatBytes(data.size);
		var current_file = data;
		var mbTest = filesize.split(' ');
		//alert(JSON.stringify(data));
		//console.log(data);
		if(mbTest[1].toLowerCase() === 'mb'){
			var tailleSize = mbTest[0].split('.');
			//alert(tailleSize[0]);
			//var current_file = document.getElementById('image_upload').files[0];
			var reader = new FileReader();
			reader.onload = function( event ){
				var image = new Image();
				image.src = event.target.result;

				image.onload = function(){
					var maxWidth = 1000;
					var maxHeight = 612.0;
					var imageWidth = image.width;
					var imageHeight = image.height;

					if( imageWidth > imageHeight ){
						if ( imageWidth > maxWidth ) {
							imageHeight *= maxWidth / imageWidth;
						}
					}else{
						if( imageHeight > maxHeight ){
							imageWidth *= maxHeight / imageHeight;
							imageHeight = maxHeight;
						}
					}

					var canvas = document.createElement('canvas');
					canvas.width = imageWidth;
					canvas.height = imageHeight;
					image.width = imageWidth;
					image.height = imageHeight;
					var ctx = canvas.getContext('2d');
					ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
					var source_img = new Image();
					source_img.onload = function(){
						//console.log(canvas.toDataURL(current_file.type));

						/*Compression de l'image*/
						var target_img = document.getElementById('target_img');

						var quality = 80;
						var output_format = 'jpg';

						target_img.src = image.src;

						target_img.style.display = 'block';
						//document.getElementById('delete_temp_image').style.display = 'block';
						$('#delete_temp_image').slideDown('slow');
						/*Fin de la compression*/

						//formData.setAttribute('id', 'hum');
						formData.append("photo", dataURItoBlob(jsc.compress(source_img, quality, output_format).src));
						formData.append('lang', $('html').attr('lang'));
						//console.log(jsc.compress(source_img, quality, output_format).src);
					};
					source_img.src = canvas.toDataURL(current_file.type);

				}
			};
			reader.readAsDataURL(current_file);
			/*if(tailleSize[0] <= 3){
				//alert('Can be uploaded!');
				var reader = new FileReader();
				reader.onload = function(evt){

					formData = new FormData();
					//formData.setAttribute('id', 'hum');
					formData.append("photo", dataURItoBlob(evt.target.result));
					formData.append("projectId", $mainController.currentProjectId);
					formData.append('lang', $('html').attr('lang'));
					//changeProjectPhotoRequest(formData);
				};
				reader.readAsDataURL(data);
				//reader.readAsDataURL(data);
			}else{
				alert('Cannot be uploaded!');
				return false;
			}*/
		}else if(mbTest[1].toLowerCase() === 'kb'){
			var reader = new FileReader();
			reader.onload = function(evt){

				formData = new FormData();
				//formData.setAttribute('id', 'hum');
				formData.append("photo", dataURItoBlob(evt.target.result));
				formData.append('lang', $('html').attr('lang'));
				//changeProjectPhotoRequest(formData);
				var target_img = document.getElementById('target_img');
				target_img.src = evt.target.result;

				target_img.style.display = 'block';
				//document.getElementById('delete_temp_image').style.display = 'block';
				$('#delete_temp_image').slideDown('slow');
			};
			reader.readAsDataURL(data);
		}
	});
	/**********************************/
	function makeTruncate (obj, taille, textLink, fn) {
		// body...
		$moreText = textLink;
		$suspend = '...';
		$fullText = obj.html();
		if(obj.html().length > taille){
			$subs = obj.html().substring(0, taille);
			obj.html($subs.trim()+$suspend+' <a href="#" id="add_more">'+$moreText+'</a>')
			//alert(obj.html().length - taille)
			$(obj).find('a').on('click', function(event){
				event.preventDefault();
				//alert($fullText)
				obj.html($fullText)
			});
		}else{
			obj.html($fullText);
		}
	}
	function formatDate(date) {
		// body...
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes +' '+ ampm;
		return date.getMonth()+1 + "/" + date.getDate() + '/' + date.getFullYear() + " " + strTime;
	}
	function time_ago(time) {
		// body...
		switch (typeof time){
			case 'number':
				break;
			case 'string' :
				time = +new Date(time);
				break;
			case 'object':
				if(time.constructor === Date)
					time = time.getTime();
				break;
			default:
				time = +new Date();
		}

		var time_formats = [
			[60, language.seconds_text, 1], //60
			[120, language.minute_ago, language.minute_from_now],
			[3600, language.minutes_text, 60],
			[7200, language.hour_ago, language.hour_from_now],
			[86400, language.hours_text, 3600],
			[172800, language.yesterday_text, language.tomorrow_text],
			[604800, language.days_text, 86400],
			[1209600, 'Last week', 'Next week'],
			[2419200, 'weeks', 604800],
			[4838400, 'Last month', 'Next month'],
			[29030400, 'months', 2419200],
			[58060800, 'Last year', 'Next year'],
			[2903040000, 'years', 29030400],
			[5806080000, 'last century', 'Next century'],
			[5806080000, 'centuries', 2903040000]
		];

		var seconds = (+new Date() - time) / 1000;
		var token = language.ago_text;
		list_choice = 1;

		if(seconds === 0){
			return language.just_now_text;
		}
		if(seconds < 0){
			seconds = Math.abs(seconds);
			token = language.from_now_text;
			list_choice = 2;
		}
		var i = 0;
		var format;
		while (format = time_formats[i++])
			if(seconds < format[0]){
				if(typeof format[2] === 'string'){
					//alert(format[list_choice]);
					return format[list_choice];
				}
				else{
					return $('html').attr('lang') === 'fr' ? token + ' '+Math.floor(seconds / format[2]) + ' '+ format[1] : Math.floor(seconds / format[2]) + ' '+ format[1] + ' '+ token;
				}
			}
			return time;
	}
	function formatBytes (bytes, decimals) {
	  // body...
	  if (bytes == 0) return '0 Byte';
	  var k = 1024;
	  var dm = decimals + 1 || 3;
	  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	  var i = Math.floor(Math.log(bytes)/Math.log(k));
	  return (bytes/Math.pow(k, i)).toPrecision(dm)+ ' '+ sizes[i];
	}
	function dataURItoBlob (dataUri) {
		// body...
		var byteString;
		if(dataUri.split(',')[0].indexOf('base64') >= 0)
			byteString = atob(dataUri.split(',')[1]);
		else
			byteString = unescape(dataUri.split(',')[1]);

		var mimeString = dataUri.split(',')[0].split(':')[1].split(':')[0];

		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		};

		return new Blob([ia], {type:mimeString});
	}
	function loadAppLink(json) {
		// body...
		try{
  			$.ajax({
  				url:'/app/load_app_link',
  				type:'POST',
  				data:json,
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer === 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000);
	  				}else{
	  					link = answer;
	  				}
  				},
  				error:function(err){
  					console.error(JSON.stringify(err));
  				}
  			});
  		}catch(ex){
  			console.error(JSON.stringify(ex));
  		}
	}
	function loadAppLanguage(json) {
  		// body...
  		try{
  			$.ajax({
  				url:'/app/load_app_language',
  				type:'POST',
  				data:json,
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer === 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000);
	  				}else{
	  					language = answer;
	  				}
  				},
  				error:function(err){
  					console.error(JSON.stringify(err));
  				}
  			});
  		}catch(ex){
  			console.error(JSON.stringify(ex));
  		}
  	}
  	function changeProjectPhotoRequest (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/community/publish_article_photo.tsl',
	  			type:'POST',
	  			data:json,
	  			success:function (data){
	  				//alert(answer);
	  				if(data.tag === 'success'){
	  					$('#title_article, #article_text').val('');
	  					$('#delete_temp_image').fadeOut('fast');
	  					$('#target_img').slideUp('slow', function(){
							typepub = 'text';
						});
			     		$template = '<img src="/article/icon/'+data.article._id+'" alt="icon" class="img-thumbnail" width="800" height="480" style="height:480px!important;margin-top:2px;border-style: solid; border-width: 1px; border-color: white;">\
			     		<span class="only_bottom" id="time_date_'+data.article._id+'">'+time_ago(data.article._date)+'\
			            </span>\
			            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.article._title+'</h4>\
			            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text+'\
							'+data.article._written+'</h6>\
			            <hr style="margin-bottom: 5px;">\
			            <ul id="menu">\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">remove_red_eye</i>\
			                <span style="position: relative;top:-5px;">0</span>\
			              </li>\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-2px;" aria-hidden="true">thumb_up</i>\
			                <span style="position: relative;top:-5px;">0</span>\
			              </li>\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">forum</i>\
			                <span style="position: relative;top:-5px;">0</span>\
			              </li>\
			            </ul>\
			            <hr style="margin-top: -14px;"><span id="article_'+data.article._id+'">'+data.article._content+'</span><br>\
			            <button type="button" class="btn btn-sm btn-raised" id="publish" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">thumb_up</i> '+language.like_button+'</button>\
			            <button type="button" class="btn btn-sm btn-raised" id="publish" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">comment</i> '+language.comment_button+'</button>\
			            <button type="button" class="btn btn-sm btn-raised" id="publish" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">share</i> '+language.recommend_button+'</button>';
			            $('#latest_articles_id').prepend('<hr>');
			            $('#latest_articles_id').prepend($template);
			            var timeServer = data.article._date;
			            var idM = data.article._id;
			            setInterval(function(){
			            	console.log(time_ago(timeServer));
			            	$('#time_date_'+idM).html(time_ago(timeServer));
			            }, 60000);
			            var obj = $('#article_'+data.article._id);
			            $moreText = language.read_more_text;
						$suspend = '...';
						var taille = 100;
						$fullText = obj.html();
						if(obj.html().length > taille){
							$subs = obj.html().substring(0, taille);
							obj.html($subs.trim()+$suspend+' <a href="#" id="add_more">'+$moreText+'</a>')
							//alert(obj.html().length - taille)
							$(obj).find('a').on('click', function(event){
								event.preventDefault();
								//alert($fullText)
								obj.html($fullText)
							});
						}else{
							obj.html($fullText);
						}
	  				}else if(answer.tag === 'warning'){
	  					alert(answer.message);
	  				}else if(answer === 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			},
	  			cache: false,
		        contentType: false,
		        processData: false
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}
  	loadAppLanguage({lang:$('html').attr('lang')});
  	loadAppLink({lang:$('html').attr('lang')});
});