$(document).ready(function(){
    $("#login").submit(function(){
        $.post("/login" , { 'username' : $("#username").val() ,'password' :  $("#password").val() } , function ( data) {
       if ( data['status']== 'false')
       {
           if ( data['msg']== 'undefined user')
               alert('undefined user');
           else
               alert('incorrect password');
       }
       else
       {
                 alert('your information is correct');
       }
    });
    });
});