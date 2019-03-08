/*Functionality adapted from some code I (Matthew Sparrow) wrote last fall, link to site here https://crudhw-84e30.firebaseapp.com/crud.html*/

//Initial page elements

var trackerList = document.getElementById("trackerList");
var listEntry = document.getElementById("listEntry");
var addButton = document.getElementById("addTracker");
//addtracker

//tracker dialog variables
var tDialog = document.getElementById("tDialog");
var tName = document.getElementById("tName");
var tNum = document.getElementById("tNum");
var tRange = document.getElementById("tRange");
var tSave = document.getElementById("tSave");
var tCancel = document.getElementById("tCancel");

//Delete confirm dialog variables
var dDialog = document.getElementById("dDialog");
var dCancel = document.getElementById("dCancel");
var dOk = document.getElementById("dOk");
var editId;
var deleteId;
var sim = document.getElementById("sim");
var go = document.createElement("button");
var simarea = document.getElementById("simarea");
var slider = document.createElement("input");
var alert = document.createElement("img");
var simtext = document.createElement("input");


var trackerArr = [];

var iArr = [];
var gid;

//var dialogScript = document.createElement("script");
//document.head.appendChild(dialogScript);
function updateTextInput(val) {
          document.getElementById('textInput').value=val; 
}

var openDialog = () => {
            ga("send", "event", 'button', 'clicked');

  console.log("opening dialog");
  tName.value = "";
  tNum.value = "";
  tRange.value = "G";
  
  tDialog.showModal();
  tSave.addEventListener("click",msClose,false);
  tCancel.addEventListener("click",mcClose,false);
  console.log("tracker dialog opened on Add Tracker");
}

var msClose = () => {
 
  console.log("Generating new entry for tracker list");

    //Send the new enterd data to the server
  $.post("/trackers",
    {
      "name": tName.value,
      "number": tNum.value,
      "range":tRange.value,
    },
    function(data) {
      //get the updated json data and then render on the tracker page
      console.log(data);
      updateList(data);
    }
  );
  
  tSave.removeEventListener("click",msClose,false);
  tCancel.removeEventListener("click",mcClose,false);
  tDialog.close();
}

//If user presses cancel, simply discard entry and close dialog
var mcClose = () => {
  tName.value = "";
  tNum.value = "";
  tRange.value = "";
  tSave.removeEventListener("click",msClose,false);
  tCancel.removeEventListener("click",mcClose,false);
  tDialog.close();
}


function lesClose(){
  //e.preventDefault();
//function lesClose(lid){
  console.log(`sending data for id ${editId}`);

   $.post("/editSave",
   {
     "name": tName.value,
     "number":tNum.value,
     "range":tRange.value,
     "editId": editId,
   },
   function(data) {
     //get the updated json data and then render on the tracker page
     console.log(data);
     updateList(data);
   }
 );
 
  tSave.removeEventListener("click",lesClose,false);
  tCancel.removeEventListener("click",lecClose,false);
  tDialog.close();
  console.log("List edit closed on save");

}

var lecClose = () => {
  
  tName.value = "";
  tNum.value = "";
  tRange.value = "";
  tSave.removeEventListener("click",lesClose,false);
  tCancel.removeEventListener("click",lecClose,false);
  tDialog.close();
  
  console.log("List edit closed on cancel");
}


var doClose = () =>{

  $.post("/trackerdelete",
    {
      "deleteId": deleteId
    },
    function(data) {
      updateList(data);
      dCancel.removeEventListener("click",dcClose,false);
      dOk.removeEventListener("click", doClose,false);
      dDialog.close();
      console.log("done");
    }
  );
  }

function lEdit(id) {
  editId = id;

  tDialog.showModal();
  $.post("/trackeredit",
    {
      "editId": editId
    },
    function(data) {
      tName.value = data.name
      tNum.value = data.number;
      tRange.value = data.range;
      tSave.addEventListener("click",lesClose,false);
      tCancel.addEventListener("click",lecClose,false);
    }
  );
}

/*function lDelete(lid){
  deletId = lid;
  gid = iArr[lid];
  console.log("Opened delete dialog on button id: "+lid);
  dDialog.showModal();
}*/

function lDelete(id){
  deleteId = id;
  console.log("delete id in ldelete is " + deleteId );

  dDialog.showModal();
  dCancel.addEventListener("click",dcClose,false);
  dOk.addEventListener("click", doClose,false);
}

var dcClose = () =>{
  
  console.log("Delete dialog closed on Cancel");
  dCancel.removeEventListener("click",dcClose,false);
  dOk.removeEventListener("click", doClose,false);
  dDialog.close();
}

