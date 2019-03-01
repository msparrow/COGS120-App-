
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


var trackerArr = [];

var iArr = [];
var gid;

//var dialogScript = document.createElement("script");
//document.head.appendChild(dialogScript);
function updateTextInput(val) {
          document.getElementById('textInput').value=val; 
}

var openDialog = () => {
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
  
  // getting values from input field and putting into these variables 
  var name = tName.value;
  var number = tNum.value;
  var range = tRange.value;
  console.log(name);

    //Send the new enterd data to the server
  $.post("/trackers",
    {
      "name": name,
      "number":number,
      "range":range,
    },
    function(data) {
      //get the updated json data and then render on the tracker page
      console.log(data);
      // $("#trackerList").html(" ");
      trackerArr = data;
      updateList(data);
    }
  );
  

  // $.ajax({
  //   type: "POST",
  //   url: "/trackers",
  //   dataType: "json",
  //   data: {
  //     name: name,
  //     number: number,
  //     range: range, 
  //   },
  //   success: function() {
  //     console.log("Alhamdulillah");
  //   },
  //   error: function() {
  //     console.log("error");
  //   }
  // })
  
  // var arrEntry = parseForm(name, number, range);
  // console.log("Generating entry, parseForm returned: "+arrEntry);
  
  // trackerArr.push(arrEntry);
  // localStorage.setItem("storedArr", JSON.stringify(trackerArr));
  // updateList();
  tSave.removeEventListener("click",msClose,false);
  tCancel.removeEventListener("click",mcClose,false);
  tDialog.close();
}

//If user presses cancel, simply discard entry and close dialog
var mcClose = () => {
  tName.value = "";
  tNum.value = "";
  tRange.value = "G";
  tSave.removeEventListener("click",msClose,false);
  tCancel.removeEventListener("click",mcClose,false);
  tDialog.close();
}
function lesClose(lid){
  //e.preventDefault();
//function lesClose(lid){
   var editId = lid-1;
   console.log("edit id " + editId);

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
 


   
  //  var newChild = parseForm(name, number, range);
  //  console.log("parseForm returned: "+newChild);
  //  trackerArr[index] = newChild;
  //  localStorage.setItem("storedArr", JSON.stringify(trackerArr));
  //  var nodeChild = document.createTextNode(newChild);
  //  console.log("b4 childReplace: trackerArr: " + trackerArr);
  //  console.log("b4 childReplace: iArr: "+ iArr);
  //  trackerList.childNodes[gid+1].replaceChild(nodeChild,
  //            trackerList.childNodes[gid+1].childNodes[0]);
  //  updateList();
  //  console.log("trackerArr aftr updateList lesC: "+trackerArr);
  //  console.log("iArr after updateList lesC: "+ iArr);
   tSave.removeEventListener("click",lesClose,false);
   tCancel.removeEventListener("click",lecClose,false);
   tDialog.close();
   console.log("List edit closed on save");

}

var lecClose = () => {
  
  tName.value = "";
  tNum.value = "";
  tRange.value = "G";
  tSave.removeEventListener("click",lesClose,false);
  tCancel.removeEventListener("click",lecClose,false);
  tDialog.close();
  
  console.log("List edit closed on cancel");
}


