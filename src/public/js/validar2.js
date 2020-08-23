function entrar(){
    var usuario = $("#nombre").val();
    var pwd = $("#pass").val();

    $.ajax({
        type: "GET",
        url: "http://localhost:5050/webservice/"+usuario,
        success: function(data){
                validar(data,usuario,pwd);
                var vali = validar(data,usuario,pwd);
                if (vali){
                    registraSesion(usuario);
                }
        },
        error: function(data){
            alert("Error de conexión");
        }
    });
};


function validar(data,usuario,pwd){
    if(data.length<1){
        // alert("Datos incorrectos");
        $('#passstrength').html('Datos incorrectos, ingresa datos válidos');
        $("#passstrength").css({"color":"red"});
        return false;
    }
    else{
        
    if(usuario==data[0].nombre){
        var miHash = getHash("CIHEGD",data[0].nombre,pwd);
        // console.log(miHash);
        // console.log(data[0].HASH);
        if(miHash===data[0].HASH){
            // alert("Usuario Correcto, Bienvenido "+data[0].nombre); 
            return true;
        }else{
            // alert("Datos incorrectos");
            $('#passstrength').html('Datos incorrectos, ingresa datos válidos');
            $("#passstrength").css({"color":"red"});
            return false;
        }
    }
    }
};


function registraSesion(user){
    // var key = "abc" + user + "xyz";
    var key = getHash("abc",user,"xyz");
    var timestamp = new Date().getTime();
    localStorage.setItem("usuario",user);
    localStorage.setItem("key",key);
    localStorage.setItem("timestamp",timestamp);
    
    location.replace("index");   
};

function issecure(){
    var key = localStorage.getItem("key");
    var usuario = localStorage.getItem("usuario");
    var timestamp = localStorage.getItem("timestamp");
    document.getElementById("nombre").innerHTML = usuario;
    var ahora = new Date().getTime();
    var dif_mil = ahora-timestamp;
    console.log(ahora);
    console.log(dif_mil);
    // console.log(key);
    if(dif_mil>1500000){
        localStorage.setItem("timestamp",0);
        localStorage.setItem("key","");
        localStorage.setItem("usuario","");
        location.replace("/links/login");
    };
};


function logout(){
    localStorage.setItem("timestamp",0);
    localStorage.setItem("key","");
    localStorage.setItem("usuario","");
    location.replace("/links/login");
}

function getHash(salt,miUsuario,miPwd){
    var cadena = salt + miUsuario + miPwd;
    var hashTmp = sha1(cadena);
    return hashTmp;
};

// function regresarficha(){
//     location.replace("../links/fichaegd");
// }
// function login(){
//     location.replace("login");
// }
// function deu(){
//     location.replace("seg1");
// }
