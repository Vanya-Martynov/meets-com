function controlGuest(req,res,next) {
    if(req.body.id === req.body.userId && req.body.role === 'Guest'){
        next();
    }else if(req.body.role !== 'Guest'){
        next();
    }else{
        console.log(req.body.id);
        console.log(req.body);
        res.send({ERROR: 'NOT_ENOUGH_RIGHTS'})
    }
}

function controlUser(req,res,next){
    if(req.body.id === req.body.userId && req.body.role === 'User'){
        next();
    }else if(req.body.role !== 'Guest'){
        next();
    }else{
        res.send({ERROR: 'NOT_ENOUGH_RIGHTS'})
    }
}


module.exports.controlGuest = controlGuest;
module.exports.controlUser = controlUser;