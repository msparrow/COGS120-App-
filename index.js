var $ = window.$

var sim = document.getElementById("sim");
var go = document.createElement("button");
var simarea = document.getElementById("simarea");
var slider = document.createElement("input");
var alert = document.createElement("img");
var datajson; 
$.getJSON("data.json", function(json) {
  console.log("json recieved");
  datajson = json;
});


function updateTextInput(val) {
          document.getElementById('textInput').value=val; 
}

var wait = () =>{
  
  
}

var simulate = () =>{
  //simarea.removeChild(slider);
  slider.setAttribute("type", "range");
  //slider.setAttribute("min", "0");
  //slider.setAttribute("max", "10");
  //slider.setAttribute("step", "1");
 // slider.setAttribute("min", "0");
 // slider.setAttribute("min", "0");
 // slider.setAttribute("value", "0")
  slider.setAttribute("min", list.value-1);
  slider.setAttribute("max", list.value-2);
  slider.setAttribute("step",list.value-3);
  slider.setAttribute("min", list.value-4);
  slider.setAttribute("min", list.value-5);
  slider.setAttribute("value",list.value-6)
slider.setAttribute("onchange","updateTextInput(this.value);");
  simarea.appendChild(slider);
  var simtext = document.createElement("input");
  simtext.setAttribute("type", "text");
  simtext.setAttribute("id", "textInput");
  simarea.appendChild(simtext);
  
  var i = 0;
  setInterval(function(){
    document.querySelector('input[type=range]').value = i++;
  }, 1000);
  
  setInterval(function(){
    document.querySelector('input[type=text]').value = i++ + " miles away";
  }, 1000);
  
  setInterval(function(){
  alert.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/webhw2-d13bb.appspot.com/o/alert.png?alt=media&token=48030043-d029-4513-8128-d6cb583539d3");
  alert.setAttribute("alt", "Error Retrieving Alert Image");
  },5000);
  setInterval(function(){
  var audio = new Audio('./Alarm.wav');
  audio.play();
  simarea.appendChild(alert);
  },5000);
  
  
  
  /*var i;
  for(i=1; i<6; i++){
     (function(){
    setTimeout(wait,1000);
    slider.setAttribute("value",i.toString());
    //simarea.appendChild(slider);
    }());
  }*/
  
  
  
}

sim.addEventListener("click", simulate)
