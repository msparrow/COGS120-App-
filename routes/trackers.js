exports.view = function(req, res) {
    res.render('trackers');
}

exports.post= function(req, res) {
    var tName = req.body.tName;
    console.log(tName);   
    res.render('trackers');
}
