const mywidth="500px";
const myheight="500px";
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.font= "20px Arial";
context.textAlign = "end";
var i = 0;
var ejex=canvas.width/2, ejey=canvas.height/2;

function rotarPalabra(palabra){
    
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    context.textALign="center";
    context.translate(ejex,ejey);
    context.rotate(i*Math.PI /180);
    context.translate(-ejex,-ejey);
    context.fillText(palabra,ejex,ejey);
    context.restore();
i+=5;
if(i>=360){
    i=0;
}
window.requestAnimationFrame(()=>{
    rotarPalabra(palabra);
})
}