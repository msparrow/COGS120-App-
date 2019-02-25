
var sim = document.getElementById("sim");
var go = document.createElement("button");
var simarea = document.getElementById("simarea");
var slider = document.createElement("input");
var alert = document.createElement("img");

alert.setAttribute("style", "width: 260px");

function updateTextInput(val) {
          document.getElementById('textInput').value=val; 
}

var wait = () =>{
  
  
}

var simulate = () =>{
  //simarea.removeChild(slider);
  var simtext = document.createElement("input");
  simtext.setAttribute("type", "text");
  simtext.setAttribute("id", "textInput");
  simarea.appendChild(simtext);
  
  var i = 0;
  
  var range = 0;
          
  $.get("/trackerData",
        (serverData) =>{
            console.log("server data");
            console.log(serverData);
            range = serverData[0].range;        
  
  console.log(toString(range));
  if(range == 0 || range > 50){
          range = 8;
  }
  
  setInterval(function(){
    document.querySelector('input[type=text]').value = "Tracker range: "+ ++i + "/"+ range + "miles";
  }, 1000);
  
  setInterval(function(){
  alert.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/webhw2-d13bb.appspot.com/o/alert.png?alt=media&token=48030043-d029-4513-8128-d6cb583539d3");
  alert.setAttribute("alt", "Error Retrieving Alert Image");
  },(range*1000));
  
  setInterval(function(){
  var audio = new Audio('/audio/alarm.wav');
  audio.play();
    },(range*1000));
  
  // Initialize and add the map
  
  simarea.appendChild(alert);
  })
  
  
  
  /*var i;
  for(i=1; i<6; i++){
     (function(){
    setTimeout(wait,1000);
    slider.setAttribute("value",i.toString());
    //simarea.appendChild(slider);
    }());
  }*/
  
  
  
}
function initMap() {
  
        
        var myLatLng = {lat: 32.8801, lng: -117.234};
        var revLatLng = {lat: 32.8754, lng: -117.2419};
        var muirLatLng = {lat:32.8786 , lng:-117.2405 };
        var marshLatLng = {lat:32.8816 , lng:-117.2410 };
        var ercLatLng = {lat:32.8853 , lng:-117.2422 };
        var warrLatLng = {lat:32.8812 , lng:-117.2341 };
        var sixLatLng = {lat: 32.8782, lng:-117.2318 };
        var campusCoords = {
          revelle: {
            center: revLatLng
          },
          muir: {
            center: muirLatLng
          },
          marshall: {
            center: marshLatLng
          },
          erc: {
            center: ercLatLng
          },
          warren: {
            center: warrLatLng
          },
          sixth: {
            center: sixLatLng
          }
        }
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: myLatLng,
          label: 'UCSD Campus Pin'
        });
        for(var coords in campusCoords){
        var marker = new google.maps.Marker({
          position: campusCoords[coords].center,
          map: map,
          title: 'Hello World!'
        });
        }
   
 
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: myLatLng,
            radius: 1500
          });
        
      }


sim.addEventListener("click", simulate);
