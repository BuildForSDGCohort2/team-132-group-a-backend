/*Index js file*/

/*
 *  @Vérifie: Fichier principal sur la gestion de la page[Community_Home];
 *  @Auteur : Henock Bongi[HBI];
 *  @date   : 28, Octobre, 2017;
 */

// JavaScript Document
$(document).ready(function(){
	var language = {};
	var link = {};
	(function(){
		var bsa = document.createElement('script');
		bsa.type = 'text/javascript';
		bsa.async = true;
		bsa.src = '../dist/js/RequestHandler.js?'+Math.floor(Math.random() * (999999999 - 100000000 + 100000000) + 100000000);
		bsa.onload = function(){
			//alert('loaded!');
			requestLauncher('/community/best.do', 'get', null, function(state, tag, data){
				if(state){
					if(tag.toLowerCase() === 'success'){
			     		//alert(language.create_community_success_text);
			     		//console.log(data.community[0]);
			     		if(data.community.length > 0){
			     			$('#menu_horizontal').empty();
			     			for (var i = 0; i < data.community.length; i++) {
			     				//data.community[i]//
								if(data.community[i].nom.length > 8){
									$suspend = '...';
									$subs = data.community[i].nom.substring(0, 8);
				     				$tmplate = '<li>\
					                  <figure class="book">\
					                    <h5 class="panel-title" align="center" style="background-color:rgba(0, 0, 0, 0.5);color:white;padding-left: 2px;padding-top: 2px;">'+$subs+$suspend+'</h5>\
					                    <img title="#" alt="" src="/images/city.jpg" class="img-thumbnail">\
					                    <figcaption>'+data.community[i].votes+'</figcaption>\
					                    <figcaption>\
					                      <button id="search_button" type="button" class="btn btn-secondary btn-sm" style="padding: 2px;margin:2px;">\
					                        <i class=\'material-icons\' style=\'color:#fff;\'>exit_to_app</i>\
					                      </button>\
					                      <a class="btn btn-raised btn-primary btn-block waves-effect waves-light" href="/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.community[i].canonical+'" role="button" style="padding: 2px;margin:2px;"><i class=\'material-icons\' style=\'color:#fff;;\'>info</i></a>\
					                    </figcaption>\
					                  </figure>\
					                </li>';
				     				$('#menu_horizontal').append($tmplate);
				     			}else{
				     				$tmplate = '<li>\
					                  <figure class="book">\
					                    <h5 class="panel-title" align="center" style="background-color:rgba(0, 0, 0, 0.5);color:white;padding-left: 2px;padding-top: 2px;">'+data.community[i].nom+'</h5>\
					                    <img title="#" alt="" src="/images/city.jpg" class="img-thumbnail">\
					                    <figcaption>'+data.community[i].votes+'</figcaption>\
					                    <figcaption>\
					                      <button id="search_button" type="button" class="btn btn-raised btn-primary waves-effect waves-light" style="padding: 2px;margin:2px;">\
					                        <i class=\'material-icons\' style=\'color:#fff;\'>exit_to_app</i>\
					                      </button>\
					                      <a class="btn btn-raised btn-primary btn-block waves-effect waves-light btn-sm" href="/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.community[i].canonical+'" role="button" style="padding: 2px;margin:2px;"><i class=\'material-icons\' style=\'color:#fff;;\'>info</i></a>\
					                    </figcaption>\
					                  </figure>\
					                </li>';
				     				$('#menu_horizontal').append($tmplate);
				     			}
			     			}
			     		}
					}else if(tag === 'warning'){
						alert(language.error_text);
					}else if(tag === 'session_expired'){
						setInterval(function(){
				            decompte('restart_warning');
				        },1000)
					}
				}
			});
			loadTags();
			//loadBestCommunities();
			loadUserCommunities();
			loadLatestNews();
		};
		document.body.appendChild(bsa);
	})();

	$('#tags_input').typeahead({
        name: 'tags',
        remote: '/hashtag/autocomplete.do?key=%QUERY',
        limit: 10,
    });

	$('#tags_input').keyup(function(e){
		//console.log(e.which);
		if(e.which === 188 || e.which === 190){
			if($(this).val().length > 0 && $(this).val() !== ',' && $(this).val() !== ';'){
				$('#tags_list').append('<li class="badge_disabled">'+$(this).val().replace(';', '').replace(',', '')+'</li>');
				$(this).val('');
			}else{
				$(this).val('');
			}
		}
	});
	$('#tags_list').on('click', 'li', function(event){
		$(this).remove();
	});

	$('#createCommunity').click(function(){
		//alert('frg');
		$tab = [];
		$json = {};
		if($('#community_name').val().length > 0){
			if($('#description').val().length > 0){
				$json.communityName = $('#community_name').val();
				$json.description = $('#description').val();
				$json.tags = 'none';
				$('#tags_list').find('li').each(function(){
					//console.log($(this).text());
					$tab.push(replaceDiacritics( $(this).text() ));
				});
				//console.log($('#tags_list').find('li').text());
				setTimeout(function(){
					if($tab.length > 0){
						$json.tags = $tab;
						//alert(JSON.stringify($json));
						$('#community_name, #description, #tags_input').val('');
						$('#tags_list').empty();
						requestLauncher('/community/create.do', 'post', $json, function(state, tag, data){
							if(state){
								if(tag.toLowerCase() === 'success'){
						     		/*log(tag);
						     		log(data);*
						     		loadUserCommunities();*/
						     		alert(language.create_community_success_text);
						     		//if($('html').attr('lang').toLowerCase() === 'fr')
									window.setTimeout("location=('http://"+window.location.host+'/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.community+"');", 500);
								}else if(tag === 'warning'){
									alert(language.error_text);
								}else if(tag === 'session_expired'){
									alert(language.error_text);
								}
							}
						});
					}else{
						alert('add at least one tag');
						return false;
					}
				},2000);
			}
		}
	});
	/*$('#follow_task').click(function(){
		alert($(this).attr('comId'));
	});*/
	/**********************************/
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
		[60, 'seconds', 1], //60
		[120, '1 minute ago', '1 minute from now'],
		[3600, 'minutes', 60],
		[7200, '1 hour ago', '1 hour from now'],
		[86400, 'hours', 3600],
		[172800, 'Yesterday', 'Tomorrow'],
		[604800, 'days', 86400],
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
		var token = 'ago';
		list_choice = 1;

		if(seconds === 0){
			return 'Just now';
		}
		if(seconds < 0){
			seconds = Math.abs(seconds);
			token = 'from now';
			list_choice = 2;
		}
		var i = 0;
		format;
		while (format = time_formats[i++])
			if(seconds < format[0]){
				if(typeof format[2] == 'string')
					return format[list_choice];
				else
					return Math.floor(seconds / format[2]) + ' '+ format[1] + ' '+ token;
			}
			return time;
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
  	function loadUserCommunities() {
        if($('html').attr('session') === 'true'){
            requestLauncher('/community/load_user_communities.tsl', 'get', null, function(state, tag, data){
                if(state){
                    if(tag.toLowerCase() === 'success'){
                        //alert(language.create_community_success_text);
                        //console.log(data.tagList);
                        if(data.communities.length > 0){
                            for (var i = 0; i < data.communities.length; i++) {
                                $('#communities_block_list').append('<li><a href="/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.communities[i].canonical+'">'+data.communities[i].nom+'</a></li>');
                            }
                            /*$badge = $('.badge');
                           $badge.mouseover(function(){
                               $(this).animate({
                                   backgroundColor: '#543b79',
                                   color:'#fff',
                                   borderColor: '#543b79'
                               }, 200);
                           });
                           $badge.mouseout(function(){
                               $(this).animate({
                                   backgroundColor: '#FFFFFF',
                                   color:'#272727',
                                   borderColor: '#ebebeb'
                               }, 200);
                           });*/
                        }
                    }else if(tag === 'warning'){
                        alert(language.error_text);
                    }else if(tag === 'session_expired'){
                        setInterval(function(){
                            decompte('restart_warning');
                        },1000)
                    }
                }
            });
        }
    }
    function loadBestCommunities() {
        requestLauncher('/community/load_suggest.tsl', 'get', null, function(state, tag, data){
            if(state){
                if(tag.toLowerCase() === 'success'){
                    //alert(language.create_community_success_text);
                    //console.log(data.tagList);
                    console.log(data.communities.length);
                    if(data.communities.length > 0){
                    	if(data.communities.length < 5){
                            for (var i = 0; i < 4; i++) {
                                $('#suggestion_block_list').append('<li><a href="/'+link.forum_home_link+'/'+link.forum_overview_link+'/'+data.communities[i].canonical+'">'+data.communities[i].nom+'</a></li>');
                            }
						}else {
                            for (var i = 0; i < 5; i++) {
                                $('#suggestion_block_list').append('<li><a href="/' + link.forum_home_link + '/' + link.forum_overview_link + '/' + data.communities[i].canonical + '">' + data.communities[i].nom + '</a></li>');
                            }
                        }
                        /*$badge = $('.badge');
                       $badge.mouseover(function(){
                           $(this).animate({
                               backgroundColor: '#543b79',
                               color:'#fff',
                               borderColor: '#543b79'
                           }, 200);
                       });
                       $badge.mouseout(function(){
                           $(this).animate({
                               backgroundColor: '#FFFFFF',
                               color:'#272727',
                               borderColor: '#ebebeb'
                           }, 200);
                       });*/
                    }
                }else if(tag === 'warning'){
                    alert(language.error_text);
                }else if(tag === 'session_expired'){
                    setInterval(function(){
                        decompte('restart_warning');
                    },1000)
                }
            }
        });
    }
    function loadTags() {
        requestLauncher('/community/load_tags.do', 'get', null, function(state, tag, data){
            if(state){
                if(tag.toLowerCase() === 'success'){
                    //alert(language.create_community_success_text);
                    //console.log(data.tagList);
                    if(data.tagList.length > 0){
                        for (var i = 0; i < data.tagList.length; i++) {
                            $('#tags_block_list').append('<a href="/hashtag/'+data.tagList[i].hashtag+'" class="badge">'+data.tagList[i].hashtag.toUpperCase()+'</a>');
                        }
                        $badge = $('.badge');
                        $badge.mouseover(function(){
                            $(this).animate({
                                backgroundColor: '#543b79',
                                color:'#fff',
                                borderColor: '#543b79'
                            }, 200);
                        });
                        $badge.mouseout(function(){
                            $(this).animate({
                                backgroundColor: '#FFFFFF',
                                color:'#272727',
                                borderColor: '#ebebeb'
                            }, 200);
                        });
                    }
                }else if(tag === 'warning'){
                    alert(language.error_text);
                }else if(tag === 'session_expired'){
                    setInterval(function(){
                        decompte('restart_warning');
                    },1000)
                }
            }
        });
    }
    function loadLatestNews() {
        requestLauncher('/community/articles/latest/load.tsl', 'get', null, function(state, tag, data){
            if(state){
                if(tag.toLowerCase() === 'success'){
                    //alert(language.create_community_success_text);
                    console.log(data.articles);
                    if(data.articles.length > 0){
                        $('#latest_articles_id').empty();
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
                    setInterval(function(){
                        decompte('restart_warning');
                    },1000)
                }
            }
        });
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
  	loadAppLanguage({lang:$('html').attr('lang')});
  	loadAppLink({lang:$('html').attr('lang')});
});