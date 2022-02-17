// PlugIn elegir color
$(function () {
    $('#colorpicker').colorpicker({
        modal: true
    });
});
// Cambiar el color de fondo
$(document).on("click", ".ui-colorpicker-ok", function () {
    document.body.style.backgroundColor = "#" + $("#colorpicker").val()
    $("#colorpicker").val("")
})

// Animacion esconder y mostrar la navbar
$(document).on("click","#toggle", function(event){
    event.preventDefault();
    if ($(this).hasClass("isDown") ) {
        $( ".navbar-fixed-top" ).animate({ "margin-top": "-75px" }, "fast" );  
        $( "#content" ).animate({ "margin-top": "30px" }, "fast" );
        $(".triangle-down").animate({"top": "0%"},"fast");
        $(this).removeClass("isDown");
    } else {
        $( ".navbar-fixed-top" ).animate({ "margin-top": "0px" }, "fast" );
        $( "#content" ).animate({ "margin-top": "100px" }, "fast" );
        $(".triangle-down").animate({"top": "8%"},"fast");
        $(this).addClass("isDown");
    }
    return false;
});

// Añadir los medias que se utilizan para hacer los comentarios
$(document).on("click","#cmedia",function(){
    if($("#nombre").val() != "" && $("#comment").val() != ""){
    let div = document.getElementsByClassName("newComments")[0]

    let media = document.createElement("div")
    media.setAttribute("class","media pt-3")

    let img = document.createElement("img")
    img.width = 80;
    img.src = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
    img.setAttribute("class","mr-3")

    let divbody = document.createElement("div")
    divbody.setAttribute("class","media-body")

    let h5 = document.createElement("h5")
    h5.setAttribute("class","mt-0 text-capitalize")

    let user = document.createTextNode($("#nombre").val())

    h5.appendChild(user)

    let comment = document.createTextNode($("#comment").val())

    divbody.appendChild(h5)
    divbody.appendChild(comment)

    media.appendChild(img)
    media.appendChild(divbody)

    div.appendChild(media)
    }
})