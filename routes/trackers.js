var trackers = require("../data.json")

exports.view = function(req, res) {
    res.render('trackers', { "trackers": trackers.trackers});
}

exports.post= function(req, res) {
    var newData= {
        "name" : req.body.name,
        "number": req.body.number,
        "range": req.body.range
    }
    var trackersData = trackers.trackers;
    trackersData.push(newData);
    console.log(trackersData);
    // res.render('trackers', { "trackers": trackers.trackers});   
    res.json(trackersData);
}





































