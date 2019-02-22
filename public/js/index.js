var sim = document.getElementById("sim");
var go = document.createElement("button");
var simarea = document.getElementById("simarea");
var slider = document.createElement("input");
var alert = document.createElement("img");

function updateTextInput(val) {
          document.getElementById('textInput').value=val; 
}

var wait = () =>{
  
  
}

var simulate = () =>{
  //simarea.removeChild(slider);
  slider.setAttribute("type", "range");
  slider.setAttribute("min", "0");
  slider.setAttribute("max", "10");
  slider.setAttribute("step", "1");
  slider.setAttribute("min", "0");
  slider.setAttribute("min", "0");
  slider.setAttribute("value", "0")
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
  var audio = new Audio('/audio/alarm.wav');
  audio.play();
    },5000);
  
  // Initialize and add the map

  simarea.appendChild(alert);
  
  
  
  
  /*var i;
  for(i=1; i<6; i++){
     (function(){
    setTimeout(wait,1000);
    slider.setAttribute("value",i.toString());
    //simarea.appendChild(slider);
    }());
  }*/
  
  
  
}

 // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        var latlng = new google.maps.LatLng(39.305,-76.617);

        map = new google.maps.Map(document.getElementById('map'), {
          center: latlng,
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

sim.addEventListener("click", simulate)