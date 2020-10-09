/*Index js file*/

/*
 *  @Vérifie: Fichier principal sur la gestion de la page[Home];
 *  @Auteur : Henock Bongi[HBI];
 *  @date   : 06, Septembre, 2017;
 */

// JavaScript Document
$(document).ready(function(){
    setTimeout(autoplay, 4500);
    function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 4500);
    }
	var language = {};
	/**********************************/
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
				        },1000)
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
	function getPublicProjects() {
        // body...
        try{
          $.ajax({
            url:'/project/home_page/get_public_project',
            type:'GET',
            beforeSend:function(){},
            success:function (answer){
              //alert(answer);
              if(answer.tag === 'success'){
                //alert(answer.project);
                //$('#your_last_projects').empty();
                if(answer.project.length > 0){
                  //$('#more_project').show('slide');
                  for (var i = 0; i < answer.project.length; i++) {
                    $('#public_project_loader').append('<div class="col-lg-4" style="color: #fff;" align="center">\
			          <img class="img-circle" src="/project/icon/'+answer.project[i].id+'" alt="Generic placeholder image" width="140" height="140">\
			          <h2>'+answer.project[i].name+'</h2>\
			          <p>'+answer.project[i].description+'</p>\
			          <p><a class="btn btn-secondary" href="#" role="button" style="color: #fff;">'+language.view_details_text+' &raquo;</a></p>\
			        </div>');
                  }
                }else{
                  $('#public_project_loader').append("<h1 class=\"panel-title\" style=\"padding-left: 2px;padding-top: 2px;\">"+language.no_public_project_text+"</h1>");
                  //$('#more_project').hide('slide');
                }
              }else if(answer.tag === 'not_found'){
                $('#public_project_loader').append("<h1 align=\"center\" class=\"panel-title\" style=\"padding-left: 2px;padding-top: 2px;color: #fff;\">"+language.no_public_project_text+"</h1>");
              }else if(answer.tag === 'warning'){
                alert(answer.message);
              }else if(answer === 'session_expired'){
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
	loadAppLanguage({lang:$('html').attr('lang')});
    getPublicProjects();
});