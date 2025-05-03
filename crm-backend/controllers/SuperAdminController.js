let routes = require('express').Router();

routes.get('/',(req, res)=>{
    res.send(req.body)
});

module.exports = routes;