var doClose = () =>{
   var deleteId = 0;
  // var lid = gid;
  // console.log("Splicing lid "+lid+" trackerArr[lid]: "+trackerArr[lid]);
  // trackerArr.splice(lid,1);
  // localStorage.setItem("storedArr", JSON.stringify(trackerArr));
  // updateList();
  // dCancel.removeEventListener("click",dcClose,false);
  // dOk.removeEventListener("click", doClose,false);
  // dDialog.close();
  // console.log("Delete dialog closed on Ok");

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

function lEdit(lid) {
  var editId = lid-1;

  console.log("clicked on " + editId);
  tDialog.showModal();
  $.post("/trackeredit",
    {
      "editId": editId
    },
    function(data) {
      tName.value = data.name
      tNum.value = data.number;
      tRange.value = data.range;
      tSave.addEventListener("click",function()
                          {lesClose(lid);},false);
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

function lDelete(lid){
  console.log("delete id in ldelete is " + lid );
  
  var deleteId = lid - 1;
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
  var deleteId = 0;
  console.log("deleting it")
  console.log("delete id :" + deleteId);

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


  // var lid = gid;
  // console.log("Splicing lid "+lid+" trackerArr[lid]: "+trackerArr[lid]);
  // trackerArr.splice(lid,1);
  // localStorage.setItem("storedArr", JSON.stringify(trackerArr));
  // updateList();
  // dCancel.removeEventListener("click",dcClose,false);
  // dOk.removeEventListener("click", doClose,false);
  // dDialog.close();
  // console.log("Delete dialog closed on Ok");
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


//var listScript = document.createElement("script");
//listScript.src = "./listcontrol.js";
//document.head.appendChild(listScript);

//BEGINNING OF listcontrol.js

var updateList = (data) => {
  
  console.log("Update list found "+trackerList.childNodes.length+" trackers");
  console.log("trackerList children: "+ toString(trackerList.childNodes));
      for(var i = trackerList.childNodes.length-1;i>0;i--){
       (function(){
       var index = i;
      
       trackerList.removeChild(trackerList.childNodes[index]);
       }());
  }
  console.log("Child count after strict delete(should be 0): "+trackerList.childNodes.length);
  $("#trackerList").html(" ");
  for(var i = 0; i < data.length; i++) {
    (function(){
    var listElem = document.createElement("li");
    console.log("adding data at :" + i);
    listElem.appendChild(document.createTextNode("Name: " + data[i].name + " T #: " + data[i].number + " Range: " + data[i].range));

    var bEdit = document.createElement("button");
    var bDelete = document.createElement("button");    
    bEdit.innerHTML = " Edit";
    bDelete.innerHTML = " Delete";
    bEdit.setAttribute("id", "me"+i);
    bDelete.setAttribute("id","md"+i);
    listElem.setAttribute("id",i);
    console.log("Edit and Delete buttons added with ID (me/md)"+i);
    bEdit.addEventListener("click",lEdit.bind(this,i),false);
    
    bDelete.addEventListener("click",function()
                            {lDelete(i);},false);
    
    listElem.appendChild(bEdit);
    listElem.appendChild(bDelete);
    trackerList.appendChild(listElem);
    }());
  }
}


// var updateList = () =>{
    
//     iArr.splice(0,iArr.length);
   
//     for(var i = trackerList.childNodes.length-1;i>0;i--){
//       (function(){
//       var index = i;
      
//       trackerList.removeChild(trackerList.childNodes[index]);
//       }());
//     }
  
//     console.log("trackerList child length: " + trackerList.childNodes.length);
    
//     trackerList = document.getElementById("trackerList");
  
//     for(var i=0;i<trackerArr.length;i++){
//     (function(){
      
//     var index = i;
//     iArr.push(index);
    
//     var listElem = document.createElement("li");
//     listElem.appendChild(document.createTextNode(trackerArr[index]));
    
    // var bEdit = document.createElement("button");
    // var bDelete = document.createElement("button");    
    // bEdit.innerHTML = " Edit";
    // bDelete.innerHTML = " Delete";
    // bEdit.setAttribute("id", "me"+index);
    // bDelete.setAttribute("id","md"+index);
    // listElem.setAttribute("id",index);
    
    // bEdit.addEventListener("click",function()
    //                       {lEdit(iArr[index]);},false);
    
    // bDelete.addEventListener("click",function()
    //                         {lDelete(iArr[index]);},false);
    
    // listElem.appendChild(bEdit);
    // listElem.appendChild(bDelete);
      
//     console.log("Updating tracker list: "+trackerArr[i]);
    
   // trackerList.appendChild(listElem);
//     }());
//   }
  
// }
  
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
  
  
  /*
  for(var i=0;i<trackerArr.length;i++){
    (function(){
    
      var index = i;
      
      iArr.push(index);
      
      console.log("Init loop i: "+index);
      
      var listElem = document.createElement("li");
      listElem.appendChild(document.createTextNode(trackerArr[index]));
      
      var bEdit = document.createElement("button");
      var bDelete = document.createElement("button");    
      bEdit.innerHTML = " Edit";
      bDelete.innerHTML = " Delete";
      bEdit.setAttribute("id", "me"+index);
      bDelete.setAttribute("id","md"+index);
      listElem.setAttribute("id",index);
    
      bEdit.addEventListener("click",function()
                            {lEdit(i);},false);
      
      console.log("Adding delete listener for listElem.id: "+listElem.id);
      bDelete.addEventListener("click",function()
                              {lDelete(iArr[index]);},false);
      console.log("Adding delete listener for listElem.id: "+listElem.id);
      
      listElem.appendChild(bEdit);
      listElem.appendChild(bDelete);
      
      trackerList.appendChild(listElem);
      console.log("listElem children: "+listElem.childNodes +"length:"+listElem.childNodes.length);
      console.log("Tracker List looks like (i="+i+"): "+trackerArr[index]);
      console.log("This list element got the ID of"+listElem.id);
      //var buttons = document.getElementsByTagName('button');
      //console.log(buttons);
    }());
  }
  localStorage.setItem("storedArr", JSON.stringify(trackerArr));
  console.log("iArr after init: "+iArr);
  console.log("Final trackerList node count: " + trackerList.childNodes.length);
  console.log("Head node of trackerList: " + trackerList.childNodes[0]);
  */
}

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
                  option.value = campusCoords[i].name;
                  option.innerHTML = campusCoords[i].name;
                  sim.add(option);
                  option.addEventListener("click", simulate);

                  
                   }
         });
        
      }
