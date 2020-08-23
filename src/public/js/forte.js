$('#pass').keyup(function(e) {
     var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
     var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
     var enoughRegex = new RegExp("(?=.{6,}).*", "g");
//      var p1 = document.getElementById("pass").value;
//      var p2 = document.getElementById("pass1").value;
     if (false == enoughRegex.test($(this).val())) {
             $('#passstrength').html('Ingresa más carácteres');
             $("#passstrength").css({"color":"red"});
     } else if (strongRegex.test($(this).val())) {
             $('#passstrength').className = 'ok';
             $('#passstrength').html('Contraseña Fuerte');
             $("#passstrength").css({"color":"#00549B"});
     } else if (mediumRegex.test($(this).val())) {
             $('#passstrength').className = 'alert';
             $('#passstrength').html('Contraseña Media');
             $("#passstrength").css({"color":"green"});
     } else {
             $('#passstrength').className = 'error';
             $('#passstrength').html('¡Contraseña Débil!');
             $("#passstrength").css({"color":"red"});
     }
     return true;
});