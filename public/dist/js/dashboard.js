/*Dashboard js file*/

/*
 *  @Vérifie: Fichier principal sur la gestion de la page;
 *  @Auteur : Henock Bongi[HBI];
 *  @date   : 25, Décembre, 2016;
 */

// JavaScript Document
$(document).ready(function(){
	// language=JQuery-CSS
    $firstName   = $('#inputName');
	$lastName    = $('#inputLastName');
	$email       = $('#inputEmail');
	$country     = $('#inputCountry');
	$date        = $('#inputDate');
	$place       = $('#inputPlace');
	$id_user     = $('#user_id');
	$lang        = $('html').attr('lang');
	$oldPassword = $('#old_password');
	$newPassword = $('#new_password');
	$confirmPass = $('#focusedInput2');
	$groupId = 0;
	$port = '2212';
	$isInvitationView = false;
	var serverLink = 'http://'+$('#ip_connect').val()+':'+$port;
	var language = {};
	var link = {};
	var socket = io();

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
			requestLauncher('/workspace/community/article/load.tsl', 'get', null, function(state, tag, data){
				if(state){
					if(tag.toLowerCase() === 'success'){
		     			/*alert(JSON.stringify(data));*/
                        console.log(JSON.stringify(data));
		     			if(data.articles.length > 0){
		     				$('#latest_articles_id').empty();
		     				$('#rem').remove();
		     				for (var i = 0; i < data.articles.length; i++) {
		     					console.log(i+' --> '+data.articles.length);
		     					if(data.articles[i]._isLiked){
	     							if(data.articles[i]._type === 'text'){
                                        //alert(language.written_by);
		     							$template = '<span class="only_bottom" id="time_date_'+data.articles[i]._id+'">'+time_ago(data.articles[i]._date)+'\
							            </span>\
							            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.articles[i]._title+'</h4>\
							            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text +' <a href="/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.articles[i]._canonical+'">'+data.articles[i]._community+'</a></h6>\
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
												                <p style="font-weight:bold;">'+datas._user.last_name+' '+datas._user.first_name+'</p>\
												                <p>'+asyncData.comment+'</p>\
												                <hr>');
									            			}
									            		}
									            	});
									            }
									            $('#comment_line_'+data.articles[i]._id+'').parent().append('<div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
									                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
									                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.5%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
									              </div>');
								            }else{
									        	//alert(JSON.stringify(data.articles));
									        	$('<br><br><div style="background-color: #ccc; padding: 1px;">\
										              <div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
										                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
										                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.5%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
										              </div>\
										            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
									        }
								        }

							        }else if(data.articles[i]._type === 'image'){
							        	$template = '<img src="/article/icon/'+data.articles[i]._id+'" alt="icon" class="img-thumbnail" width="520" height="480" style="height:450px!important;margin-top:2px;border-style: solid; border-width: 1px; border-color: white;">\
							        	<span class="only_bottom" id="time_date_'+data.articles[i]._id+'">'+time_ago(data.articles[i]._date)+'\
							            </span>\
							            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.articles[i]._title+'</h4>\
							            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text +' <a href="/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.articles[i]._idCommunity+'">'+data.articles[i]._community+'</a></h6>\
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
												                <p style="font-weight:bold;">'+datas._user.last_name+' '+datas._user.first_name+'</p>\
												                <p>'+asyncData.comment+'</p>\
												                <hr>');
									            			}
									            		}
									            	});
									            }
									            $('#comment_line_'+data.articles[i]._id+'').parent().append('<div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
									                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
									                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.5%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
									              </div>');
								            }else{
									        	//alert(JSON.stringify(data.articles));
									        	$('<br><br><div style="background-color: #ccc; padding: 1px;">\
										              <div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
										                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
										                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.5%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
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
							            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text +' <a href="/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.articles[i]._idCommunity+'">'+data.articles[i]._community+'</a></h6>\
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
								            	$('<div style="background-color: #ccc; padding: 1px;">\
									              <div style="background-color: #fff; padding: 5px;" id="comment_line_'+data.articles[i]._id+'" index="">\
									              </div>\
									            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
								            if(data.articles[i]._comments.length > 0){
								            	var commentTab = data.articles[i]._comments;
								            	//alert(data.articles[i]._comments[0].content);
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
												                <p style="font-weight:bold;">'+datas._user.last_name+' '+datas._user.first_name+'</p>\
												                <p>'+asyncData.comment+'</p>\
												                <hr>');
									            			}
									            		}
									            	});
									            }
									            $('#comment_line_'+data.articles[i]._id+'').parent().append('<div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
									                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_button" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
									                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.5%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
									              </div>');
								            }else{
									        	//alert(JSON.stringify(data.articles));
									        	$('<br><br><div style="background-color: #ccc; padding: 1px;">\
										              <div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
										                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
										                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.5%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
										              </div>\
										            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
									        }
								        }
							        }else if(data.articles[i]._type === 'image'){
							        	$template = '<img src="/article/icon/'+data.articles[i]._id+'" alt="icon" class="img-thumbnail" width="520" height="450" style="height:480px!important;margin-top:2px;border-style: solid; border-width: 1px; border-color: white;">\
							        	<span class="only_bottom" id="time_date_'+data.articles[i]._id+'">'+time_ago(data.articles[i]._date)+'\
							            </span>\
							            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.articles[i]._title+'</h4>\
							            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text +' <a href="/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.articles[i]._idCommunity+'">'+data.articles[i]._community+'</a></h6>\
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
												                <p style="font-weight:bold;">'+datas._user.last_name+' '+datas._user.first_name+'</p>\
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
									                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.5%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
									              </div>');
								            }else{
									        	//alert(JSON.stringify(data.articles));
									        	$('<br><br><div style="background-color: #ccc; padding: 1px;">\
										              <div style="background-color: #ccc; padding: 1px; margin-top: -25px;">\
										                <button type="button" disabled="disabled" class="btn btn-sm btn-raised" id="comment_'+data.articles[i]._id+'" style="margin-top:1px;margin-bottom:2px;background-color:white;float: right;padding-left: 5px!important;padding-right: 5px!important;"><i class="material-icons" style="color:#6D7993;" aria-hidden="true">comment</i></button>\
										                <input type="text" id="input_'+data.articles[i]._id+'" placeholder="'+language.comment_publishing_article+'" style="width: 94.5%; margin-top:2px;margin-bottom:2px;padding: 4px; border: none;">\
										              </div>\
										            </div>').appendTo($('#comment_block_'+data.articles[i]._id+''));
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
									//alert($comIdP.replace('comment_', ''));
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
								                <p style="font-weight:bold;">'+$comment.sender+'</p>\
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
					            $('#latest_articles_id').children('img').css({
					            	'min-width' : '600px!important',
					            	'max-width' : '400px!important'
					            });
		     				}
		     			}
					}else if(tag === 'warning'){
						alert(language.error_text);
					}else if(tag === 'session_expired'){
						alert(language.error_text);
					}
				}
			});
		};
		document.body.appendChild(bsa);
	})();


    socket.on('connect', function(d){
      //console.log('connecté')
		socket.emit('AddUser', $('#user_email_socket').html(), 'web', 1, 2500, function(data){
			//alert(data);
			if(data === 'connected'){
				$mainController.socketConnected = true;
			}
		//$('#connectText').html(data)
		});
	});
	socket.on('group_test', function (msg){
		console.info(msg);
	});
	socket.on('newInvitation', function (){
		loadUserInvitation({lang:$('html').attr('lang')});
	});
	socket.on('newNotification', function (){
		loadUserNotification({lang:$('html').attr('lang')});
	});
	socket.on('left_group', function (msg){
		console.info(msg)
	});
    socket.on('newArticle', function (data){
        console.info(data);
        if(data.article._type === 'text') {
            $template = '<span class="only_bottom" id="time_date_' + data.article._id + '">' + time_ago(data.article._date) + '</span>\
			            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">' + data.article._title + '</h4>\
			            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">' + language.written_text + ' ' + language.by_text +' <a href="/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.article._idCommunity+'">'+data.article._community+'</a></h6>\
			            <hr style="margin-bottom: 5px;">\
			            <ul id="menu">\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">remove_red_eye</i>\
			                <span style="position: relative;top:-5px;">0</span>\
			              </li>\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-2px;" aria-hidden="true">thumb_up</i>\
			                <span style="position: relative;top:-5px;" id="like_value_'+data.article._id+'">0</span>\
			              </li>\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">forum</i>\
			                <span style="position: relative;top:-5px;" id="comment_value_'+data.article._id+'">0</span>\
			              </li>\
			            </ul>\
			            <hr style="margin-top: -14px;">\
			            <span id="article_' + data.article._id + '">' + data.article._content + '</span><br>\
						<button type="button" class="btn btn-sm btn-raised" id="like_'+data.article._id+'" data-id="like_'+data.article._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">thumb_up</i> <span>'+language.like_button+'</span></button>\
						<button type="button" class="btn btn-sm btn-raised" id="recommend_'+data.article._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">share</i> '+language.recommend_button+'</button>\
						<span id="comment_block_'+data.article._id+'"></span>';
            $('#latest_articles_id').prepend($template);
            $('#latest_articles_id').prepend('<hr>');
            var timeServer = data.article._date;
            var idM = data.article._id;
            setInterval(function () {
                console.log(time_ago(timeServer));
                $('#time_date_' + idM).html(time_ago(timeServer));
            }, 60000);
            var obj = $('#article_' + data.article._id);
            $moreText = language.read_more_text;
            $suspend = '...';
            var taille = 100;
            $fullText = obj.html();
            if (obj.html().length > taille) {
                $subs = obj.html().substring(0, taille);
                obj.html($subs.trim() + $suspend + ' <a href="#" id="add_more">' + $moreText + '</a>')
                //alert(obj.html().length - taille)
                $(obj).find('a').on('click', function (event) {
                    event.preventDefault();
                    //alert($fullText)
                    obj.html($fullText)
                });
            } else {
                obj.html($fullText);
            }
            $('#like_'+data.article._id+', #dislike_'+data.article._id+'').click(function(){
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
            $('#comment_'+data.article._id+'').click(function(){
                //alert($(this).attr('id'));
                $comIdP = $(this).attr('id');
                $currentButton = $(this);
                //alert($comIdP.replace('comment_', ''));
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
								                <p style="font-weight:bold;">'+$comment.sender+'</p>\
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
            $('#input_'+data.article._id+'').keyup(function(e){
                $comIdP = $(this).attr('id').replace('input_', 'comment_');
                if($(this).val().length > 0){
                    $('#'+$comIdP).attr('disabled', false);
                    //alert($(this).val());
                }else
                    $('#'+$comIdP).attr('disabled', true);
            });
            $('#recommend_'+data.article._id+'').click(function(){
                alert($(this).attr('id'));
            });
        }else if(data.article._type === 'image'){
            $template = '<img src="/article/icon/'+data.article._id+'" alt="icon" class="img-thumbnail"  width="520" height="450" style="height:480px!important;margin-top:2px;border-style: solid; border-width: 1px; border-color: white;">\
			     		<span class="only_bottom" id="time_date_'+data.article._id+'">'+time_ago(data.article._date)+'\
			            </span>\
			            <h4 class="panel-title" style="padding-left: 2px;padding-top: 2px;">'+data.article._title+'</h4>\
			            <h6 class="panel-title project_public_name" style="margin-left:1px;padding-left: 2px;padding-top: 2px;">'+language.written_text +' '+language.by_text +' <a href="/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.article._idCommunity+'">'+data.article._community+'</a></h6>\
			            <hr style="margin-bottom: 5px;">\
			            <ul id="menu">\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">remove_red_eye</i>\
			                <span style="position: relative;top:-5px;">0</span>\
			              </li>\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-2px;" aria-hidden="true">thumb_up</i>\
			                <span style="position: relative;top:-5px;" id="like_value_'+data.article._id+'">0</span>\
			              </li>\
			              <li>\
			                <i class="material-icons" style="color:#000;margin-top:-3px;" aria-hidden="true">forum</i>\
			                <span style="position: relative;top:-5px;" id="comment_value_'+data.article._id+'">0</span>\
			              </li>\
			            </ul>\
			            <hr style="margin-top: -14px;">\
						<span id="article_' + data.article._id + '">' + data.article._content + '</span><br>\
						<button type="button" class="btn btn-sm btn-raised" id="like_'+data.article._id+'" data-id="like_'+data.article._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">thumb_up</i> <span>'+language.like_button+'</span></button>\
						<button type="button" class="btn btn-sm btn-raised" id="recommend_'+data.article._id+'" style="background-color:#6D7993;color:white;"><i class="material-icons" style="color:#fff;margin-top:-2px;" aria-hidden="true">share</i> '+language.recommend_button+'</button>\
						<span id="comment_block_'+data.article._id+'"></span>';
            $('#latest_articles_id').prepend($template);
            $('#latest_articles_id').prepend('<hr>');
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
            $('#like_'+data.article._id+', #dislike_'+data.article._id+'').click(function(){
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
            $('#comment_'+data.article._id+'').click(function(){
                //alert($(this).attr('id'));
                $comIdP = $(this).attr('id');
                $currentButton = $(this);
                //alert($comIdP.replace('comment_', ''));
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
								                <p style="font-weight:bold;">'+$comment.sender+'</p>\
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
            $('#input_'+data.article._id+'').keyup(function(e){
                $comIdP = $(this).attr('id').replace('input_', 'comment_');
                if($(this).val().length > 0){
                    $('#'+$comIdP).attr('disabled', false);
                    //alert($(this).val());
                }else
                    $('#'+$comIdP).attr('disabled', true);
            });
            $('#recommend_'+data.article._id+'').click(function(){
                alert($(this).attr('id'));
            });
		}
    });
	socket.on('disconnect', function(){
		$mainController.socketConnected = false;
	});
	socket.on('isConnectedToGroup', function(member){
		$('#member_list li').find('span').each(function(){
			//console.log($(this).attr('simple'));
			if($(this).attr('simple') != 'undefined'){
				if($(this).attr('simple') == member){
					$(this).html(language.online_text);
				}
			}
		});
	});
	socket.on('isDisconnectedToGroup', function(member){
		$('#member_list li').find('span').each(function(){
			//console.log($(this).attr('simple'));
			if($(this).attr('simple') != 'undefined'){
				if($(this).attr('simple') == member){
					$(this).html('');
				}
			}
		});
	});

	$('#delete_account_delete').click(function(){
		//alert(getHost());
		deleteAccountRequest({email:$('#inputEmail').val(), lang:$('html').attr('lang')})
	});
	$('#deleteProject').click(function(){
		//alert('deleteProject');
		deleteProjectRequest({number:$mainController.currentNumber, projectId:$mainController.currentProjectId});
	});
	$('#more_project').click(function(ev){
		ev.preventDefault();
		//alert('deleteProject');
		getYourFiveProject(false);
	});
	$('#edit_pro_ico_btn').click(function(){
		//$('#project_edit_valid, #project_name_edit, #proj_desc_edit, #range_select_edit, #project_type_select_edit').attr('disabled', false);
		var element = document.getElementById('inputFile5');
		if(element && document.createEvent){
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, false);
			element.dispatchEvent(evt);
		}
	});
	$('#inputFile5').on('change', function(e){
		var data = e.originalEvent.target.files[0];
		var filesize = formatBytes(data.size);
		var mbTest = filesize.split(' ');
		//alert(mbTest[0]);
		if(mbTest[1].toLowerCase() === 'mb'){
			var tailleSize = mbTest[0].split('.');
			//alert(tailleSize[0]);
			if(tailleSize[0] <= 3){
				//alert('Can be uploaded!');
				var reader = new FileReader();
				reader.onload = function(evt){
					$jsonData = {
						photo:evt.target.result.replace(/^data:([A-Za-z-+\/]+);base64,/, ""),
						lang:$('html').attr('lang')
					};

					var formData = new FormData();
					//formData.setAttribute('id', 'hum');
					formData.append("photo", dataURItoBlob(evt.target.result));
					formData.append("projectId", $mainController.currentProjectId);
					formData.append('lang', $('html').attr('lang'));
					changeProjectPhotoRequest(formData);
				};
				reader.readAsDataURL(data);
				//reader.readAsDataURL(data);
			}else{
				alert('Cannot be uploaded!');
				return false;
			}
		}else if(mbTest[1].toLowerCase() === 'kb'){
			var reader = new FileReader();
			reader.onload = function(evt){
				$jsonData = {
					photo:evt.target.result.replace(/^data:([A-Za-z-+\/]+);base64,/, ""),
					lang:$('html').attr('lang')
				};
				var array = [];
				for (var i = 0; i < $jsonData.photo.length; i++) {
					array.push($jsonData.photo.charCodeAt(i));
				};

				var newFile = new Blob([new Uint8Array(array)], {type: 'image/png'});

				var formData = new FormData();
				//formData.setAttribute('id', 'hum');
				formData.append("photo", dataURItoBlob(evt.target.result));
				formData.append("projectId", $mainController.currentProjectId);
				formData.append('lang', $('html').attr('lang'));
				changeProjectPhotoRequest(formData);
			};
			reader.readAsDataURL(data);
		}

	});
	$('#project_edit_valid').click(function(){
		$('#project_edit_valid, #project_name_edit, #proj_desc_edit, #select111_edit, #project_type_select_edit').attr('disabled', true);
	});
	$('#confirm_invitation_request').click(function(){
		var nb = {
			invit_id : $('#invit_hidden_id').val(),
			group_id : $('#group_hidden_id').val(),
			sen_recI : $('#sen_rec_hidden_id').val(),
			status : 'agreed',
			lang : $lang
		}
		//alert(JSON.stringify(nb));
		updateInvitationStatus(nb);
	});
	$('#cancel_invitation_request').click(function(){
		var nb = {
			invit_id : $('#invit_hidden_id').val(),
			status : 'rejected',
			lang : $lang
		}
		updateInvitationStatus(nb);
	});
	$('#notification_updater, #notification_updaters').click(function(){
		var nb = {
			notif_id : $('#notif_hidden_id').val(),
			status : 'read',
			lang : $lang
		}
		updateNotificationStatus(nb);
	});

	$('#c_pass_send').click(function(){
		//alert(getHost());

		if($oldPassword.val().length > 0){
			if($newPassword.val().length > 0){
				if($confirmPass.val().length > 0){
					if($oldPassword.val() == $newPassword.val()){
						if($('html').attr('lang') == 'fr')
							alert('Le nouveau ne doit pas être identique à l\'ancien.')
						else if($('html').attr('lang') == 'en')
							alert('New password cannot be the same as old password.')
					}else if($newPassword.val() == $confirmPass.val()){
						$jsonData = {
							oldPassword: $oldPassword.val(),
							newPassword: $newPassword.val(),
							confirmPass: $confirmPass.val(),
							id_user:$('#user_id').val(),
							email:$('#inputEmail').val(),
							lang:$('html').attr('lang')
						};
						//alert(JSON.stringify($jsonData))
						changePasswordRequest($jsonData);
					}else{
						if($('html').attr('lang') == 'fr')
							alert('Les mots de passe ne sont pas identique');
						else if($('html').attr('lang') == 'en')
							alert('Passwords are not the same');
					}
				}else{
					if($('html').attr('lang') == 'fr')
						alert('Vous devez confirmer le mot de passe.');
					else if($('html').attr('lang') == 'en')
						alert('You might confirm password.');
				}
			}else{
				if($('html').attr('lang') == 'fr')
					alert('Veuillez entrer le nouveau mot de passe.');
				else if($('html').attr('lang') == 'en')
					alert('Please enter new password.');
			}
		}else{
			if($('html').attr('lang') == 'fr')
				alert('Veuillez entrer l\'ancien mot de passe.');
			else if($('html').attr('lang') == 'en')
				alert('Please enter old password');
		}
	});
	$('#edit_send').click(function(){
		//alert('Change');
		$jsonData = {
			name:$firstName.val(),
			lastname:$lastName.val(),
			country:$country.val(),
			date:$date.val(),
			place:$place.val(),
			id:$id_user.val(),
			lang:$lang,
			skills:0
		};
		//alert(JSON.stringify($jsonData))
		changeUserRequest($jsonData);
	});

	$newPassword.keyup(function(){
		if($(this).val() < 4){
			$(this).css({
				color : 'red'
			});
		}else{
			$(this).css({
				color : 'green'
			});
		}
	});
					
	$confirmPass.keyup(function(){        
	   if($(this).val() != $newPassword.val()){ // si la confirmation est différente du mot de passe            
		   $(this).css({ // on rend le champ rouge
			   color : 'red'     
		  	});
			if($('html').attr('lang') == 'fr'){
				$('#confirm_password_help').text('Mot de passe non identique.');
			}else if($('html').attr('lang') == 'en'){
				$('#confirm_password_help').text('Password does not match.');
			}
			$('#confirm_password_help').css({color:'red'})
	 	} else{     
		    $(this).css({ // si tout est bon, on le rend vert
				color : 'green'
			});
			if($('html').attr('lang') == 'fr'){
				$('#confirm_password_help').text('Mot de passe identique.');
			}else if($('html').attr('lang') == 'en'){
				$('#confirm_password_help').text('Password matched.');
			}
			$('#confirm_password_help').css({color:'green'})
	    }
  	});
  	$('#photo_edit').click(function(){
  		$('#password_block, #editing_block').slideUp('slow', function(){
          $('#photo_block').slideDown('slow', function(){
            $('html, body').animate({
              scrollTop:$('#photo_block').offset().top
            });
          });
        });
  	});
  	$('#left_rotation').click(function(){
		var viewport = document.getElementById('viewport');
		var context = viewport.getContext('2d');

		context.translate(viewport.width/2, viewport.height/2);
		context.rotate(Math.PI/2);
		context.drawImage(viewport, -viewport.width/2, -viewport.height/2);
		context.rotate(-Math.PI/2);
		context.translate(-viewport.width/2, -viewport.height/2);
		//context.fillRect(0,0,25,10)
  	});
  	$('#right_rotation').click(function(){
  		var viewport = document.getElementById('viewport');
		var context = viewport.getContext('2d');

		context.translate(viewport.width, viewport.height);
		context.rotate(Math.PI/2);
		context.drawImage(viewport, -viewport.width, -viewport.height);
		context.rotate(-Math.PI/2);
		context.translate(-viewport.width, -viewport.height);
  	});
  	$('#inputFile4').on('change', function(e){
  		$('#photo_valid, #left_rotation, #right_rotation').prop('disabled', true);
		var data = e.originalEvent.target.files[0];
			$('#preview-pane .preview-container img').attr('src', '../images/indicator.gif');
		var reader = new FileReader();
		reader.onload = function(evt){
			try{
				jcrop_api.destroy();
			}catch(ex){
				//Nothing
			}
			//$('#viewport').attr('src', evt.target.result);
			var viewport = document.getElementById('viewport');
			var context = viewport.getContext('2d');
			var base_image = new Image();
			base_image.src = evt.target.result;
			base_image.id = 'img_cr';
			base_image.onload = function(){
				viewport.width = 602;
				viewport.height = 500;
				/**/
				var imgWidth = base_image.naturalWidth;
				var screenWidth = viewport.width;
				var scaleX = 1;
				if(imgWidth > screenWidth)
					scaleX = screenWidth/imgWidth;
				var imgHeight = base_image.naturalHeight;
				var screenHeight = viewport.height;
				var scaleY = 1;
				if(imgHeight > screenHeight)
					scaleY = screenHeight/imgHeight;
				var scale = scaleY;
				if(scaleX < scaleY)
					scale = scaleX;
				if(scale < 1){
					imgHeight = imgHeight * scale;
					imgWidth = imgWidth * scale;
				}
				viewport.height = imgHeight;
				viewport.width = imgWidth;
				context.drawImage(base_image, 0, 0, base_image.naturalWidth, base_image.naturalHeight, 0, 0, imgWidth, imgHeight);
				//context.drawImage(base_image, 0, 0, 602, 602 * viewport.height/viewport.width);
			}
			//$('#preview-pane .preview-container img').attr('src', $('#target').attr('src'));
			//cropImage();
			newCrop();
		};
		reader.readAsDataURL(data);
      
    });
    $('#photo_valid').click(function(){
    	//takePicture();
    	takeCroppedPic();
    });
    $('#back_to_home_btn').click(function(event){
    	$('#file_title').html(language.welcome_msg);
    	$(this).hide('slide');
    	$('#group_presentation, #user_profil, #project_presentation, #project_summary_view').slideUp('slow', function(){
           	$('#summary_presentation').show('slide');
           });
    });
    
    $('.nav-link').on('click', function(event){
    	if($(this).attr('tag') !== 'home'
    		&& $(this).attr('tag') !== 'forum'
    		&& $(this).attr('tag') !== 'info'
    		&& $(this).attr('tag') !== 'invitation'
    		&& $(this).attr('tag') !== 'search'
			&& $(this).attr('tag') !== 'show_profile'
    		&& $(this).attr('tag') !== 'project'){
    		event.preventDefault();
    		alert($(this).text());
    	}else if($(this).attr('tag') === 'project') {
            event.preventDefault();
            $('#file_title').html(language.top_bar_projects);
            $('#group_presentation, #user_profil, #summary_presentation, #project_summary_view').slideUp('slow', function () {
                $('#project_presentation').show('bounce');
                $('#back_to_home_btn').show('slide');
            });
        }else if($(this).attr('tag') === 'show_profile'){
            let lng = language.my_profil;
            $('#file_title').html(lng);
            $('#user_profil').slideDown('slow');
            $('#group_presentation, #project_presentation, #summary_presentation, #project_summary_view').slideUp('slow');
            $('#back_to_home_btn').show('slide');
    	}else if($(this).attr('tag') === 'search'){
    		event.preventDefault();
    		if($('#searching_nav').is(':visible')){
				//alert('true')
				//$('#searching_nav').slideUp('slow');
				$('#searching_nav').slideUp('slow', function(){
					//alert('true')
					//$('#searching_nav').show('slide');
				});
			}else{
				//alert('false')
				$('#searching_nav').slideDown('slow', function(){
					//alert('true')
					//$('#main_nav').show('slide');
					$(this).animate({
						'margin-top':'25px'
					}, 1000, function(){
						//alert('terminé');
					});
				});
			}
    	}else if($(this).attr('tag') == 'invitation'){
    		event.preventDefault();
    		//alert($('#rep_dir').is(':visible'));
			if($('#rep_dir').is(':visible')){
				//alert('true')
				$('#rep_dir').hide('slide', function(){
					//alert('true')
					$('#notif_dir').show('slide');
				});
			}else if($('#notification_dir').is(':visible')){
				//alert('true')
				$('#notification_dir').hide('slide', function(){
					//alert('true')
					$('#notif_dir').show('slide');
				});
			}else{
				//alert('false')
				$('#notif_dir').hide('slide', function(){
					//alert('true')
					$('#rep_dir').show('slide');
				});
			}
    	}else if($(this).attr('tag') == 'info'){
    		event.preventDefault();
    		/*$(this).animate({
    			backgroundColor:'#fff',
    			color:'#543b79'
    		},1000)*/
    		//alert($('#rep_dir').is(':visible'));
			if($('#rep_dir').is(':visible')){
				//alert('true')
				$('#rep_dir').hide('slide', function(){
					//alert('true')
					$('#notification_dir').show('slide');
					$isInvitationView = false;
				});
			}else if($('#notif_dir').is(':visible')){
				//alert('true')
				$('#notif_dir').hide('slide', function(){
					//alert('true')
					$('#notification_dir').show('slide');
					$isInvitationView = true;
				});
			}else{
				//alert('false')
				if($isInvitationView){
					$('#notification_dir').hide('slide', function(){
						//alert('true')
						$('#notif_dir').show('slide');
					});
				}else{
					$('#notification_dir').hide('slide', function(){
						//alert('true')
						$('#rep_dir').show('slide');
					});
				}
				
			}
    	}
    });
    $('#edit_group_name').click(function(ev){
		ev.preventDefault();
		//alert($('#group_number').val());
		renameGroup({groupNumber:$('#group_number').val(), newName:prompt(language.create_group_input_group)||$('#group_text_name').html(), lang:$lang})
	});
	$('#leave_group_btn').click(function(){
		//alert($('#group_number').val());
		$json = {
			groupNumber:$('#group_number').val(),
			isChecked: $mainController.isAdminChecking,
			lang:$lang
		};
		if(confirm(language.are_you_sure_question))
			leaveGroup($json);
	});
	$('#add_member_link').click(function(event){
		event.preventDefault();
		//alert($(this).text());
	});
    $('#createGroup').click(function(){
    	//alert('Worked');
    	$groupName = $('#inputGroupName').val();
    	$groupMemb = $('#inputMember');

    	if($groupName.length > 3){
    		if($groupMemb.val().match(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}/)){
				$groupMemb.css({
					color : 'green'
				});
				$jsonReq = {
					groupName:$groupName,
					member:$groupMemb.val(),
					lang:$lang
				};
				createGroupRequest($jsonReq);
			}else{
				$groupMemb.css({
					color : 'red'
				});
				alert('cannot_email');
			}
    	}else{
    		alert('cannot');
    	}
    });
    $('#project_type_select').click(function(){
        //alert('Worked');
    	if($(this).val() === 'groupe'){
    		$('#load_group_list_container').slideDown('slow', function(){
    			loadUserGroupsToAdd({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
    		});
    	}else if($(this).val() === 'individual'){
    		$('#load_group_list_container').slideUp('slow');
    		$('#range_select').val('private');
    	}
    });

    $('#createProj').click(function(){
    	$projectName = $('#project_name').val();
    	$projectDesc = $('#proj_desc').val();
    	$range = $('#range_select').val();
    	$projectType = $('#project_type_select').val();

    	$jsonReq = {
			project_name:$projectName,
			lang:$lang,
			desc:$projectDesc,
			range:$range,
			type:$projectType,
			groupe:$('#group_number').val()
		};
		if($projectType === 'individual'){
			if($range === 'private'){
				createProjectRequest($jsonReq);
			}else{
				alert(language.cannot_set_private_public_text);
				return false;
			}
		}else{
			createProjectRequest($jsonReq);
		}

    });
    $('#addNewMember').click(function(){
    	//alert('Worked');
    	$groupMemb = $('#inputMemberMember');

    	if($groupMemb.val().length > 3){
    		if($groupMemb.val().match(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}/)){
				$groupMemb.css({
					color : 'green'
				});
				$jsonReq = {
					member:$groupMemb.val(),
					lang:$lang,
					groupId:$groupId
				};
				addMemberRequest($jsonReq);
				//alert(JSON.stringify($jsonReq));
				$groupMemb.val('');
			}else{
				$groupMemb.css({
					color : 'red'
				});
				alert('cannot_email');
			}
    	}else{
    		alert('cannot');
    	}
    });
  	/***************************************************************************************************************/
  	/**************************************************Jcrop here!**************************************************/

  	function newCrop () {
  		// body...
  		setTimeout(function() {
  			$('#photo_valid, #left_rotation, #right_rotation').prop('disabled', false);
  		}, 1000);
  		$('#viewport').Jcrop({
	      onChange: updatePreviews,
	      onSelect: updatePreviews,
	      allowSelect: true,
	      allowMove: true,
	      allowResize: true,
	      aspectRatio: 0
	    });
  	}
  	var lnh;

    function updatePreviews(c)
    {
      if (parseInt(c.w) > 0)
      {
      	lnh = c;
      	//Preview
      	var imageObj = $('#viewport')[0];
      	var canvass = $('#preview')[0];
      	var context = canvass.getContext('2d');

      	if(imageObj != null && c.x != 0 && c.y != 0 && c.w != 0 && c.h != 0){
      		context.drawImage(imageObj, c.x, c.y, c.w, c.h, 0, 0, canvass.width, canvass.height);
      	}
      }
    };

    function takeCroppedPic () {
    	// body...
    	var imageObj = $('#viewport')[0];
    	var canvas = $('#preview')[0];
		var data = canvas.toDataURL('image/png');
		//window.open(data);
		/*//$photo.attr('src', data);
		//window.open(data);*/
		$jsonData = {
			photo:data.replace(/^data:([A-Za-z-+\/]+);base64,/, ""),
			lang:$('html').attr('lang')
		};
		var array = [];
		for (var i = 0; i < $jsonData.photo.length; i++) {
			array.push($jsonData.photo.charCodeAt(i));
		};

		var newFile = new Blob([new Uint8Array(array)], {type: 'image/png'});

		var formData = new FormData();
		formData.append("photo", dataURItoBlob(data));
		formData.append('lang', $('html').attr('lang'));
		changePhotoRequest(formData);
    }


  	var jcrop_api,
	        boundx,
	        boundy,

	        // Grab some information about the preview pane
	        $preview = $('#preview-pane'),
	        $pcnt = $('#preview-pane .preview-container'),
	        $pimg = $('#preview-pane .preview-container img'),

	        xsize = $pcnt.width(),
	        ysize = $pcnt.height();
	        fileWidth = 0;
			fileHeight = 0;
			fileMarginLeft = 0;
			fileMarginTop = 0;
		var zozor = new Image();
  	function cropImage () {
  		// body...
  		// Create variables (in this scope) to hold the API and image size
  		$('#preview-pane .preview-container img').fadeIn('slow');
  		setTimeout(function() {
  			$('#preview-pane .preview-container img').attr('src', $('#target').attr('src'));
  			zozor.src = $('#target').attr('src');
  			$('#photo_valid').prop('disabled', false);
  		}, 1000);
	    
	    
	    //console.log('init',[xsize,ysize]);
	    $('#target').Jcrop({
	      onChange: updatePreview,
	      onSelect: updatePreview
	    },function(){
	      // Use the API to get the real image size
	      var bounds = this.getBounds();
	      boundx = bounds[0];
	      boundy = bounds[1];
	      // Store the API in the jcrop_api variable
	      jcrop_api = this;

	      // Move the preview into the jcrop container for css positioning
	      $preview.appendTo(jcrop_api.ui.holder);
	      $('#canvas').appendTo(jcrop_api.holder);
	    });
  	}
  	function releaseCheck()
    {
      jcrop_api.setOptions({ allowSelect: true });
    };
    function takePicture() {
		// body...
		$cropt = $('.jrop-holder').children('div').width();
		//alert('Width-> '+$cropt);
		var canvas      = document.querySelector('#canvas');
		$photo = $('#preview-pane .preview-container img');
		$width = $('#preview-pane .preview-container img').width();
		$height = $('#preview-pane .preview-container img').height();

		$left = $('#preview-pane .preview-container img').offset().left - $('.jcrop-holder').offset().left,
		left = $('#preview-pane .preview-container img').css('margin-left').replace('px', ''),
        $mTop =  $('#preview-pane .preview-container img').offset().top - $('.jcrop-holder').offset().top,
        $mTops =  $('#preview-pane .preview-container img').css('margin-top').replace('px', ''),
        width = $('#preview-pane .preview-container img').width(),
        height = $('#preview-pane .preview-container img').height();
        /*fileWidth = $pimg.css('width').replace('px', '');
		fileHeight = $pimg.css('height').replace('px', '');
		fileMarginLeft = $pimg.css('margin-left').replace('px', '');
		fileMarginTop = $pimg.css('margin-top').replace('px', '');*/
        $sX = 360;
        $sY = 0;
        $sourceWidth = 360;
        $sourceHeight = 360;
        $destWidth = $sourceWidth;
        $destHeight = $sourceHeight;
        $destX = canvas.width;
        $destY = canvas.height;
        //alert(JSON.stringify(top));
        //alert('Width-> '+width+' height -> '+height+' left -> '+left+' top -> '+$mTops);
		/*canvas.width = $width;
		canvas.height = $height;*/
		var zozor = new Image();
		zozor.src = $photo.attr('src');
		zozor.onload = function(){
			//canvas.getContext('2d').drawImage(zozor, 99, 27, 100, 100, 25, 25, 100, 100);
			canvas.getContext('2d').drawImage(zozor, $left, fileMarginTop, fileWidth, fileHeight, 578, 0, $destWidth, $destHeight);
			var data = canvas.toDataURL('image/png');
			//$photo.attr('src', data);
			//window.open(data);
			$jsonData = {
				photo:data.replace(/^data:([A-Za-z-+\/]+);base64,/, ""),
				lang:$('html').attr('lang')
			};
			var array = [];
			for (var i = 0; i < $jsonData.photo.length; i++) {
				array.push($jsonData.photo.charCodeAt(i));
			};

			var newFile = new Blob([new Uint8Array(array)], {type: 'image/png'});

			var formData = new FormData();
			formData.append("photo", dataURItoBlob(data));
			formData.append('lang', $('html').attr('lang'));
			changePhotoRequest(formData);
		}
	}

    function updatePreview(c)
    {
      if (parseInt(c.w) > 0)
      {
        var rx = xsize / c.w;
        var ry = ysize / c.h;

        $pimg.css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
        canvas.getContext('2d').drawImage(zozor, c.x, c.y, c.w, c.h, 0, 0, 360, 360);
	        fileWidth = Math.round(rx * boundx);
			fileHeight = Math.round(ry * boundy);
			fileMarginLeft = '-' + Math.round(rx * c.x);
			fileMarginTop = '-' + Math.round(ry * c.y);
      }
    };
  	/***************************************************************************************************************/
  	/*Only Ajax request can be here*/

  	function loadGroupInfos(json) {
  		// body...
  		try{
  			$.ajax({
  				url:'/load_group_infos',
  				type:'POST',
  				data:json,
  				beforeSend:function(){
  					if($lang == 'fr')
  						$('#created_by_date').html('Chargement...');
  					else if($lang == 'en')
  						$('#created_by_date').html('Loading...');
  					loadGroupMembers(json);
  					checkIsAdmin(json);
  					loadGroupProjects(json);
  				},
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer.tag == 'success'){
  						$('#group_presentation').slideDown('slow');
  						$('#created_by_date').html(answer.lang.created_by_text+' <b>'+answer.member+'</b>, '+answer.group.date);
  						$groupId = answer.group.id;
  						/*if(answer.members.length > 0){
  							for (var i = 0; i < answer.members.length; i++) {
	  							$('#member_list').append("<li><a href=\"#\" number="+answer.members[i].numero+">"+answer.members[i].name+"</a></li>");
	  						}
  						}*/
  					}else if(answer.tag === 'not_found'){

  					}else if(answer === 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
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

  	function loadGroupMembers(json) {
  		// body...
  		try{
  			$.ajax({
  				url:'/load_group_members',
  				type:'POST',
  				data:json,
  				beforeSend:function(){
  					$('#member_list').empty();
  					$('#user_profil, #project_presentation, #summary_presentation, #project_summary_view').slideUp('slow');
  					$('#member_count').text('0');
  					if($lang === 'fr')
  						$('#member_list').append('<li>Chargement...</li>');
  					else if($lang === 'en')
  						$('#member_list').append('<li>Loading...</li>');
  					$('#back_to_home_btn').show('slide');
  				},
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer.tag == 'success'){
  						//$('#created_by_date').html(answer.lang.created_by_text+' '+answer.member+', '+answer.group.date);
  						//alert($mainController.isAdminChecking);
  						if(answer.members){
	  						if(answer.members.length > 0){
	  							$('#member_list').empty();
	  							if($mainController.isAdminChecking){
		  							for (var i = 0; i < answer.members.length; i++) {
		  								var lmk = answer.members[i].split(',');
			  							$('#member_list').append('<li id="'+lmk[2]+'" user_id="'+lmk[2]+'" group_number="'+lmk[3]+'"><img style="margin-top:-5px;margin-right:2px;border-radius:50%;border-style: solid; border-width: 1px; border-color: white;" src="/member/'+lmk[1]+'" width="25" height="25">'+lmk[0]+' <span simple="'+lmk[1]+'" class="text-online" id="user_'+lmk[2]+'_id"></span> <a href="javascript:void(0)" >'+language.remove_text+'</a></li>');
			  							if(socket != null){
			  								if(socket.connected){
			  									socket.emit('getUserState', lmk[1], lmk[2], function(isOnline, uid){
			  										//console.log(isOnline);
			  										if(isOnline)
			  											$('#user_'+uid+'_id').text(language.online_text);
			  									});
			  								}
			  							}
			  						}
			  					}else{
			  						for (var i = 0; i < answer.members.length; i++) {
		  								var lmk = answer.members[i].split(',');
			  							$('#member_list').append('<li id="'+lmk[2]+'" user_id="'+lmk[2]+'" group_number="'+lmk[3]+'"><img style="margin-top:-5px;margin-right:2px;border-radius:50%;border-style: solid; border-width: 1px; border-color: white;" src="/member/'+lmk[1]+'" width="25" height="25">'+lmk[0]+' <span simple="'+lmk[1]+'" class="text-online" id="user_'+lmk[2]+'_id"></span></li>');
			  							if(socket != null){
			  								if(socket.connected){
			  									socket.emit('getUserState', lmk[1], lmk[2], function(isOnline, uid){
			  										//console.log(isOnline);
			  										if(isOnline)
			  											$('#user_'+uid+'_id').text(language.online_text);
			  									});
			  								}
			  							}
			  						}
			  					}
		  						$('#member_count').text(answer.members.length+1);
		  						$('#member_list').append('<li><img style="margin-top:-5px;margin-right:2px;border-radius:50%;border-style: solid; border-width: 1px; border-color: white;" src="/profil" width="25" height="25">'+answer.member+' <span class="text-online">'+language.online_text+'</span></li>');
		  						$('#member_list').find('a').on('click', function (event){
		  							event.preventDefault();
		  							if(confirm(language.do_you_remove_text+' '+$(this).parent().text().replace(language.remove_text, '')+'?')){
		  								//alert($mainController.isAdminChecking);
		  								$object = {
		  									groupNumber:$(this).parent().attr('group_number'),
		  									userId:$(this).parent().attr('user_id'),
		  									userName:$(this).parent().text().replace(language.remove_text, '')
		  								};
		  								//console.error(JSON.stringify($object));
		  								removeMember($object);
		  							}/*else{
		  								alert($mainController.isAdminChecking);
		  							}*/
		  						});
	  						}
	  					}else{
  							$('#member_count').text('1');
  							$('#member_list').empty();
  							$('#member_list').append('<li><img style="margin-top:-5px;margin-right:2px;border-radius:50%;border-style: solid; border-width: 1px; border-color: white;" src="/profil" width="25" height="25">'+answer.member+' <span class="text-online">'+language.online_text+'</span></li>');
  						}
  					}else if(answer.tag == 'not_found'){

  					}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
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

  	function removeMember(json) {
  		// body...
  		try{
  			$.ajax({
  				url:'/remove_group_member',
  				type:'POST',
  				data:json,
  				beforeSend:function(){
  				},
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer.tag == 'success'){
  						//$('#created_by_date').html(answer.lang.created_by_text+' '+answer.member+', '+answer.group.date);
  						alert('deleted!');
  						$('#'+json.userId+'').remove();
  					}else if(answer.tag == 'not_found'){
  						alert(language.error_text);
  					}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
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

  	function checkIsAdmin(json) {
  		// body...
  		try{
  			$.ajax({
  				url:'/check_group_admin',
  				type:'POST',
  				data:json,
  				beforeSend:function(){
  				},
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer.tag == 'success'){
  						//$('#created_by_date').html(answer.lang.created_by_text+' '+answer.member+', '+answer.group.date);
  						$mainController.isAdminChecking = answer.isAdmin;
  						if (answer.isAdmin) {
  							$('#add_member_link, #add_task_link, #group_rename').fadeIn('slow');
  						}else{
  							$('#add_member_link, #add_task_link, #group_rename').fadeOut('slow');
  						}
  					}else if(answer.tag == 'not_found'){

  					}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
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
  	function renameGroup(json) {
  		// body...
  		try{
  			$.ajax({
  				url:'/rename_group',
  				type:'POST',
  				data:json,
  				beforeSend:function(){
  				},
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer.tag == 'success'){
  						//$('#created_by_date').html(answer.lang.created_by_text+' '+answer.member+', '+answer.group.date);
  						alert(answer.text);
  						loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
  						$('#group_text_name').html(json.newName);
  					}else if(answer.tag == 'error'){
  						alert(answer.text);
  					}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
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

  	function leaveGroup(json) {
  		// body...
  		try{
  			$.ajax({
  				url:'/leave_group',
  				type:'POST',
  				data:json,
  				beforeSend:function(){
  				},
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer.tag === 'success'){
  						//$('#created_by_date').html(answer.lang.created_by_text+' '+answer.member+', '+answer.group.date);
  						alert(language.leave_group_success_text);
  						loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
  						$('#back_to_home_btn').trigger('click');
  						if(socket.connected())
  							socket.emit('remove_me', answer.user, answer.number);
  					}else if(answer.tag === 'error'){
  						alert(language.error_text);
  					}else if(answer === 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
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

  	function loadUserInvitation(json) {
  		// body...
  		try{
  			$.ajax({
  				url:'/load_user_invitations',
  				type:'POST',
  				data:json,
  				beforeSend:function(){
  					$('#loading_icon_gif_notif, #not_notif_bloc').slideDown('slow');
  				},
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer.tag == 'success'){
  						//alert(JSON.stringify(answer.invitationObject));
  						$countNotif = 0;
  						$('#loading_icon_gif_notif, #not_notif_bloc').slideUp('slow');
  						$('#notif_list').slideDown('slow');
  						$('#notif_list').empty();
  						for (var i = 0; i < answer.invitationObject.length; i++) {
  							if(answer.invitationObject[i].status == 'sent'){
  								$countNotif++;
  								$('#notif_list').append("<li receiver_id="+answer.invitationObject[i].receiver_id+" sender_id="+answer.invitationObject[i].sender_id+" group_id="+answer.invitationObject[i].group_id+" invit_id="+answer.invitationObject[i].id+" groupe="+answer.invitationObject[i].groupName.replace(/ /g, '_')+" sender="+answer.invitationObject[i].senderUser.replace(/ /g, '_')+"><a data-toggle=\"modal\" data-target=\"#\" href=\"#mail-dialog\" class=\"list-group-item list-group-item-info modal-trigger\"><i class=\"material-icons\" style=\"margin-top: -5px;color:#543b79;\">mail</i> <font>"+answer.invitationObject[i].senderUser+"</font></a></li>");
  							}
  							else if(answer.invitationObject[i].status == 'received'){
  								$countNotif++;
  								$('#notif_list').append("<li receiver_id="+answer.invitationObject[i].receiver_id+" sender_id="+answer.invitationObject[i].sender_id+" group_id="+answer.invitationObject[i].group_id+" invit_id="+answer.invitationObject[i].id+" groupe="+answer.invitationObject[i].groupName.replace(/ /g, '_')+" sender="+answer.invitationObject[i].senderUser.replace(/ /g, '_')+"><a data-toggle=\"modal\" data-target=\"#\" href=\"#mail-dialog\" class=\"list-group-item list-group-item-default modal-trigger\"><i class=\"material-icons\" style=\"margin-top: -5px;color:#543b79;\">mail</i> <font>"+answer.invitationObject[i].senderUser+"</font></a></li>")
  							}
  							//$('#notif_list').append("<li><a class=\"alert alert-dismissible alert-warning\" href=\"#\" number="+answer.invitationObject[i].id+">"+answer.invitationObject[i].senderUser+"</a></li>");
  						}
  						//$countNotif = 1023210
  						$('#big_not').html($countNotif);
  						if($countNotif == 0){
  							$('#not_notif_bloc').slideDown('slow');
	  						$('#writeHtmlNotif').html("<i class='material-icons' style='float:left;margin-top:-1px;color:rgba(255, 255, 255, 0.5);'>warning</i> "+language.invit_not_found);
	  						$('#loading_icon_gif_notif, #notif_list').slideUp('slow');
  						}
  						$('#notif_list').find('a').on('click', function(event){
				    		event.preventDefault();
				    		//alert($(this).text());
				    		$('#mail_from').html($(this).children('font').text());
				    		$('#textMsg').html("<b>"+$(this).parent().attr('groupe').replace(/_/g, ' ')+"<b>");
				    		$('#invit_hidden_id').val($(this).parent().attr('invit_id'));//group_hidden_id
				    		$('#group_hidden_id').val($(this).parent().attr('group_id'));
				    		$('#sen_rec_hidden_id').val($(this).parent().attr('receiver_id')+'_'+$(this).parent().attr('sender_id'));
				    		if($(this).hasClass('list-group-item-info')){
					    		var nb = {
					    			invit_id : $(this).parent().attr('invit_id'),
					    			status : 'received',
					    			lang : $lang
					    		}
					    		updateInvitationStatus(nb);
					    	}
				    		$(this).removeClass('list-group-item-info');
				    		$(this).addClass('list-group-item-default');
				    		//loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
					    });	
  						//$('#created_by_date').html(answer.lang.created_by_text+' '+answer.member+', '+answer.group.date);
  						//alert(answer.text);
  						//loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
  					}else if(answer.tag == 'not_found'){
  						$('#not_notif_bloc').slideDown('slow');
  						$('#writeHtmlNotif').html("<i class='material-icons' style='float:left;margin-top:-1px;color:rgba(255, 255, 255, 0.5);'>warning</i> "+answer.message);
  						$('#loading_icon_gif_notif, #notif_list').slideUp('slow');
  					}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
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

  	function loadUserNotification(json) {
  		// body...
  		try{
  			$.ajax({
  				url:'/load_user_notifications',
  				type:'POST',
  				data:json,
  				beforeSend:function(){
  					$('#loading_icon_gif_notification, #not_notification_bloc').slideDown('slow');
  				},
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer.tag == 'success'){
  						//alert(JSON.stringify(answer.invitationObject));
  						$countNotif = 0;
  						$('#loading_icon_gif_notification, #not_notification_bloc').slideUp('slow');
  						$('#notification_list').slideDown('slow');
  						$('#notification_list').empty();
  						for (var i = 0; i < answer.invitationObject.length; i++) {
  							if(answer.invitationObject[i].status === 'received' || answer.invitationObject[i].status === 'sent'){
  								$countNotif++;
  								$('#notification_list').append("<li tag="+answer.invitationObject[i].tag+" group_id="+answer.invitationObject[i].id_from+" notif_id="+answer.invitationObject[i].id+" sender="+answer.invitationObject[i].senderUser.replace(/ /g, '_')+"><a data-toggle=\"modal\" data-target=\"notification-dialog\" href=\"#notification-dialog\" class=\"list-group-item list-group-item-info modal-trigger\"><i class=\"material-icons\" style=\"margin-top: -5px;color:#543b79;\">mail</i> <font>"+answer.invitationObject[i].senderUser+"</font></a></li>");
  							}
  							else if(answer.invitationObject[i].status === 'read'){
  								//$countNotif++;
  								$('#notification_list').append("<li tag="+answer.invitationObject[i].tag+" group_id="+answer.invitationObject[i].id_from+" notif_id="+answer.invitationObject[i].id+" sender="+answer.invitationObject[i].senderUser.replace(/ /g, '_')+"><a data-toggle=\"modal\" data-target=\"notification-dialog\" href=\"#notification-dialog\" class=\"list-group-item list-group-item-default modal-trigger\"><i class=\"material-icons\" style=\"margin-top: -5px;color:#543b79;\">mail</i> <font>"+answer.invitationObject[i].senderUser+"</font></a></li>")
  							}
  							//$('#notif_list').append("<li><a class=\"alert alert-dismissible alert-warning\" href=\"#\" number="+answer.invitationObject[i].id+">"+answer.invitationObject[i].senderUser+"</a></li>");
  						}
  						//$countNotif = 1023210
  						$('#big_inv').html($countNotif);
  						if(answer.invitationObject.length === 0){
  							$('#not_notification_bloc').slideDown('slow');
	  						$('#writeHtmlNotification').html("<i class='material-icons' style='float:left;margin-top:-1px;color:rgba(255, 255, 255, 0.5);'>warning</i> "+language.notif_not_found);
	  						$('#loading_icon_gif_notif, #notification_list').slideUp('slow');
  						}
  						$('#notification_list').find('a').on('click', function(event){
				    		event.preventDefault();
				    		//alert($(this).text());
				    		$('#notif_from').html($(this).children('font').text());
				    		$('#textMsgNotif').html("<b>"+$(this).parent().attr('tag').replace(/_/g, ' ')+"<b>");
				    		$('#notif_hidden_id').val($(this).parent().attr('notif_id')); //notif_hidden_id
				    		$('#group_hidden_id').val($(this).parent().attr('group_id'));
				    		if($(this).hasClass('list-group-item-info')){
					    		var nb = {
					    			notif_id : $(this).parent().attr('notif_id'),
					    			status : 'received',
					    			lang : $lang
					    		}
					    		updateNotificationStatus(nb);
					    		$cur = $countNotif--;
  								$('#big_inv').html($cur);
					    	}
				    		$(this).removeClass('list-group-item-info');
				    		$(this).addClass('list-group-item-default');
				    		//loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
					    });	
  						//$('#created_by_date').html(answer.lang.created_by_text+' '+answer.member+', '+answer.group.date);
  						//alert(answer.text);
  						//loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
  					}else if(answer.tag == 'not_found'){
  						$('#not_notification_bloc').slideDown('slow');
  						$('#writeHtmlNotification').html("<i class='material-icons' style='float:left;margin-top:-1px;color:rgba(255, 255, 255, 0.5);'>warning</i> "+answer.message);
  						$('#loading_icon_gif_notification, #notification_list').slideUp('slow');
  					}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
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

  	function loadUserGroups(json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/load_user_groups',
	  			type:'POST',
	  			data:json,
	  			beforeSend:function(){
	  				$('#group_list').slideUp('slow');
	  				$('#loading_icon_gif').slideDown('slow');
	  			},
	  			success:function (answer){
	  				//alert(JSON.stringify(answer));
	  				if(answer.tag == 'success'){
	  					if(answer.group.length > 0){
	  						$('#loading_icon_gif, #not_group_bloc').slideUp('slow');
	  						$('#group_list').slideDown('slow');
	  						$('#group_list').empty();
	  						for (var i = 0; i < answer.group.length; i++) {
								if(answer.group[i].name.length > 15){
									$suspend = '...';
									$subs = answer.group[i].name.substring(0, 15);
									$('#group_list').append("<li><a href=\"#\" number="+answer.group[i].numero+"><i class=\"material-icons\" style=\"color:rgba(84, 59, 121, 0.8);margin-top:-2px;\" aria-hidden=\"true\">group_work</i>"+$subs+$suspend+"<font style=\"display:none;\">"+answer.group[i].name+"</font></a><span class=\"badge-dash\" style=\"float:right;\">"+parseInt(answer.nombre[i]+1)+"</span></li>");
								}else{
		  							$('#group_list').append("<li><a href=\"#\" number="+answer.group[i].numero+"><i class=\"material-icons\" style=\"color:rgba(84, 59, 121, 0.8);margin-top:-2px;\" aria-hidden=\"true\">group_work</i>"+answer.group[i].name+"<font style=\"display:none;\">"+answer.group[i].name+"</font></a><span class=\"badge-dash\" style=\"float:right;\">"+parseInt(answer.nombre[i]+1)+"</span></li>");
		  						}
		  						/*$('#group_list').append("<li><a href=\"#\" number="+answer.group[i].numero+"><i class=\"material-icons\" style=\"color:rgba(84, 59, 121, 0.8);margin-top:-2px;\" aria-hidden=\"true\">group_work</i>"+answer.group[i].name+"<font style=\"display:none;\">"+answer.group[i].name+"</font></a></li>");*/
	  						}
						    $('#group_list').find('a').on('click', function(event){
					    		event.preventDefault();
					    		$('#file_title').html(language.welcome_msg);
					    		//alert($(this).text());
					    		$('#group_text_name').html($(this).children('font').text()+'');
					    		$('#group_number').val($(this).attr('number'));
					    		loadGroupInfos({groupNumber:$(this).attr('number'), lang:$lang});
					    		//loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
						    });	  						
	  					}
	  				}else if(answer.tag == 'not_found'){
	  					$('#group_list, #loading_icon_gif').slideUp('slow', function(){
	  						$('#writeHtml').html("<i class='material-icons' style='float:left;margin-top:-1px;color:rgba(255, 255, 255, 0.5);'>warning</i> "+answer.message);
	  						$('#not_group_bloc').slideDown('slow');
	  					});
	  				}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function loadUserGroupsToAdd(json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/load_user_groups',
	  			type:'POST',
	  			data:json,
	  			beforeSend:function(){
	  				$('#load_group_list').attr('align', 'center');
	  				$('#load_group_list').html('<img src="../images/indicator.gif" id="loading_icon_gif">');
	  			},
	  			success:function (answer){
	  				//alert(JSON.stringify(answer));
	  				if(answer.tag === 'success'){
	  					if(answer.group.length > 0){
	  						$('#load_group_list').empty();
	  						$('#load_group_list').attr('align', 'left');
	  						for (var i = 0; i < answer.group.length; i++) {
	  						    $('#load_group_list').append('<p>\n' +
                                    '      <input class="with-gap" name="group1" type="radio" id="radio_'+answer.group[i].numero+'" number="'+answer.group[i].numero+'" />\n' +
                                    '      <label for="radio_'+answer.group[i].numero+'">'+answer.group[i].name+'</label>\n' +
                                    '    </p>');
	  							/*$('#load_group_list').append('<div class="radio radio-primary">\
					                <label>\
					                  <input type="radio" name="optionsRadios" number='+answer.group[i].numero+' id="optionsRadios1" value="option1" checked=""><span class="circle"></span><span class="check"></span>'+answer.group[i].name+'</label>\
					              </div>');*/
	  							//$('#load_group_list').append("<li><a href=\"#\" number="+answer.group[i].numero+">"+answer.group[i].name+"</a></li>");
	  						}
						    $('#load_group_list').find('input[type=radio]').on('click', function(event){
					    		//event.preventDefault();
					    		/*$('#file_title').html(language.welcome_msg);
					    		
					    		$('#group_text_name').html($(this).text()+'');*/
					    		//alert($(this).attr('number'));
					    		$('#group_number').val($(this).attr('number'));
					    		//loadGroupInfos({groupNumber:$(this).attr('number'), lang:$lang});
					    		//loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
						    });
	  					}
	  				}else if(answer.tag === 'not_found'){
	  					$('#load_group_list').attr('align', 'center');
	  					$('#load_group_list').html("<i class='material-icons' style='float:left;margin-top:-1px;color:rgba(255, 255, 255, 0.5);'>warning</i> "+answer.message);
	  				}else if(answer === 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function changePasswordRequest (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/change_password',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag == 'success'){
	  					alert(answer.message);
	  					$oldPassword.val('');
	  					$newPassword.val('');
	  					$confirmPass.val('');
	  					$('#password_block').slideUp('slow', function(){
							$('html, body').animate({scrollTop : 0},800);
						});
	  				}else if(answer.tag == 'warning'){
	  					alert(answer.message);
	  				}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function updateInvitationStatus (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/update_invitation_status',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag === 'success'){
	  					if(json.status === 'rejected'){
		  					if($lang === 'fr')
		  						alert(language.rejectedMessage);
		  					else if($lang === 'en')
		  						alert(language.rejectedMessage);
		  					loadUserInvitation({lang:$('html').attr('lang')});
		  				}else if(json.status === 'agreed'){
		  					if($lang === 'fr')
		  						alert(language.agreedMessage);
		  					else if($lang === 'en')
		  						alert(language.agreedMessage);
		  					loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
		  					loadUserInvitation({lang:$('html').attr('lang')});
		  					if(socket !== null){
		  						if($mainController.socketConnected){
		  							socket.emit('addMeToRoom');
		  						}
		  					}
		  				}
	  				}else if(answer.tag === 'not_found'){
	  					alert(answer.message);
	  				}else if(answer.tag === 'exists'){
  						alert(language.existingMember);
  					}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function updateNotificationStatus (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/update_notification_status',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag == 'success'){
	  					if(getHost() === 'localhost'){
	  						console.info(answer.message);
	  					}
	  				}else if(answer.tag == 'not_found'){
	  					alert(answer.message);
	  				}else if(answer.tag == 'exists'){
  						alert(language.existingMember);
  					}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function changeUserRequest (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/update_user',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag == 'success'){
	  					alert(answer.message);
						$firstName.val(json.name);
						$lastName.val(json.lastname);
						$country.val(json.country);
						$date.val(json.date);
						$place.val(json.place);
						$('#pop').html('<img style="float:left;margin-top:8px;margin-right:2px;border-radius:50%;border-style: solid; border-width: 1px; border-color: white;" src="/profil" width="25" height="25"> <font> '+json.lastname+' '+json.name +'</font>')
						$('#font_name').text(json.name);
						$('#font_lastname').text(json.lastname);
						$('#font_country').text(json.country);
						$('#font_date_birth').text(json.date);
						$('#font_place_birth').text(json.place);
						$('#editing_block').slideUp('slow', function(){
							$('html, body').animate({scrollTop : 0},800);
						});
	  				}else if(answer.tag == 'warning'){
	  					alert(answer.message);
	  				}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function createGroupRequest (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/create_group',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag == 'success'){
	  					alert(answer.message);
				    	$('#inputGroupName').val('');
				    	$('#inputMember').val('');
	  					loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
	  				}else if(answer.tag == 'warning'){
	  					alert(answer.message);
	  				}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function createProjectRequest (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/create_project',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag === 'success'){
	  					alert(answer.message);
				    	$('#project_name').val('');
				    	$('#proj_desc').val('');
				    	$('#range_select').val('');
				    	$('#project_type_select').val('');
    					$('#load_group_list_container').slideUp('slow')
	  					getYourFiveProject(true);
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
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function getYourFiveProject(isFive) {
  		// body...
  		var json = {email:$('#inputEmail').val(), lang:$('html').attr('lang'), five:isFive};
  		try{
	  		$.ajax({
	  			url:'/get_last_project',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag == 'success'){
	  					//alert(answer.project);
	  						$('#your_last_projects').empty();
	  					if(answer.project.length > 0){
	  						if(isFive)
	  							$('#more_project').show('slide');
	  						else
	  							$('#more_project').slideUp('slow');
	  						for (var i = 0; i < answer.project.length; i++) {
	  							if(answer.project[i].type === 'individual')
	  								$('#your_last_projects').append("<li><a href=\"#\" desc="+answer.project[i].description.replace(/ /g,'%120')+" id="+answer.project[i].id+" date_created="+answer.project[i].date.replace(', ', '_')+" project_type="+language.individual_project+" number="+answer.project[i].user_id+">"+answer.project[i].name+"("+language.individual_project+")</a></li>");
	  							else if(answer.project[i].type === 'groupe')
	  								$('#your_last_projects').append("<li><a href=\"#\" desc="+answer.project[i].description.replace(/ /g,'%120')+" id="+answer.project[i].id+" date_created="+answer.project[i].date.replace(', ', '_')+" project_type="+language.group_project_text+" number="+answer.project[i].group_id+">"+answer.project[i].name+"("+language.group_project_text+")</a></li>");
	  						}
						    $('#your_last_projects').find('a').on('click', function(event){
					    		event.preventDefault();
					    		$mol = $(this).text().lastIndexOf('(');
					    		console.log($mol);
					    		var textProjectName = $(this).text().substring(0, $mol);
					    		//$('#file_title').html(textProjectName);
					    		$('#project_summary_view_info').empty();
					    		$('#group_icon').attr('src','/project/icon/'+$(this).attr('id'));
					    		$htmlSum = '<p><span  style="font-weight:bold;">'+language.create_project_input_name+' :</span> '+textProjectName+'</p><p><span style="font-weight:bold;">Type :</span> '+$(this).attr('project_type')+'</p><p><span  style="font-weight:bold;">'+language.creation_date_text+' :</span> '+$(this).attr('date_created').replace('_', ', ')+'</p><p><span style="font-weight:bold;">'+language.create_project_description+' :</span> '+$(this).attr('desc').replace(/%120/g, ' ')+'</p>';
					    		loadProjectFolder({groupNumber:$(this).attr('number'), id:$(this).attr('id')});
					    		$('#project_summary_view_info').append($htmlSum);
					    		$('#project_presentation, #summary_presentation, #group_presentation, #user_profil').slideUp('slow', function(){
					    			$('#project_summary_view').show('fade');
					    		});
					    		//alert(textProjectName);
					    		/*$('#group_text_name').html($(this).text()+'');
					    		$('#group_number').val($(this).attr('number'));
					    		loadGroupInfos({groupNumber:$(this).attr('number'), lang:$lang});*/
					    		//loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
						    });
	  					}else{
	  						$('#your_last_projects').append("<li>"+language.projects_not_found+"</li>");
	  						$('#more_project').hide('slide');
	  					}
	  				}else if(answer.tag == 'warning'){
	  					alert(answer.message);
	  				}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function getPublicProjects() {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/project/get_public_project',
	  			type:'GET',
	  			beforeSend:function(){},
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag == 'success'){
	  					//alert(answer.project);
	  					//$('#your_last_projects').empty();
	  					if(answer.project.length > 0){
	  						//$('#more_project').show('slide');
	  						for (var i = 0; i < answer.project.length; i++) {
	  							$('#public_project_loader').append('<h3 class="panel-title project_public_name" style="margin-left:10px;padding-left: 2px;padding-top: 2px;">'+answer.project[i].name+'</h3>\
						              <h6 class="panel-title" style="margin-left:15px;padding-left: 2px;padding-top: 2px;">Description:</h6>\
						              <p style="margin-left:30px;">'+answer.project[i].description+'</p>\
						              <hr class="featurette-divider">');
	  						}
	  					}else{
	  						$('#public_project_loader').append("<h1 class=\"panel-title\" style=\"padding-left: 2px;padding-top: 2px;\">"+language.no_public_project_text+"</h1>");
	  						//$('#more_project').hide('slide');
	  					}
	  				}else if(answer.tag == 'warning'){
	  					alert(answer.message);
	  				}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function loadGroupProjects(json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/project/get_group_projects',
	  			type:'POST',
	  			data:json,
	  			beforeSend:function(){},
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag == 'success'){
	  					//alert(JSON.stringify(answer.project));
	  					//$('#your_last_projects').empty();
	  					if(answer.project){
	  						if(answer.project.length > 0){
	  							$('#group_project_list').empty();
	  							$('#group_project_count').text(answer.project.length);
	  							for (var i = 0; i < answer.project.length; i++) {
	  								//console.error(JSON.stringify(answer.project[i]));
	  								//var lmk = answer.members[i].split(',');
		  							$('#group_project_list').append('<li><a href=\"#\" desc="'+answer.project[i].description.replace(/ /g,'%120')+'" id="'+answer.project[i].id+'" date_created="'+answer.project[i].date.replace(', ', '_')+'" project_type="'+language.group_project_text+'" number="'+answer.project[i].group_id+'"><img style="margin-top:-5px;margin-right:2px;border-radius:50%;border-style: solid; border-width: 1px; border-color: white;" src="/project/icon/'+answer.project[i].id+'" width="25" height="25">'+answer.project[i].name+'</a></li>');
		  						}
		  						/*$('#group_project_list').append('<li><img style="margin-top:-5px;margin-right:2px;border-radius:50%;border-style: solid; border-width: 1px; border-color: white;" src="/profil" width="25" height="25">'+answer.member+'</li>');*/
		  						$('#group_project_list').find('a').on('click', function (event){
		  							event.preventDefault();
		  							//alert($(this).text());
						    		$mol = $(this).text();
						    		//console.log($mol);
						    		var textProjectName = $(this).text();
						    		//$('#file_title').html(textProjectName);
						    		$('#project_summary_view_info').empty();
						    		$('#group_icon').attr('src','/project/icon/'+$(this).attr('id'));
						    		$htmlSum = '<p><span  style="font-weight:bold;">'+language.create_project_input_name+' :</span> '+textProjectName+'</p><p><span style="font-weight:bold;">Type :</span> '+$(this).attr('project_type')+'</p><p><span  style="font-weight:bold;">'+language.creation_date_text+' :</span> '+$(this).attr('date_created').replace('_', ', ')+'</p><p><span style="font-weight:bold;">'+language.create_project_description+' :</span> '+$(this).attr('desc').replace(/%120/g, ' ')+'</p>';
						    		$('#project_summary_view_info').append($htmlSum);
						    		loadProjectFolder({groupNumber:$(this).attr('number'), id:$(this).attr('id')});
						    		$('#project_presentation, #summary_presentation, #group_presentation, #user_profil').slideUp('slow', function(){
						    			$('#project_summary_view').show('fade');
						    		});
		  						});
	  						}
	  					}else{
  							$('#group_project_count').text('0');
  							$('#group_project_list').empty();
  							$('#group_project_list').append('<li>'+language.no_public_project_text+'</li>');
  						}
	  				}else if(answer.tag == 'not_found'){
	  					$('#group_project_count').text('0');
  							$('#group_project_list').empty();
  							$('#group_project_list').append('<li>'+language.no_public_project_text+'</li>');
	  				}else if(answer.tag == 'warning'){
	  					alert(answer.message);
	  				}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				console.error(JSON.stringify(err));
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}

  	function loadProjectFolder(json) {
  		// body...
  		try{
  			$mainController.currentProjectId = json.id;
  			$mainController.currentNumber = json.groupNumber;
  			$.ajax({
  				url:'/project/files/get_project_folder',
  				type:'POST',
  				data:json,
  				beforeSend:function(){
					$('#project_folder_list').empty();
					$('#project_folder_list').append('<li class="disabled"><i class="material-icons" style="float: left;color:#543b79;">keyboard_arrow_down</i><i class="material-icons" style="float: left;color:#543b79;">folder</i> root</li>')
					$('#project_folder_list').append('<li style="margin-left:10px;">'+language.loading_text+'</li>')
  				},
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer.tag === 'success'){
  						//alert('hummm');
  						$('#project_folder_list').empty();
						$('#project_folder_list').append('<li class="disabled"><i class="material-icons" style="float: left;color:#543b79;">keyboard_arrow_down</i><i class="material-icons" style="float: left;color:#543b79;">folder</i> root</li>')
  						if(answer.folder){
  							if(answer.file.length > 0){
  								for (var i = 0; i < answer.file.length; i++) {
  									console.log(answer.file[i]);
  									if(answer.file[i].isDirectory){
  										$('#project_folder_list').append('<li style="margin-left:10px;" directory="'+answer.file[i].isDirectory+'"><i class="material-icons" style="float: left;color:#543b79;">keyboard_arrow_down</i><i class="material-icons" style="float: left;color:#543b79;">folder</i> '+answer.file[i].filename+'<ul><li>Test encore</li></ul></li>');
  									}else{
  										$('#project_folder_list').append('<li style="margin-left:10px;" directory="'+answer.file[i].isDirectory+'"><a href="#"><i class="material-icons" style="float: left;color:#543b79;">insert_drive_file</i> <span>'+answer.file[i].filename+'</span></a></li>')
  									}
  								}
  								$('#project_folder_list').find('a').on('click', function (event){
		  							event.preventDefault();
		  							$('#project_file_view_info').load('/load_file/'+$mainController.currentProjectId+'_'+$mainController.currentNumber+'/'+$(this).children('span').text(), function(page, status){
      									if(status === 'success'){
      										$('#project_file_view_info').html('');
      										$('#project_file_view_info').html('<pre>'+page+'</pre>');
      										console.log(page);
      									}
		  							});
		  							//alert($(this).children('span').text());
		  							//$('#filename_title_view').html($(this).children('span').text());
		  						});
  							}
  						}
  					}else if(answer.tag === 'not_found'){
  						alert(answer.message);
  					}else if(answer.tag === 'exists'){
  						alert(language.existingMember);
  					}else if(answer === 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
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

  	function addMemberRequest(json) {
  		// body...
  		try{
  			$.ajax({
  				url:'/add_new_member',
  				type:'POST',
  				data:json,
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer.tag == 'success'){
  						alert(answer.message);
  					}else if(answer.tag == 'not_found'){
  						alert(answer.message);
  					}else if(answer.tag == 'exists'){
  						alert(language.existingMember);
  					}else if(answer == 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
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
  				url:'/load_app_language',
  				type:'POST',
  				data:json,
  				success:function(answer){
  					//alert(JSON.stringify(answer));
  					if(answer === 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}else{
  						console.log(JSON.stringify(answer));
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

  	function deleteAccountRequest (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/delete_account',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag === 'success'){
	  					alert(answer.message);
	  					if($('html').attr('lang') === 'fr')
							window.setTimeout("location=('/fr/connected');", 100);
						else if($('html').attr('lang') === 'en')
							window.setTimeout("location=('/connected');", 100);
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
	  			}
	  		})
	  	}catch(ex){
	  		console.error(JSON.stringify(ex));
	  	}
  	}
  	function deleteProjectRequest (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/project/delete_project',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag === 'success'){
	  					alert(language.group_deleted);
	  					getYourFiveProject(true);
			    		$('#project_summary_view, #summary_presentation, #group_presentation, #user_profil').slideUp('slow', function(){
			    			$('#project_presentation').show('fade');
			    		});
	  				}else if(answer.tag === 'warning'){
	  					alert(language.error_text);
	  				}else if(answer === 'session_expired'){
	  					setInterval(function(){
				            decompte('restart_warning');
				        },1000)
	  				}
	  			},
	  			error:function(err){
	  				//console.error(JSON.stringify(err));
	  				alert(language.error_text);
	  			}
	  		})
	  	}catch(ex){
	  		//console.error(JSON.stringify(ex));
	  		alert(language.error_text);
	  	}
  	}
  	function changePhotoRequest (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/update_profil_photo',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag === 'success'){
	  					alert(answer.message);
	  					$('#photo_block').slideUp('slow', function(){
	  						$('#big_pic, #sm_pic').attr('src', '../images/indicator.gif');
	  						setTimeout(function() {
	  							$('#big_pic, #sm_pic').attr('src', '/profil?'+Math.floor(Math.random() * (99999999 - 100000 + 10000000)+10000000));
	  							$('#photo_valid, #left_rotation, #right_rotation').prop('disabled', true);
	  						}, 2000);
							$('html, body').animate({scrollTop : 0},800);
							try{
								var viewport = document.getElementById('viewport');
								var context = viewport.getContext('2d');
								var base_image = new Image();
								base_image.src = '../images/lg_logo.png';
								base_image.onload = function(){
									viewport.width = 602;
									viewport.height = 500;
									context.drawImage(base_image, 0, 0, 602, 602 * viewport.height/viewport.width);
								}
								$('#target').attr('src', '../images/lg_logo.png');
								$('#inputFile4').val('');
							}catch(ex){
								//Nothing
							}
						});
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

  	function changeProjectPhotoRequest (json) {
  		// body...
  		try{
	  		$.ajax({
	  			url:'/update_project_photo',
	  			type:'POST',
	  			data:json,
	  			success:function (answer){
	  				//alert(answer);
	  				if(answer.tag == 'success'){
	  					alert(answer.message);
	  					//alert(answer.projectId);
	  					$('#group_icon').attr('src', '../images/indicator.gif');
	  					setTimeout(function() {
		  					//$('#group_icon').attr('src', '/project/new_icon/'+answer.projectId);
		  					$('#group_icon').attr('src','/project/icon/'+answer.projectId+'?'+generateStamp());
		  					$('#inputFile5').val('');
  						}, 1500);
	  				}else if(answer.tag == 'warning'){
	  					alert(answer.message);
	  				}else if(answer == 'session_expired'){
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


  	function getHost () {
		// body...
		return window.location.host;
	}
	var compte = 5;
	var temps = 5000;
	function decompte(id_tag){
		if(compte <= 1) {
			pluriel = "";
		} else {
			pluriel = "s";
		}
		$('#'+id_tag).fadeIn('slow');
		$('html, body').animate({scrollTop : 0},800);
		if($('html').attr('lang') === 'fr')
			document.getElementById(id_tag).innerHTML = "<p><i style='float:left;' class=\"material-icons\">warning</i> Votre session a expiré, la rédirection sera fait dans "+compte + " seconde" + pluriel+"</p>";
		else if($('html').attr('lang') === 'en')
			document.getElementById(id_tag).innerHTML = "<p><i style='float:left;' class=\"material-icons\">warning</i> Your session expired, redirection remaining "+compte + " seconde" + pluriel+"</p>";

		if(compte === 0 || compte < 0) {
			compte = 0;
			if($('html').attr('lang') === 'fr')
				window.setTimeout("location=('/fr/connected');", 100);
			else if($('html').attr('lang') === 'en')
				window.setTimeout("location=('/connected');", 100);
		}
		compte--;
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

	function scroll (argument) {
		// body...
		//$('.scrollToTop').tooltip({ placement:'bottom' }); 
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('.scrollToTop').fadeIn();
				//$('#generer').show('drop', 500)
			} else {
				$('.scrollToTop').fadeOut();
				//$('#generer').hide('drop', 500)
			}
		});

		//Click event to scroll to top
		$('.scrollToTop').click(function(event){
			event.preventDefault();
		$('html, body').animate({scrollTop : 0},800);
		return false;
		});
	}
	function emojiRender (e) {
		// body...
		e.find('img').each(function(){
			//log($(this))
			var mainLink = $(this).attr('src').split('/');
			var emoji = mainLink[mainLink.length - 1];
			$(this).attr('width', 20);
			$(this).attr('height', 20);
			$(this).attr('src', 'http://'+window.location.host.replace(':2212','')+'/stone/stnext/img/emoticons/'+emoji);
		});
	}
	function addSpace (key) {
		// body...
		var num = key;
		var result = "";
		var gap_size = 3; //Desired distance between spaces

		while (num.length > 0) // Loop through string
		{
		    result = result + " " + num.substring(0,gap_size); // Insert space character
		    //num = num.substring(gap_size);  // Trim String
		}
		console.info(result)
		return result;
	}
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
		})
	  }else{
	    obj.html($fullText)
	  }
	}

	$mainController = {
		isAdminChecking:false,
		currentProjectId:0,
		socketConnected:false
	};
	
	
	
	scroll();
	emojiRender($('.project_public_name'));
	loadUserGroups({email:$('#inputEmail').val(), lang:$('html').attr('lang')});
	loadUserInvitation({lang:$('html').attr('lang')});
	loadUserNotification({lang:$('html').attr('lang')});
	loadAppLanguage({lang:$('html').attr('lang')});
	loadAppLink({lang:$('html').attr('lang')});
	makeTruncate($('#add_text_more'), 100, 'Lire la suite');
	makeTruncate($('#add_text_mores'), 50, 'More')
	getYourFiveProject(true);
	getPublicProjects();

	$('.scrollToTop').mouseover(function(){
		$('.scrollToTop').animate({
			backgroundColor: '#543b79',
			color:'#d1caca',
			borderColor: '#543b79'
		}, 200);
		$('#scroll_arrow').animate({
			color:'#d1caca'
		}, 200);
	});
	$('.scrollToTop').mouseout(function(){
		$('.scrollToTop').animate({
			backgroundColor: 'transparent',
			color:'#543b79',
			borderColor: '#543b79'
		}, 200);
		$('#scroll_arrow').animate({
			color:'#543b79'
		}, 200);
	});

function formatBytes (bytes, decimals) {
  // body...
  if (bytes == 0) return '0 Byte';
  var k = 1024;
  var dm = decimals + 1 || 3;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  var i = Math.floor(Math.log(bytes)/Math.log(k));
  return (bytes/Math.pow(k, i)).toPrecision(dm)+ ' '+ sizes[i];
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
			[1209600, language.last_weeks_text, language.next_month_text],
			[2419200, language.weeks_text, 604800],
			[4838400, language.last_month_texts, language.next_month_texts],
			[29030400, language.months_texts, 2419200],
			[58060800, language.last_year_texts, language.next_year_texts],
			[2903040000, language.years_texts, 29030400],
			[5806080000, language.last_century_texts, language.next_century_texts],
			[5806080000, language.centuries_texts, 2903040000]
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
				if(typeof format[2] == 'string'){
					//alert(format[list_choice]);
					return format[list_choice];
				}
				else{
					return $('html').attr('lang') === 'fr' ? token + ' '+Math.floor(seconds / format[2]) + ' '+ format[1] : Math.floor(seconds / format[2]) + ' '+ format[1] + ' '+ token;
				}
			}
			return time;
	}

function generateStamp() {
	// body...
	return Math.floor(Math.random() * (99999999 - 100000 + 10000000)+10000000);
}
    $(window).scroll(function() {
        if($(window).scrollTop() === $(document).height() - $(window).height()) {
            // ajax call get data from server and append to the div
            console.info('can scroll ? -> '+$(window).scrollTop() === $(document).height() - $(window).height());
        }
    });
});
//formatPrice('14563214');
String.prototype.reverse = function() {
	  // body...
	  return this.split('').reverse().join('');
	};
	function formatPrice(price) {
	    return reversing(price).replace(/((?:\d{2})\d)/g, '$1 ').reversing(price);
	}function reversing (text) {
		// body...
		var lopm = text.split('');

		return reversing(lopm).join('');
	}