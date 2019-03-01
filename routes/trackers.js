var trackers = require("../data.json")
var trackersData = trackers.trackers;

exports.view = function(req, res) {
    res.render('trackers', { "trackers": trackers.trackers});
}

exports.post= function(req, res) {
    var newData= {
        "name" : req.body.name,
        "number": req.body.number,
        "range": req.body.range
    }
    trackersData.push(newData);
    console.log(trackersData);
    // res.render('trackers', { "trackers": trackers.trackers});   
    res.json(trackersData);
}

exports.getData= function(req, res) {
    res.json(trackersData);
}


exports.trackerDelete= function(req, res) {
    var deleteId = req.body.deleteId;
    trackersData.splice(deleteId,1); 
    // console.log(trackersData);
    res.json(trackersData);
}

exports.trackerEdit= function(req, res) {
    var editId = req.body.editId;
    res.json(trackersData[editId]);
}

exports.trackerSaveEdited = function(req, res) {
    var index = req.body.editId; 
  
    console.log(trackersData);
    var editedData= {
        "name" : req.body.name,
        "number": req.body.number,
        "range": req.body.range
    };
    trackersData[index] = editedData;
   //console.log(trackersData);
    res.json(trackersData);
}



































