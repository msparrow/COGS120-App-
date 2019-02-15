/*Code adapted from a previous assignment done by me (Matthew Sparrow), link to site here https://crudhw-84e30.firebaseapp.com/crud.html*/

//Initial page elements
var movieList = document.getElementById("movieList");
var listEntry = document.getElementById("listEntry");
var addButton = document.getElementById("addMovie");

//Movie dialog variables
var mDialog = document.getElementById("mDialog");
var mTitle = document.getElementById("mTitle");
var mYear = document.getElementById("mYear");
var mRating = document.getElementById("mRating");
var mSave = document.getElementById("mSave");
var mCancel = document.getElementById("mCancel");

//Delete confirm dialog variables
var dDialog = document.getElementById("dDialog");
var dCancel = document.getElementById("dCancel");
var dOk = document.getElementById("dOk");
var movieArr; 

/*var movieArr = ["Star Wars (1977) - Rated: PG ",
                 "The Empire Strikes Back (1980) - Rated: PG ",
                 "The Revenge of the Jedi (1983) - Rated: PG \n"];*/
if(JSON.parse(localStorage.getItem("storedArr")) != null){				 
movieArr = JSON.parse(localStorage.getItem("storedArr"));
}
var iArr = [];
var gid;
//Load moviedialog.js and listcontrol.js modules
//var dialogScript = document.createElement("script");
//dialogScript.src = "./moviedialog.js";
//document.head.appendChild(dialogScript);
function updateTextInput(val) {
          document.getElementById('textInput').value=val; 
        }
//BEGINNING OF moviedialog.js
var openDialog = () => {
  mTitle.value = "";
  mYear.value = "";
  mRating.value = "G";
  
  mDialog.showModal();
  mSave.addEventListener("click",msClose,false);
  mCancel.addEventListener("click",mcClose,false);
  console.log("Movie dialog opened on Add Movie");
}

var msClose = () => {
 
  console.log("Generating new entry for movie list");
  
  var title = mTitle.value;
  var year = mYear.value;
  var rating = mRating.value;
  
  var arrEntry = parseForm(title, year, rating);
  console.log("Generating entry, parseForm returned: "+arrEntry);
  
  movieArr.push(arrEntry);
  localStorage.setItem("storedArr", JSON.stringify(movieArr));
  updateList();
  console.log("iArr after msClose updateList: "+iArr);
  mSave.removeEventListener("click",msClose,false);
  mCancel.removeEventListener("click",mcClose,false);
  mDialog.close();
  console.log("Movie dialog closed on Ok");
}

//If user presses cancel, simply discard entry and close dialog
var mcClose = () => {
  mTitle.value = "";
  mYear.value = "";
  mRating.value = "G";
  mSave.removeEventListener("click",msClose,false);
  mCancel.removeEventListener("click",mcClose,false);
  mDialog.close();
  console.log("Movie dialog closed on cancel");
}
var lesClose = () =>{
//function lesClose(lid){
   
   var index = gid;
   var title = mTitle.value;
   var year = mYear.value;
   var rating = mRating.value;
   
   var newChild = parseForm(title, year, rating);
   console.log("parseForm returned: "+newChild);
   movieArr[index] = newChild;
   localStorage.setItem("storedArr", JSON.stringify(movieArr));
   var nodeChild = document.createTextNode(newChild);
   console.log("b4 childReplace: MovieArr: " + movieArr);
   console.log("b4 childReplace: iArr: "+ iArr);
   movieList.childNodes[gid+1].replaceChild(nodeChild,
             movieList.childNodes[gid+1].childNodes[0]);
   updateList();
   console.log("movieArr aftr updateList lesC: "+movieArr);
   console.log("iArr after updateList lesC: "+ iArr);
   mSave.removeEventListener("click",lesClose,false);
   mCancel.removeEventListener("click",lecClose,false);
   mDialog.close();
   console.log("List edit closed on save");

}

var lecClose = () => {
  
  mTitle.value = "";
  mYear.value = "";
  mRating.value = "G";
  mSave.removeEventListener("click",lesClose,false);
  mCancel.removeEventListener("click",lecClose,false);
  mDialog.close();
  
  console.log("List edit closed on cancel");
}