var doClose = () =>{

  $.post("/trackerdelete",
    {
      "deleteId": deleteId
    },
    function(data) {
      dCancel.removeEventListener("click",dcClose,false);
      dOk.removeEventListener("click", doClose,false);``
      dDialog.close();
      updateList(data);
      console.log("done");
    }
  );

}

function getName(lid){
  
  var entry = trackerList.childNodes[lid+1].childNodes[0].nodeValue;
  var name = "";
  
  for(var i = 0; i<entry.length; i++){
    var index = i;
    if((entry.charAt(index)+""+entry.charAt(index+1)) == " ("){
      return name;
    }
     
    else
      name+=entry.charAt(index);
  }
}

function getNumber(lid){
    
  var entry = trackerList.childNodes[lid+1].childNodes[0].nodeValue;
  var number = "";
  var flag = 0;
  
  for(var i = 0; i<entry.length; i++){
    
    if((entry.charAt(i-2)+""+entry.charAt(i-1)) == " (")
      flag = 1;
      
    if((entry.charAt(i+1)+""+entry.charAt(i+2)) == ") "){
      number+=entry.charAt(i);
      return number;
    }
     
    if(flag==1)
      number+=entry.charAt(i);
  }
  
}

function getRange(lid){
  //They either end in G, 3, or R
     
  var entry = trackerList.childNodes[lid+1].childNodes[0].nodeValue;
  var range = "";
  var flag = 0;
  var flag2 = 0;
  
  for(var index = 0; index<entry.length; index++){
    var i = index;
    if(entry.charAt(i) == "-" && entry.charAt(i+1) != "1")
      flag = 1;
      
    if((entry.charAt(i-2)+""+entry.charAt(i-1)) == ": " && flag == 1){
      flag2 = 1;
    }
    
    if(flag2 == 1){
      
      range+=entry.charAt(i);
    }
    
    if((entry.charAt(i)=="R"||(entry.charAt(i)=="G" && entry.charAt(i+1)!="-")||entry.charAt(i)=="3")&&(flag2==1)){
       //&&(entry.charAt(i+2)+entry.charAt(i+3))=="\n"){
            return range;
    }
  } 
}


var updateList = (data) => {

  $("#trackerList").html(" ");
  var allTrackers = document.getElementById("trackerList");
  for(var i = 0; i < data.length; i++) {
    (function(i){
      var listElem = document.createElement("li");
      listElem.appendChild(document.createTextNode("Name: " + data[i].name + " T #: " + data[i].number + " Range: " + data[i].range + "  "));
      allTrackers.appendChild(listElem);
    }(i));
  }

  for(var i = 0; i < allTrackers.children.length; i++) {
    // add Edit button for the given tracker
    var bEdit = document.createElement("button");
    bEdit.innerHTML = " Edit";
    bEdit.className = "editTrackerBtn";
    allTrackers.children[i].appendChild(bEdit);

    var bDelete = document.createElement("button");
    bDelete.innerHTML = " Delete";
    bDelete.className = "deleteTrackerBtn";
    allTrackers.children[i].appendChild(bDelete);

  }

  //adding event listeners for edit buttons
  var editBtns = document.getElementsByClassName("editTrackerBtn");
  var i;
  
  for (i = 0; i < editBtns.length; i++) {
    (function(i) {
      console.log(`i is ${i}`);
      console.log("adding click listenetr")
      editBtns[i].onclick = function() {
        console.log(`going to edit for ${i}`);
        lEdit(i);
      }
    })(i);
    
  }

  //adding event listeners for delete buttons
  var deleteBtns = document.getElementsByClassName("deleteTrackerBtn");
  var i;
  
  for (i = 0; i < deleteBtns.length; i++) {
    (function(i) {
      console.log(`i is ${i}`);
      console.log("adding click listenetr")
      deleteBtns[i].onclick = function() {
        console.log(`going to delete for ${i}`);
        lDelete(i);
      }
    })(i);
    
  }
}


  
function parseForm(name, number, range){
  
  var retChild = "";
  
  retChild += name;
  retChild += " (#";
  retChild += number;
  retChild += ") - Range: ";
  retChild += range;
  retChild += " miles"
  return retChild;
}


function init() {  
  addButton.addEventListener("click",openDialog,false);
  $.get("/trackerData", (serverData) => {
     (function(){
        updateList(serverData);
          }());
  });

  var testid = 100;
  var flag = 0;
  console.log("First child of trackerlist"+trackerList.childNodes[0]);
  
}

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
  
  var index = sim.selectedIndex;
  console.log('Simulate found selectedIndex: '+index);
  
  var range = 0;
          
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
         });
        
      }
