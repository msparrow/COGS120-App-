
var sim = document.getElementById("sim");
var go = document.createElement("button");
var simarea = document.getElementById("simarea");
var slider = document.createElement("input");
var alert = document.createElement("img");
var simtext = document.createElement("input");
var addarea = document.getElementById("addtrack");
var addtrack = document.createElement("input");
simtext.style.display = 'none';
simarea.appendChild(simtext);


alert.setAttribute("style", "width: 260px");

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

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
          
  var index = sim.selectedIndex - 1; 
  console.log('Simulate found selectedIndex: '+index);
  
   
  

document.getElementById('btn').addEventListener('click', show_selected);
          
  $.get("/trackerData",
        (serverData) =>{
            console.log("server data");
            console.log(serverData);
            if(serverData.length > 0){
            range = serverData[index].range;
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
    document.querySelector('input[type=text]').value = "Tracker ("+ serverData[index].name+"): "+ ++i + "/"+ range + "miles";
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
        addtrack.type = 'button';
        addtrack.value = 'Add a Tracker';
        addarea.appendChild(addtrack);
          
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
        
   
 
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: myLatLng,
            radius: (serverData[0].range * 200)
          });
         });
          //1500
          $.get("/trackerData",
        (serverData) =>{
                   console.log("Select finder found "+serverData.length+" trackers");
                  var i;
                  var sim = document.getElementById("sim");
                  
                  for(i=0; i<serverData.length; i++){
                  var option = document.createElement("option");
                  console.log("campusCoords[i].name = " + campusCoords[i].name);
                  option.value = serverData[i].name;
                  option.innerHTML = serverData[i].name+"(Location: "+campusCoords[i].name+")";
                  sim.add(option);
                  

                  
                   }
                sim.addEventListener('change',simulate,false);
                if(serverData.length != 0){
                    addtrack.remove();
                }
         });
        
      }

   


