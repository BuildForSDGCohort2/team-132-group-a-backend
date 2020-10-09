/*Sign up js file*/

/*
 *  @Vérifie: l'adresse mail et le mot de passe sont bien entrés;
 *  @Auteur : Henock Bongi[HBI];
 *  @date   : 24, Décembre, 2016;
 */

// JavaScript Document
$(document).ready(function(){        

   var $pseudo = $('#nom'),
       $prenom = $('#prenom'),
       $mdp = $('#inputPassword'),        
	   $confirmation = $('#focusedInput2'),        
	   $mail = $('#inputEmail'), 
	   $phone = $('#numPhone'),
	   $account = $('#numCompte'),
	   $envoi = $('#button'),        
	   $reset = $('#cancel'),        
	   $erreur = $('#erreur'),        
	   $champ = $('#matricule, #prenom'), $pseudo; 
	
    $mail.keyup(function(){
		if($(this).val().match(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}/)){
			$(this).css({
				color : 'green'
			});
		}else{
			$(this).css({
				color : 'red'
			});
		}
	});

	$mdp.keyup(function(){
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
					
	$confirmation.keyup(function(){        
	   if($(this).val() != $mdp.val()){ // si la confirmation est différente du mot de passe            
		   $(this).css({ // on rend le champ rouge
			   color : 'red'     
		  	});
			if($('#page_language').val() == 'fr'){
				$('#confirm_password_help').text('Mot de passe non identique.');
			}else if($('#page_language').val() == 'en'){
				$('#confirm_password_help').text('Password does not match.');
			}
			$('#confirm_password_help').css({color:'red'})
	 	} else{     
		    $(this).css({ // si tout est bon, on le rend vert
				color : 'green'
			});
			if($('#page_language').val() == 'fr'){
				$('#confirm_password_help').text('Mot de passe identique.');
			}else if($('#page_language').val() == 'en'){
				$('#confirm_password_help').text('Password matched.');
			}
			$('#confirm_password_help').css({color:'green'})
	    }
  	});
});