function lEdit(lid) {
  var index = iArr[lid];
  mTitle.value = getTitle(index);
  mYear.value = getYear(index);
  mRating.value = getRating(index);
  mDialog.showModal();
  gid = index;
  mSave.addEventListener("click",lesClose,false);
  mCancel.addEventListener("click",lecClose,false);
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
  console.log("Splicing lid "+lid+" MovieArr[lid]: "+movieArr[lid]);
  movieArr.splice(lid,1);
  localStorage.setItem("storedArr", JSON.stringify(movieArr));
  updateList();
  dCancel.removeEventListener("click",dcClose,false);
  dOk.removeEventListener("click", doClose,false);
  dDialog.close();
  console.log("Delete dialog closed on Ok");
}

function getTitle(lid){
  
  var entry = movieList.childNodes[lid+1].childNodes[0].nodeValue;
  var title = "";
  
  for(var i = 0; i<entry.length; i++){
    var index = i;
    if((entry.charAt(index)+""+entry.charAt(index+1)) == " ("){
      console.log("getTitle() found: "+title);
      return title;
    }
     
    else
      title+=entry.charAt(index);
  }
}

function getYear(lid){
    
  var entry = movieList.childNodes[lid+1].childNodes[0].nodeValue;
  var year = "";
  var flag = 0;
  
  for(var i = 0; i<entry.length; i++){
    
    if((entry.charAt(i-2)+""+entry.charAt(i-1)) == " (")
      flag = 1;
      
    if((entry.charAt(i+1)+""+entry.charAt(i+2)) == ") "){
      year+=entry.charAt(i);
      console.log("getYear() found: "+year);
      return year;
    }
     
    if(flag==1)
      year+=entry.charAt(i);
  }
  
}

function getRating(lid){
  //They either end in G, 3, or R
     
  var entry = movieList.childNodes[lid+1].childNodes[0].nodeValue;
  console.log("getRating found entry: "+entry);
  var rating = "";
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
      
      rating+=entry.charAt(i);
    }
    
    if((entry.charAt(i)=="R"||(entry.charAt(i)=="G" && entry.charAt(i+1)!="-")||entry.charAt(i)=="3")&&(flag2==1)){
       //&&(entry.charAt(i+2)+entry.charAt(i+3))=="\n"){
      
      console.log("getRating() found: "+rating);
      return rating;
    }
  } 
}


//var listScript = document.createElement("script");
//listScript.src = "./listcontrol.js";
//document.head.appendChild(listScript);

//BEGINNING OF listcontrol.js

var updateList = () =>{
    
    iArr.splice(0,iArr.length);
   
    for(var i = movieList.childNodes.length-1;i>0;i--){
      (function(){
      var index = i;
      
      movieList.removeChild(movieList.childNodes[index]);
      }());
    }
  
    console.log("movieList child length: " + movieList.childNodes.length);
    
    movieList = document.getElementById("movieList");
  
    for(var i=0;i<movieArr.length;i++){
    (function(){
      
    var index = i;
    iArr.push(index);
    
    var listElem = document.createElement("li");
    listElem.appendChild(document.createTextNode(movieArr[index]));
    
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
      
    console.log("Updating movie list: "+movieArr[i]);
    
    movieList.appendChild(listElem);
    }());
  }
  
}
  
function parseForm(title, year, rating){
  
  var retChild = "";
  
  retChild += title;
  retChild += " (";
  retChild += year;
  retChild += ") - Range: ";
  retChild += rating;
  retChild += " miles"
  return retChild;
}

function init() {   
  var testid = 100;
  var flag = 0;
  console.log("First child of movielist"+movieList.childNodes[0]);
  addButton.addEventListener("click",openDialog,false);
  
  
  for(var i=0;i<movieArr.length;i++){
    (function(){
    
    var index = i;
    
    iArr.push(index);
    
    console.log("Init loop i: "+index);
    
    var listElem = document.createElement("li");
    listElem.appendChild(document.createTextNode(movieArr[index]));
    
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
    
    movieList.appendChild(listElem);
    console.log("listElem children: "+listElem.childNodes +"length:"+listElem.childNodes.length);
    console.log("Movie List looks like (i="+i+"): "+movieArr[index]);
    console.log("This list element got the ID of"+listElem.id);
    //var buttons = document.getElementsByTagName('button');
    //console.log(buttons);
    }());
  }
  localStorage.setItem("storedArr", JSON.stringify(movieArr));
  console.log("iArr after init: "+iArr);
  console.log("Final MovieList node count: " + movieList.childNodes.length);
  console.log("Head node of MovieList: " + movieList.childNodes[0]);
}
