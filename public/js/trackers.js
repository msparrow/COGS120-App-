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
var trackerArr; 

var trackerArr = [];
if(JSON.parse(localStorage.getItem("storedArr")) != null){				 
  trackerArr = JSON.parse(localStorage.getItem("storedArr"));
}
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
  
  var name = tName.value;
  var number = tNum.value;
  var range = tRange.value;
  
  var arrEntry = parseForm(name, number, range);
  console.log("Generating entry, parseForm returned: "+arrEntry);
  
  trackerArr.push(arrEntry);
  localStorage.setItem("storedArr", JSON.stringify(trackerArr));
  updateList();
  tSave.removeEventListener("click",msClose,false);
  tCancel.removeEventListener("click",mcClose,false);
  tDialog.close();
  console.log("Tracker dialog closed on Ok");
}

//If user presses cancel, simply discard entry and close dialog
var mcClose = () => {
  tName.value = "";
  tNum.value = "";
  tRange.value = "G";
  tSave.removeEventListener("click",msClose,false);
  tCancel.removeEventListener("click",mcClose,false);
  tDialog.close();
  console.log("tracker dialog closed on cancel");
}
var lesClose = () =>{
//function lesClose(lid){
   
   var index = gid;
   var name = tName.value;
   var number = tNum.value;
   var range = tRange.value;
   
   var newChild = parseForm(name, number, range);
   console.log("parseForm returned: "+newChild);
   trackerArr[index] = newChild;
   localStorage.setItem("storedArr", JSON.stringify(trackerArr));
   var nodeChild = document.createTextNode(newChild);
   console.log("b4 childReplace: trackerArr: " + trackerArr);
   console.log("b4 childReplace: iArr: "+ iArr);
   trackerList.childNodes[gid+1].replaceChild(nodeChild,
             trackerList.childNodes[gid+1].childNodes[0]);
   updateList();
   console.log("trackerArr aftr updateList lesC: "+trackerArr);
   console.log("iArr after updateList lesC: "+ iArr);
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

function lEdit(lid) {
  var index = iArr[lid];
  tName.value = getName(index);
  tNum.value = getNumber(index);
  tRange.value = getRange(index);
  tDialog.showModal();
  gid = index;
  tSave.addEventListener("click",lesClose,false);
  tCancel.addEventListener("click",lecClose,false);
}

function lDelete(lid){
  gid = iArr[lid];
  console.log("Opened delete dialog on button id: "+lid);
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
  var lid = gid;
  console.log("Splicing lid "+lid+" trackerArr[lid]: "+trackerArr[lid]);
  trackerArr.splice(lid,1);
  localStorage.setItem("storedArr", JSON.stringify(trackerArr));
  updateList();
  dCancel.removeEventListener("click",dcClose,false);
  dOk.removeEventListener("click", doClose,false);
  dDialog.close();
  console.log("Delete dialog closed on Ok");
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

var updateList = () =>{
    
    iArr.splice(0,iArr.length);
   
    for(var i = trackerList.childNodes.length-1;i>0;i--){
      (function(){
      var index = i;
      
      trackerList.removeChild(trackerList.childNodes[index]);
      }());
    }
  
    console.log("trackerList child length: " + trackerList.childNodes.length);
    
    trackerList = document.getElementById("trackerList");
  
    for(var i=0;i<trackerArr.length;i++){
    (function(){
      
    var index = i;
    iArr.push(index);
    
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
                          {lEdit(iArr[index]);},false);
    
    bDelete.addEventListener("click",function()
                            {lDelete(iArr[index]);},false);
    
    listElem.appendChild(bEdit);
    listElem.appendChild(bDelete);
      
    console.log("Updating tracker list: "+trackerArr[i]);
    
    trackerList.appendChild(listElem);
    }());
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
  var testid = 100;
  var flag = 0;
  console.log("First child of trackerlist"+trackerList.childNodes[0]);
  addButton.addEventListener("click",openDialog,false);
  
  
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
                          {lEdit(iArr[index]);},false);
    
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
}