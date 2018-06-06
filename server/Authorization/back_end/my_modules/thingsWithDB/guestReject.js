function guestReject(req, res, next) {
    if(req.body.role === 'Guest'){
        res.send({ERROR: 'NOT_ENOUGH_RIGHTS'});
    }else {
        next();
    }
}

module.exports.guestReject = guestReject;