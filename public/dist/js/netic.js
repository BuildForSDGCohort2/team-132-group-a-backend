$(document).ready(function () {
    $('#loader').delay(500).fadeOut('slow');
    $("#pl").dropdown();
    $('.modal').modal();
    $('#searching_button, #searching_button_mobile').click(function (e) {
        e.preventDefault();
        //alert('BGO');
        $('#header_header').slideUp('slow', function () {
            $('#search_header').slideDown('slow', function () {});
            /*setTimeout(function () {
                $('#search_header').slideUp('slow', function () {
                    $('#header_header').slideDown('slow', function () {});
                });
            }, 5000);*/
        });
    });
    $('#close_search').click(function (e) {
        e.preventDefault();
        $('#search_header').slideUp('slow', function () {
            $('#header_header').slideDown('slow', function () {});
        });
    });
    $('#send_problem').click(function (e) {
        e.preventDefault();
        let $name = $('#problem_name').val() || 'Anonymes';
        let $email = $('#email').val();
        let content = $('#textArea').val();
        //alert($name);
        if($email.match(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}/)) {
            if (content !== '') {
                let sendData = {
                    name: $name,
                    email: $email,
                    content: content
                };
                $(this).prop('disabled', true);
                requestLauncher('/public/ajax/signal/problem/create.ntc', 'post', sendData, function (state, tag, data) {
                    if (state) {
                        if (tag === 'success') {
                            $('#problem_name').val('');
                            $('#email').val('');
                            $('#textArea').val('');
                            $('#send_problem').prop('disabled', false);
                            $('#publish_message').slideDown('slow');
                            setTimeout(function () {
                                $('#publish_message').slideUp('slow', function () {
                                    $('.modal').modal('close');
                                });
                            }, 3000);
                        }else if(tag === 'warning'){
                            alert(data.message);
                            $('#send_problem').prop('disabled', false);
                        }
                    }
                });
            } else {
                alert('Le contenu ne peut être vide.');
                return false;
            }
        }else{
            alert('L\'adresse mail n\'est pas correcte');
            return false;
        }
    });
});