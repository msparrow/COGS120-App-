
var sim = document.getElementById("sim");
var go = document.createElement("button");
var simarea = document.getElementById("simarea");
var slider = document.createElement("input");
var alert = document.createElement("img");
var simtext = document.createElement("input");
simtext.style.display = 'none';
simarea.appendChild(simtext);


alert.setAttribute("style", "width: 260px");

function updateTextInput(val) {
          document.getElementById('textInput').value=val; 
}

var wait = () =>{
  
  
}

var simulate = () =>{
  simarea.removeChild(simtext);
  //simarea.removeChild(slider);
  simtext.setAttribute("type", "text");
  simtext.setAttribute("id", "textInput");
  simtext.style.display = 'block';
  simarea.appendChild(simtext);
  var alarmset = 0;
  var i = 0;
  
  var range = 0;
          
  $.get("/trackerData",
        (serverData) =>{
            console.log("server data");
            console.log(serverData);
            if(serverData.length > 0){
            range = serverData[0].range;
            }
            else{
                document.querySelector('input[type=text]').value = "No Active Trackers";
                return 0;
            }
            
  
  console.log(toString(range));
  if(range == 0 || range > 50){
          range = 8;
  }
  
  setInterval(function(){
    if(i<=range){
    document.querySelector('input[type=text]').value = "Tracker ("+ serverData[0].name+"): "+ ++i + "/"+ range + "miles";
    }
  }, 1000);
  
  setInterval(function(){
  if(alarmset == 0){
        simtext.style.display = 'none';
        alarmset = 1;
  }
  alert.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/webhw2-d13bb.appspot.com/o/alert.png?alt=media&token=48030043-d029-4513-8128-d6cb583539d3");
  alert.setAttribute("alt", "Error Retrieving Alert Image");
  },(range*1000 + 1000));
  
  setInterval(function(){
  var audio = new Audio('/audio/alarm.wav');
  audio.play();
    },(range*1000 + 1000));
  
  // Initialize and add the map
  
  simarea.appendChild(alert);
            
  });
          
  
  
  
  
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
          0: {
            name: "Revelle",
            center: revLatLng
          },
          1: {
            name: "Muir",   
            center: muirLatLng
          },
          2: {
            name: "Marshall",
            center: marshLatLng
          },
          3: {
            name: "ERC",
            center: ercLatLng
          },
          4: {
            name: "Warren",
            center: warrLatLng
          },
          5: {
            name: "Sixth",
            center: sixLatLng
          }
        }
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: myLatLng,
          label: 'UCSD Campus Pin'
        });
         $.get("/trackerData",
        (serverData) =>{
                   console.log("Map Function found "+serverData.length+" trackers");
                  var i;
                  for(i=0; i<serverData.length; i++){
                  var marker = new google.maps.Marker({
                    position: campusCoords[i].center,
                    map: map,
                    title: 'Hello World!'
                  });
                  
                   }
         });
   
 
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
          
          $.get("/trackerData",
        (serverData) =>{
                   console.log("Select finder found "+serverData.length+" trackers");
                  var i;
                  var sim = document.getElementById("sim");
                  for(i=0; i<serverData.length; i++){
                  var option = document.createElement("option");
                  console.log("campusCoords[i].name = " + campusCoords[i].name);
                  option.setAttribute("value", campusCoords[i].name );
                  option.setAttribute("innerHTML", campusCoords[i].name);
                  sim.appendChild(option);
                  
                   }
         });
        
      }


sim.addEventListener("click", simulate);
